import { supabase } from '@/lib/supabase'

export const fetchCommentsService = async () => {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .order('is_pinned', { ascending: false })
    .order('created_at', { ascending: false })

  if (error) throw error

  return data || []
}

export const updateCommentLikesService = async (
  id: number,
  newLikes: number
) => {
  if (!supabase) return newLikes
  const safeLikes = Math.max(0, newLikes)

  const { error } = await supabase
    .from('comments')
    .update({ likes: safeLikes })
    .eq('id', id)

  if (error) throw error

  return safeLikes
}

export const likeCommentService = async (
  id: number,
  currentLikes: number
) => {
  return updateCommentLikesService(id, (currentLikes || 0) + 1)
}

export const uploadCommentImageService = async (
  image: File
) => {
  if (!supabase) throw new Error('Supabase is not configured')
  const fileName = `${Date.now()}-${image.name}`

  const { error } = await supabase.storage
    .from('comments')
    .upload(fileName, image)

  if (error) throw error

  const { data } = supabase.storage
    .from('comments')
    .getPublicUrl(fileName)

  return data.publicUrl
}

export const createCommentService = async ({
  name,
  comment,
  imageUrl,
}: {
  name: string
  comment: string
  imageUrl: string | null
}) => {
  if (!supabase) throw new Error('Supabase is not configured')
  const clientNow = new Date().toISOString()
  const { data, error } = await supabase
    .from('comments')
    .insert([
      {
        name,
        comment,
        image_url: imageUrl,
        likes: 0,
        replies: [],
        is_pinned: false,
        created_at: clientNow,
      },
    ])
    .select()
    .single()

  if (error) throw error

  return data
}

export const addReplyService = async ({
  commentId,
  reply,
}: {
  commentId: number
  reply: {
    id: string | number
    name: string
    username?: string
    message: string
    created_at: string
    likes?: number
  }
}) => {
  if (!supabase) return [reply]

  const { data: currentComment, error: fetchErr } = await supabase
    .from('comments')
    .select('replies')
    .eq('id', commentId)
    .single()

  if (fetchErr && fetchErr.code !== 'PGRST116') {
    console.log('Error fetching current replies:', fetchErr)
  }

  const existingReplies = Array.isArray(currentComment?.replies)
    ? currentComment.replies
    : []

  const updatedReplies = [...existingReplies, reply]

  const { error: updateErr } = await supabase
    .from('comments')
    .update({ replies: updatedReplies })
    .eq('id', commentId)

  if (updateErr) throw updateErr

  return updatedReplies
}