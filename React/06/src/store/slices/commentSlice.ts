import { starterComments } from '../demoData'
import type { CommentSlice, DesignHubSlice } from '../types'

export const createCommentSlice: DesignHubSlice<CommentSlice> = (set, get) => ({
  comments: starterComments,
  addComment: (comment) =>
    set(
      (state) => ({
        comments: [comment, ...state.comments],
      }),
      false,
      'comments/addComment',
    ),
  getCommentsByFile: (fileId) =>
    get().comments.filter((comment) => comment.fileId === fileId),
})
