'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import {
  fetchCommentsService,
  createCommentService,
  updateCommentLikesService,
  uploadCommentImageService,
  addReplyService,
} from '@/lib/commentService'

export const DEFAULT_AUTHOR_COMMENT = {
  id: 999999999,
  name: 'Akshay Sharma',
  comment: 'Welcome to my portfolio! 👋 Feel free to share your thoughts, project feedback, or just say hello - I would love to connect with you.',
  image_url: null,
  likes: 0,
  replies: [],
  created_at: '2026-09-24T08:08:00',
  is_pinned: true,
  is_author: true,
}

export default function useComments() {
  const [comments, setComments] = useState<any[]>([DEFAULT_AUTHOR_COMMENT])
  const [loading, setLoading] = useState(false)

  const hydrateCommentsWithStorage = (list: any[]) => {
    if (typeof window === 'undefined') return list

    return list.map((item) => {
      // 1. Likes hydration
      const isLiked = localStorage.getItem(`liked-${item.id}`) === 'true'
      let likes = item.likes || 0
      if (item.id === DEFAULT_AUTHOR_COMMENT.id) {
        likes = isLiked ? 1 : 0
      }

      // 2. Replies hydration
      const localRepliesKey = `comment-replies-${item.id}`
      let localReplies: any[] = []
      try {
        const json = localStorage.getItem(localRepliesKey)
        localReplies = json ? JSON.parse(json) : []
      } catch (e) {
        localReplies = []
      }

      const serverReplies = Array.isArray(item.replies) ? item.replies : []

      // De-duplicate replies
      const repliesMap = new Map<string, any>()
      serverReplies.forEach((r: any) =>
        repliesMap.set(String(r.id || `${r.created_at}-${r.name || r.username}`), r)
      )
      localReplies.forEach((r: any) =>
        repliesMap.set(String(r.id || `${r.created_at}-${r.name || r.username}`), r)
      )

      const mergedReplies = Array.from(repliesMap.values()).map((r: any) => ({
        ...r,
        name: r.name || r.username || 'Visitor',
        userHasLiked: localStorage.getItem(`liked-reply-${r.id}`) === 'true',
      }))

      return {
        ...item,
        likes,
        userHasLiked: isLiked,
        replies: mergedReplies,
      }
    })
  }

  const mergeWithAuthorComment = (serverData: any[]) => {
    const list = serverData || []
    const hasPinned = list.some(
      (c: any) => c.is_pinned || c.name?.includes('Akshay Sharma')
    )
    const combined = hasPinned ? list : [DEFAULT_AUTHOR_COMMENT, ...list]
    return hydrateCommentsWithStorage(combined)
  }

  // Hydrate likes & replies on initial mount
  useEffect(() => {
    setComments((prev) => hydrateCommentsWithStorage(prev))
  }, [])

  useEffect(() => {
    fetchInitialComments()

    if (!supabase) return

    const channel = supabase
      .channel('comments-live')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'comments',
        },
        async () => {
          try {
            const data = await fetchCommentsService()
            setComments(mergeWithAuthorComment(data))
          } catch (e) {
            console.log(e)
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const fetchInitialComments = async () => {
    try {
      const data = await fetchCommentsService()
      setComments(mergeWithAuthorComment(data))
    } catch (err) {
      console.log('Using default author pinned comment with local hydration:', err)
      setComments(mergeWithAuthorComment([]))
    }
  }

  const addComment = async ({
    name,
    comment,
    image,
  }: {
    name: string
    comment: string
    image: File | null
  }) => {
    if (!name.trim() || !comment.trim()) return

    setLoading(true)

    try {
      let imageUrl: string | null = null

      if (image) {
        imageUrl = await uploadCommentImageService(image)
      }

      const clientTimestamp = new Date().toISOString()
      const newComment = await createCommentService({
        name,
        comment,
        imageUrl,
      })

      const formatted = {
        ...newComment,
        created_at: newComment?.created_at || clientTimestamp,
        replies: [],
      }

      // Insert right after pinned comments
      setComments((prev) => {
        const pinned = prev.filter((c) => c.is_pinned)
        const unpinned = prev.filter((c) => !c.is_pinned)
        return [...pinned, formatted, ...unpinned]
      })
    } catch (err) {
      console.log('Supabase comment sync error, using local optimistic fallback:', err)
      const fallbackComment = {
        id: Date.now(),
        name,
        comment,
        image_url: image ? URL.createObjectURL(image) : null,
        likes: 0,
        replies: [],
        created_at: new Date().toISOString(),
        is_pinned: false,
      }
      setComments((prev) => {
        const pinned = prev.filter((c) => c.is_pinned)
        const unpinned = prev.filter((c) => !c.is_pinned)
        return [...pinned, fallbackComment, ...unpinned]
      })
    } finally {
      setLoading(false)
    }
  }

  // Toggle like (Like / Unlike) on a comment
  const likeComment = async (id: number, currentLikes: number) => {
    const likedKey = `liked-${id}`
    const isCurrentlyLiked =
      typeof window !== 'undefined' && localStorage.getItem(likedKey) === 'true'

    const newIsLiked = !isCurrentlyLiked
    const newLikes = newIsLiked
      ? (currentLikes || 0) + 1
      : Math.max(0, (currentLikes || 0) - 1)

    // Persist in localStorage
    if (typeof window !== 'undefined') {
      if (newIsLiked) {
        localStorage.setItem(likedKey, 'true')
      } else {
        localStorage.removeItem(likedKey)
      }
    }

    // Immediate optimistic update
    setComments((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, likes: newLikes, userHasLiked: newIsLiked }
          : item
      )
    )

    if (id !== DEFAULT_AUTHOR_COMMENT.id) {
      try {
        await updateCommentLikesService(id, newLikes)
      } catch (err) {
        console.log('Backend like sync error, persisted locally:', err)
      }
    }
  }

  // Add a reply to a comment (Comment on Comment)
  const addReply = async ({
    commentId,
    name,
    message,
  }: {
    commentId: number
    name: string
    message: string
  }) => {
    if (!name.trim() || !message.trim()) return

    const newReply = {
      id: `reply-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      name: name.trim(),
      username: name.trim(),
      message: message.trim(),
      created_at: new Date().toISOString(),
      likes: 0,
      userHasLiked: false,
    }

    // 1. Save to local storage for permanent local persistence
    if (typeof window !== 'undefined') {
      const localRepliesKey = `comment-replies-${commentId}`
      try {
        const existing = JSON.parse(localStorage.getItem(localRepliesKey) || '[]')
        localStorage.setItem(localRepliesKey, JSON.stringify([...existing, newReply]))
      } catch (e) {
        console.log(e)
      }
    }

    // 2. Optimistic UI update
    setComments((prev) =>
      prev.map((c) => {
        if (c.id === commentId) {
          const currentReplies = Array.isArray(c.replies) ? c.replies : []
          return {
            ...c,
            replies: [...currentReplies, newReply],
          }
        }
        return c
      })
    )

    // 3. Sync to Supabase if not synthetic author comment
    if (commentId !== DEFAULT_AUTHOR_COMMENT.id) {
      try {
        await addReplyService({ commentId, reply: newReply })
      } catch (err) {
        console.log('Supabase reply sync error, saved locally:', err)
      }
    }
  }

  // Toggle like on a reply
  const likeReply = (commentId: number, replyId: string | number) => {
    const likedKey = `liked-reply-${replyId}`
    const isLiked = typeof window !== 'undefined' && localStorage.getItem(likedKey) === 'true'
    const newIsLiked = !isLiked

    if (typeof window !== 'undefined') {
      if (newIsLiked) localStorage.setItem(likedKey, 'true')
      else localStorage.removeItem(likedKey)
    }

    setComments((prev) =>
      prev.map((c) => {
        if (c.id === commentId && Array.isArray(c.replies)) {
          return {
            ...c,
            replies: c.replies.map((r: any) => {
              if (r.id === replyId) {
                const cur = r.likes || 0
                return {
                  ...r,
                  likes: newIsLiked ? cur + 1 : Math.max(0, cur - 1),
                  userHasLiked: newIsLiked,
                }
              }
              return r
            }),
          }
        }
        return c
      })
    )
  }

  return {
    comments,
    loading,
    addComment,
    likeComment,
    addReply,
    likeReply,
  }
}
