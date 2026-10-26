'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import {
  Upload,
  Heart,
  Pin,
  MessageSquare,
  ShieldCheck,
  X,
  Send,
  Sparkles,
  Maximize2,
  Smile,
  CornerDownRight,
  Reply,
  Clock,
} from 'lucide-react'
import useComments, { DEFAULT_AUTHOR_COMMENT } from '@/hooks/useComments'

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1]

const QUICK_EMOJIS = ['❤️', '🔥', '🚀', '👏', '💯', '😊', '✨', '⚡', '🙌', '🎉']

const EXTENDED_EMOJIS = [
  '😀', '😂', '😎', '😍', '🔥', '❤️', '🚀', '👏',
  '🙌', '✨', '💯', '⚡', '🎉', '💡', '💻', '🎯',
  '⭐', '👍', '🤝', '🙏', '🫡', '💪', '🤩', '🥳',
]

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
    },
  },
}

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: smoothEase,
    },
  },
}

const formatCommentDate = (dateString?: string) => {
  if (!dateString) return ''
  try {
    const d = new Date(dateString)
    if (isNaN(d.getTime())) return ''

    const day = d.getDate()
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec',
    ]
    const month = months[d.getMonth()]
    const year = d.getFullYear()

    let hours = d.getHours()
    const minutes = d.getMinutes().toString().padStart(2, '0')
    const ampm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12 || 12

    return `${day} ${month} ${year} • ${hours}:${minutes} ${ampm}`
  } catch (e) {
    return ''
  }
}

export default function CommentsSection() {
  const { comments, loading, addComment, likeComment, addReply, likeReply } =
    useComments()

  const [name, setName] = useState('')
  const [comment, setComment] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)

  // Main Emoji picker state
  const [showMainEmojiPicker, setShowMainEmojiPicker] = useState(false)

  // Reply state
  const [replyingToId, setReplyingToId] = useState<number | null>(null)
  const [replyName, setReplyName] = useState('')
  const [replyMessage, setReplyMessage] = useState('')
  const [replyError, setReplyError] = useState<string | null>(null)
  const [replyLoading, setReplyLoading] = useState(false)

  // Close lightbox on Escape key & handle body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxImage(null)
      }
    }
    if (lightboxImage) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [lightboxImage])

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('Image size must be under 5MB')
      return
    }

    setErrorMsg(null)
    setImage(file)
    setPreview(URL.createObjectURL(file))
  }

  const removeImage = () => {
    setImage(null)
    setPreview(null)
  }

  const handleSubmit = async () => {
    if (!name.trim() || !comment.trim()) {
      setErrorMsg('Please enter both your name and comment')
      return
    }

    setErrorMsg(null)

    await addComment({
      name: name.trim(),
      comment: comment.trim(),
      image,
    })

    setName('')
    setComment('')
    setImage(null)
    setPreview(null)
    setShowMainEmojiPicker(false)
  }

  const startReplying = (commentId: number, targetName: string) => {
    if (replyingToId === commentId) {
      setReplyingToId(null)
      return
    }
    setReplyingToId(commentId)
    // Pre-fill name if user already entered name in main form
    if (!replyName && name) {
      setReplyName(name)
    }
    setReplyMessage('')
    setReplyError(null)
  }

  const handleSendReply = async (commentId: number) => {
    if (!replyName.trim() || !replyMessage.trim()) {
      setReplyError('Please enter both your name and reply')
      return
    }

    setReplyError(null)
    setReplyLoading(true)

    await addReply({
      commentId,
      name: replyName.trim(),
      message: replyMessage.trim(),
    })

    setReplyLoading(false)
    setReplyMessage('')
    setReplyingToId(null)
  }

  // Count non-pinned visitor comments
  const visitorCommentsCount = comments.filter((c) => !c.is_pinned).length

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.8,
        ease: smoothEase,
      }}
      viewport={{ once: false, amount: 0.2 }}
      className="rounded-[28px] md:rounded-[34px] border border-[rgba(220,38,38,0.12)] bg-[rgba(10,2,2,0.6)] backdrop-blur-xl p-5 sm:p-6 md:p-8 h-full flex flex-col justify-between"
    >
      <div>
        {/* HEADER */}
        <div className="flex items-center justify-between mb-5 md:mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#dc2626] animate-pulse" />
              <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white">
                Live Comments
              </h3>
            </div>
            <p className="text-xs md:text-sm text-white/50">
              Share your thoughts, feedback, or say hello
            </p>
          </div>

          <div className="px-3 py-1 rounded-full bg-[rgba(220,38,38,0.1)] border border-[rgba(220,38,38,0.25)] text-[#ef4444] font-mono text-xs flex items-center gap-1.5 shrink-0">
            <Sparkles size={12} />
            <span>{comments.length} Posts</span>
          </div>
        </div>

        {/* FORM */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          className="space-y-3 mb-5 md:mb-6"
        >
          {/* NAME INPUT */}
          <motion.div variants={itemVariants}>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (errorMsg) setErrorMsg(null)
              }}
              maxLength={50}
              placeholder="Your Name"
              className="w-full rounded-2xl border border-[rgba(220,38,38,0.14)] bg-[#050000]/80 px-4 py-3 md:py-3.5 text-sm text-white placeholder-white/35 outline-none transition-all focus:border-[#dc2626] focus:ring-1 focus:ring-[#dc2626]/30"
            />
          </motion.div>

          {/* COMMENT TEXTAREA WITH EMOJI BAR */}
          <motion.div variants={itemVariants} className="space-y-2">
            <div className="relative">
              <textarea
                rows={3}
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value)
                  if (errorMsg) setErrorMsg(null)
                }}
                maxLength={400}
                placeholder="Leave a message or feedback..."
                className="w-full rounded-2xl border border-[rgba(220,38,38,0.14)] bg-[#050000]/80 px-4 py-3 md:py-3.5 pb-9 text-sm text-white placeholder-white/35 outline-none resize-none transition-all focus:border-[#dc2626] focus:ring-1 focus:ring-[#dc2626]/30"
              />

              {/* Emoji Button in corner */}
              <button
                type="button"
                onClick={() => setShowMainEmojiPicker((prev) => !prev)}
                className="absolute right-3 bottom-3 p-1.5 rounded-lg bg-white/5 hover:bg-[#dc2626]/20 text-white/60 hover:text-[#ef4444] transition-all cursor-pointer"
                title="Add Emojis"
              >
                <Smile size={16} />
              </button>
            </div>

            {/* QUICK EMOJI BAR */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-[10px] font-mono text-white/35 uppercase mr-1 shrink-0">
                Emojis:
              </span>
              {QUICK_EMOJIS.map((em) => (
                <button
                  key={em}
                  type="button"
                  onClick={() => setComment((prev) => prev + em)}
                  className="w-7 h-7 rounded-lg bg-white/[0.03] hover:bg-[#dc2626]/20 border border-white/5 hover:border-[#dc2626]/30 flex items-center justify-center text-sm transition-all shrink-0 hover:scale-110 active:scale-95 cursor-pointer"
                  title={`Add ${em}`}
                >
                  {em}
                </button>
              ))}
            </div>

            {/* EXPANDED EMOJI PICKER POPUP */}
            <AnimatePresence>
              {showMainEmojiPicker && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="p-3 rounded-2xl border border-[rgba(220,38,38,0.25)] bg-[#0a0000]/95 backdrop-blur-md shadow-[0_0_30px_rgba(220,38,38,0.15)]"
                >
                  <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-white/5 text-[11px] font-mono text-white/50">
                    <span>Tap to insert emoji</span>
                    <button
                      type="button"
                      onClick={() => setShowMainEmojiPicker(false)}
                      className="text-white/40 hover:text-white transition-colors"
                    >
                      Close ×
                    </button>
                  </div>
                  <div className="grid grid-cols-8 sm:grid-cols-12 gap-1.5">
                    {EXTENDED_EMOJIS.map((em) => (
                      <button
                        key={em}
                        type="button"
                        onClick={() => setComment((prev) => prev + em)}
                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#dc2626]/25 border border-white/5 flex items-center justify-center text-base hover:scale-115 active:scale-90 transition-all cursor-pointer"
                      >
                        {em}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* UPLOAD & PREVIEW */}
          <motion.div variants={itemVariants}>
            {!preview ? (
              <label className="rounded-2xl border border-dashed border-[rgba(220,38,38,0.18)] bg-[#050000]/50 hover:bg-[#dc2626]/[0.03] p-3 flex items-center justify-between gap-3 cursor-pointer transition-all">
                <div className="flex items-center gap-2.5 text-xs md:text-sm text-white/65">
                  <div className="w-7 h-7 rounded-lg bg-[rgba(220,38,38,0.1)] flex items-center justify-center text-[#ef4444]">
                    <Upload size={14} />
                  </div>
                  <span>Attach an image (optional)</span>
                </div>
                <span className="text-[11px] font-mono text-white/40">PNG, JPG up to 5MB</span>
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                />
              </label>
            ) : (
              <div className="relative rounded-2xl border border-[rgba(220,38,38,0.25)] bg-[#050000] p-2 sm:p-2.5 flex items-center gap-3">
                {/* Clickable Thumbnail Button */}
                <button
                  type="button"
                  onClick={() => setLightboxImage(preview)}
                  className="relative group/thumb cursor-pointer shrink-0 rounded-xl overflow-hidden focus:outline-none"
                  title="Click to view full screen"
                >
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-14 h-14 rounded-xl object-cover border border-white/10 group-hover/thumb:border-[#dc2626]/60 transition-all group-hover/thumb:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/45 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <Maximize2 size={16} />
                  </div>
                </button>

                {/* Clickable Info Area */}
                <div
                  className="flex-1 min-w-0 cursor-pointer"
                  onClick={() => setLightboxImage(preview)}
                  title="Click to view full screen"
                >
                  <p className="text-xs font-medium text-white truncate hover:text-[#ef4444] transition-colors flex items-center gap-1.5">
                    <span className="truncate">{image?.name || 'Attached image'}</span>
                    <Maximize2 size={11} className="text-white/40 shrink-0" />
                  </p>
                  <p className="text-[11px] text-white/45 hover:text-white/70 transition-colors">
                    Click image to view full screen ↗
                  </p>
                </div>

                {/* Remove Button */}
                <button
                  type="button"
                  onClick={removeImage}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#dc2626]/20 flex items-center justify-center text-white/70 hover:text-[#ef4444] transition-all shrink-0 cursor-pointer"
                  title="Remove image"
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </motion.div>

          {/* ERROR NOTICE */}
          <AnimatePresence>
            {errorMsg && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="text-xs text-[#ef4444] font-medium px-2"
              >
                ⚠ {errorMsg}
              </motion.p>
            )}
          </AnimatePresence>

          {/* SUBMIT BUTTON */}
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            disabled={loading}
            className="w-full rounded-2xl py-3.5 md:py-4 bg-gradient-to-r from-[#dc2626]/20 via-[#dc2626]/30 to-[#dc2626]/20 hover:from-[#dc2626]/30 hover:to-[#dc2626]/40 border border-[#dc2626]/40 hover:border-[#dc2626]/60 text-white font-medium text-sm transition-all shadow-[0_0_20px_rgba(220,38,38,0.15)] flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Posting comment...</span>
              </>
            ) : (
              <>
                <Send size={15} className="text-[#ef4444]" />
                <span>Post Comment</span>
              </>
            )}
          </motion.button>
        </motion.div>
      </div>

      {/* COMMENTS LIST FEED */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false }}
        className="rounded-[24px] md:rounded-[28px] border border-[rgba(220,38,38,0.12)] bg-[#050000]/80 p-3.5 sm:p-4 max-h-[380px] md:max-h-[440px] overflow-y-auto custom-scroll flex flex-col gap-3"
      >
        {/* FEED TOP STATUS BAR */}
        <div className="flex items-center justify-between px-2 pb-2.5 border-b border-white/5 text-[10px] sm:text-[11px] font-mono text-white/40 uppercase tracking-wider">
          <span className="flex items-center gap-1.5 text-white/60">
            <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] animate-pulse" />
            Live Feed ({comments.length})
          </span>
          <span className="text-[10px] text-white/30">Verified Wall</span>
        </div>

        <div className="space-y-3">
          <AnimatePresence initial={false}>
            {comments.map((item, i) => {
              const isAuthor =
                item.is_author ||
                item.name?.toLowerCase().includes('akshay') ||
                item.id === DEFAULT_AUTHOR_COMMENT.id

              const isLiked = Boolean(item.userHasLiked)
              const repliesList = Array.isArray(item.replies) ? item.replies : []
              const isReplyingThis = replyingToId === item.id

              return (
                <motion.div
                  key={item.id || i}
                  layout
                  initial={{
                    opacity: 0,
                    y: 16,
                    scale: 0.97,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: -10,
                    scale: 0.97,
                  }}
                  transition={{
                    duration: 0.45,
                    ease: smoothEase,
                  }}
                  className={`rounded-[20px] md:rounded-[22px] border p-3.5 sm:p-4 transition-all ${
                    item.is_pinned
                      ? 'border-[#dc2626]/40 bg-gradient-to-br from-[#dc2626]/10 via-[#0a0000] to-[#dc2626]/5 shadow-[0_0_20px_rgba(220,38,38,0.08)]'
                      : 'border-white/10 hover:border-[#dc2626]/30 bg-white/[0.02] hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* AVATAR */}
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        isAuthor
                          ? 'bg-gradient-to-tr from-[#dc2626] to-[#ef4444] text-white shadow-[0_0_12px_rgba(220,38,38,0.4)]'
                          : 'bg-[rgba(220,38,38,0.12)] border border-[rgba(220,38,38,0.25)] text-[#ef4444]'
                      }`}
                    >
                      {isAuthor ? 'AS' : (item.name?.charAt(0)?.toUpperCase() || 'U')}
                    </div>

                    {/* CONTENT */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <p className="text-sm font-semibold text-white truncate">
                          {item.name}
                        </p>

                        {isAuthor && (
                          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#dc2626]/20 border border-[#dc2626]/40 text-[10px] font-mono font-semibold text-[#ef4444]">
                            <ShieldCheck size={11} />
                            AUTHOR
                          </span>
                        )}

                        {item.is_pinned && (
                          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/35 text-[10px] font-mono font-semibold text-purple-300">
                            <Pin size={10} className="fill-purple-300" />
                            PINNED
                          </span>
                        )}

                        {item.created_at && (
                          <span
                            suppressHydrationWarning
                            className="text-[10px] sm:text-[11px] font-mono text-white/40 flex items-center gap-1 sm:ml-auto"
                          >
                            <Clock size={10} className="text-[#dc2626]" />
                            {formatCommentDate(item.created_at)}
                          </span>
                        )}
                      </div>

                      <p className="text-[12px] sm:text-[13px] text-white/75 leading-relaxed break-words whitespace-pre-wrap">
                        {item.comment}
                      </p>

                      {/* COMMENT ATTACHED IMAGE (CLICKABLE FOR LIGHTBOX) */}
                      {item.image_url && (
                        <div className="mt-3">
                          <button
                            type="button"
                            onClick={() => setLightboxImage(item.image_url)}
                            className="relative group/feedImg block w-full rounded-xl overflow-hidden cursor-pointer focus:outline-none text-left"
                            title="Click to view full screen"
                          >
                            <img
                              src={item.image_url}
                              alt="Attached file"
                              className="rounded-xl w-full max-h-48 sm:max-h-56 object-cover border border-white/10 group-hover/feedImg:border-[#dc2626]/50 transition-all"
                            />
                            <div className="absolute bottom-2 right-2 px-2 py-1 rounded-md bg-black/75 backdrop-blur-sm border border-white/15 text-[10px] text-white/90 opacity-0 group-hover/feedImg:opacity-100 transition-opacity flex items-center gap-1">
                              <Maximize2 size={10} />
                              <span>View Fullscreen</span>
                            </div>
                          </button>
                        </div>
                      )}

                      {/* ACTION BAR: LIKE + REPLY */}
                      <div className="flex items-center gap-3 mt-3 pt-2 border-t border-white/5">
                        {/* LIKE BUTTON */}
                        <button
                          type="button"
                          onClick={() => likeComment(item.id, item.likes)}
                          className={`flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                            isLiked
                              ? 'text-[#ef4444] bg-[#dc2626]/15 font-medium border border-[#dc2626]/30'
                              : 'text-white/45 hover:text-[#ef4444] hover:bg-white/5'
                          }`}
                          title={isLiked ? 'Unlike comment' : 'Like comment'}
                        >
                          <Heart
                            size={12}
                            className={isLiked ? 'fill-[#ef4444] text-[#ef4444]' : ''}
                          />
                          <span>{item.likes || 0}</span>
                        </button>

                        {/* REPLY BUTTON */}
                        <button
                          type="button"
                          onClick={() => startReplying(item.id, item.name)}
                          className={`flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                            isReplyingThis
                              ? 'text-[#ef4444] bg-[#dc2626]/10 border border-[#dc2626]/30'
                              : 'text-white/45 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <Reply size={12} />
                          <span>Reply</span>
                          {repliesList.length > 0 && (
                            <span className="px-1.5 py-0.2 rounded-full bg-white/10 text-[9px] text-white/70">
                              {repliesList.length}
                            </span>
                          )}
                        </button>
                      </div>

                      {/* INLINE REPLY BOX */}
                      <AnimatePresence>
                        {isReplyingThis && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-3 p-3 rounded-xl border border-[rgba(220,38,38,0.25)] bg-[#070000] space-y-2 overflow-hidden"
                          >
                            <div className="flex items-center justify-between text-xs text-white/60 pb-1 border-b border-white/5">
                              <span className="flex items-center gap-1 text-[#ef4444] font-medium text-[11px]">
                                <CornerDownRight size={12} />
                                Replying to @{item.name}
                              </span>
                              <button
                                type="button"
                                onClick={() => setReplyingToId(null)}
                                className="text-white/40 hover:text-white transition-colors cursor-pointer text-[11px]"
                              >
                                Cancel ×
                              </button>
                            </div>

                            <input
                              value={replyName}
                              onChange={(e) => setReplyName(e.target.value)}
                              placeholder="Your Name"
                              maxLength={40}
                              className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-1.5 text-xs text-white placeholder-white/35 outline-none focus:border-[#dc2626]"
                            />

                            <div className="relative">
                              <textarea
                                rows={2}
                                value={replyMessage}
                                onChange={(e) => setReplyMessage(e.target.value)}
                                placeholder="Write a reply..."
                                maxLength={300}
                                className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs text-white placeholder-white/35 outline-none resize-none focus:border-[#dc2626]"
                              />
                            </div>

                            {/* Reply Quick Emojis */}
                            <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
                              {QUICK_EMOJIS.slice(0, 8).map((em) => (
                                <button
                                  key={em}
                                  type="button"
                                  onClick={() => setReplyMessage((prev) => prev + em)}
                                  className="w-6 h-6 rounded-md bg-white/5 hover:bg-[#dc2626]/20 border border-white/5 flex items-center justify-center text-xs shrink-0 cursor-pointer"
                                >
                                  {em}
                                </button>
                              ))}
                            </div>

                            {replyError && (
                              <p className="text-[11px] text-[#ef4444]">
                                ⚠ {replyError}
                              </p>
                            )}

                            <div className="flex justify-end gap-2 pt-1">
                              <button
                                type="button"
                                onClick={() => setReplyingToId(null)}
                                className="px-3 py-1.5 rounded-lg text-xs text-white/50 hover:text-white cursor-pointer"
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                onClick={() => handleSendReply(item.id)}
                                disabled={replyLoading}
                                className="px-3.5 py-1.5 rounded-lg bg-[#dc2626] hover:bg-[#ef4444] text-white text-xs font-medium flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(220,38,38,0.4)] disabled:opacity-50 cursor-pointer"
                              >
                                {replyLoading ? (
                                  <span>Sending...</span>
                                ) : (
                                  <>
                                    <Send size={11} />
                                    <span>Send Reply</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* DISPLAY NESTED REPLIES */}
                      {repliesList.length > 0 && (
                        <div className="mt-3 pt-2.5 border-l-2 border-[#dc2626]/25 pl-3 sm:pl-3.5 space-y-2">
                          {repliesList.map((r: any, rIndex: number) => {
                            const isReplyLiked = Boolean(r.userHasLiked)
                            const isReplyAuthor =
                              r.name?.toLowerCase().includes('akshay') ||
                              r.username?.toLowerCase().includes('akshay') ||
                              r.username?.toLowerCase() === 'admin'

                            return (
                              <div
                                key={r.id || rIndex}
                                className="p-2.5 rounded-xl border border-white/5 bg-white/[0.015] hover:bg-white/[0.03] transition-all"
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                                    <div
                                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 ${
                                        isReplyAuthor
                                          ? 'bg-gradient-to-tr from-[#dc2626] to-[#ef4444] text-white'
                                          : 'bg-[rgba(220,38,38,0.15)] text-[#ef4444]'
                                      }`}
                                    >
                                      {r.name?.charAt(0)?.toUpperCase() || 'R'}
                                    </div>
                                    <span className="text-xs font-medium text-white">
                                      {r.name || r.username || 'Visitor'}
                                    </span>
                                    {isReplyAuthor && (
                                      <span className="px-1.5 py-0.2 rounded-full bg-[#dc2626]/20 border border-[#dc2626]/30 text-[9px] font-mono text-[#ef4444]">
                                        AUTHOR
                                      </span>
                                    )}
                                    <span className="text-[10px] text-white/35 font-mono">
                                      ↳ replied
                                    </span>
                                    {r.created_at && (
                                      <span
                                        suppressHydrationWarning
                                        className="text-[9px] sm:text-[10px] font-mono text-white/40 flex items-center gap-1"
                                      >
                                        • {formatCommentDate(r.created_at)}
                                      </span>
                                    )}
                                  </div>

                                  {/* LIKE ON REPLY */}
                                  <button
                                    type="button"
                                    onClick={() => likeReply(item.id, r.id)}
                                    className={`flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded transition-all cursor-pointer ${
                                      isReplyLiked
                                        ? 'text-[#ef4444] bg-[#dc2626]/10 font-medium'
                                        : 'text-white/35 hover:text-[#ef4444]'
                                    }`}
                                    title={isReplyLiked ? 'Unlike' : 'Like'}
                                  >
                                    <Heart
                                      size={10}
                                      className={isReplyLiked ? 'fill-[#ef4444] text-[#ef4444]' : ''}
                                    />
                                    <span>{r.likes || 0}</span>
                                  </button>
                                </div>

                                <p className="text-[11px] sm:text-xs text-white/70 leading-relaxed whitespace-pre-wrap pl-7">
                                  {r.message}
                                </p>
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>

          {/* EMPTY VISITOR CALLOUT IF ONLY PINNED COMMENT EXISTS */}
          {visitorCommentsCount === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-[20px] border border-dashed border-[#dc2626]/25 bg-[#dc2626]/[0.02] p-4 text-center mt-2"
            >
              <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-[#dc2626]/10 border border-[#dc2626]/30 flex items-center justify-center text-[#ef4444]">
                <MessageSquare size={14} />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-white/80 mb-0.5">
                Be the first visitor to leave a thought!
              </p>
              <p className="text-[11px] text-white/45 max-w-xs mx-auto">
                Write a comment above or reply to Akshay to share feedback.
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[999999] bg-[#050000]/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-6 md:p-8"
            onClick={() => setLightboxImage(null)}
          >
            {/* Top Bar */}
            <div
              className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 flex items-center justify-between z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0a0000]/80 border border-white/10 text-xs text-white/80">
                <span className="w-2 h-2 rounded-full bg-[#dc2626] animate-pulse" />
                <span className="font-mono">Image Preview</span>
              </div>

              <button
                type="button"
                onClick={() => setLightboxImage(null)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-[#dc2626]/20 border border-white/15 hover:border-[#dc2626]/50 text-white text-xs transition-all shadow-lg cursor-pointer"
                title="Close (Esc)"
              >
                <span>Close</span>
                <X size={14} />
              </button>
            </div>

            {/* Central Fullscreen Image Container */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25, ease: smoothEase }}
              className="relative max-w-4xl max-h-[82vh] w-auto h-auto flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightboxImage}
                alt="Fullscreen Preview"
                className="max-w-full max-h-[82vh] w-auto h-auto object-contain rounded-2xl border border-[rgba(220,38,38,0.3)] shadow-[0_0_50px_rgba(220,38,38,0.3)]"
              />
            </motion.div>

            {/* Bottom Hint */}
            <p className="absolute bottom-4 sm:bottom-6 text-[11px] font-mono text-white/40 tracking-wider">
              Click anywhere outside or press ESC to exit
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
