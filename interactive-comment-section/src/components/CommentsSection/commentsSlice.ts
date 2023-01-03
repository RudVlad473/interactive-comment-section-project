import {
  PayloadAction,
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit"

import ICommentsRepository from "../../Repositories/IRepositories/ICommentRepository"
import CommentLocalJsonRepository from "../../Repositories/Repositories/CommentLocalJsonRepository"
import { FetchStatus } from "../../api/commentsApi"
import addReplyingToArticle from "../../helpers/functions/addReplyingToArticle"
import { assignSequentialIds } from "../../helpers/functions/idGenerator"
import { IReply } from "../../models/Reply/IReply"
import { RootState } from "./../../app/store"
import { CommentId, IComment } from "./../../models/Comment/IComment"
import { ICommentContent } from "./../../models/CommentContent/ICommentContent"

export interface CommentsSliceState {
  comments: IComment[]
}

export interface CommentsInitialState {
  commentsSliceState: CommentsSliceState
  status: FetchStatus
  error: Error | undefined
}

const initialState: CommentsInitialState = {
  commentsSliceState: {
    comments: [],
  },
  status: FetchStatus.IDLE,
  error: undefined,
}

const commentsRepository: ICommentsRepository = new CommentLocalJsonRepository()
export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async () => {
    const fetchedComments = (await commentsRepository.get()) || []
    return fetchedComments
  }
)

function prepareComments(comments: IComment[]): IComment[] {
  assignSequentialIds(comments)

  for (const { replies } of comments) {
    prepareReplies(replies)
  }

  return comments
}

function prepareReplies(replies: IReply[]): IReply[] {
  assignSequentialIds(replies)
  for (const reply of replies) {
    reply.article = addReplyingToArticle(reply.replyingTo, reply.article)
  }

  return replies
}

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    append: {
      reducer: (state, action: PayloadAction<IComment[]>) => {
        state.commentsSliceState.comments.push(...action.payload)
      },
      prepare: (payload: IComment[]) => ({ payload: prepareComments(payload) }),
    },

    remove: (state, action: PayloadAction<CommentId[]>) => {
      const idsToDelete = new Set(action.payload)

      for (const id of idsToDelete) {
        const commentsCountBeforeFilter =
          state.commentsSliceState.comments.length

        state.commentsSliceState.comments =
          state.commentsSliceState.comments.filter(
            (comment) => !idsToDelete.has(comment.id)
          )

        if (
          state.commentsSliceState.comments.length === commentsCountBeforeFilter
        ) {
          for (const comment of state.commentsSliceState.comments) {
            const repliesCountBeforeFilter = comment.replies?.length

            comment.replies = comment.replies?.filter((reply) => reply.id != id)

            if (repliesCountBeforeFilter !== comment.replies?.length) {
              break
            }
          }
        } else {
          break
        }
      }
    },

    reply: {
      reducer: (
        { commentsSliceState },
        { payload }: PayloadAction<{ reply: IReply; commentId: CommentId }>
      ) => {
        const commentToReplyTo = commentsSliceState.comments.find(
          (comment) => comment.id == payload.commentId
        )
        let wasReplied = false

        if (!commentToReplyTo) {
          for (const firstLvlComment of commentsSliceState.comments) {
            if (
              firstLvlComment.replies.find(
                (comment) => comment.id === payload.commentId
              )
            ) {
              firstLvlComment.replies.push(payload.reply)
              wasReplied = true
              break
            }
          }
        } else {
          commentToReplyTo.replies.push(payload.reply)

          wasReplied = true
        }

        if (!wasReplied) {
          throw new Error("Such comment doesn't exist to reply")
        }
      },
      prepare: (payload: { reply: IReply; commentId: CommentId }) => ({
        payload: {
          ...payload,
          reply: prepareReplies([payload.reply])[0] as IReply,
        },
      }),
    },

    edit: (
      { commentsSliceState },
      { payload }: PayloadAction<ICommentContent>
    ) => {
      let commentToEditIndex: number | undefined =
        commentsSliceState.comments.findIndex(
          (comment) => comment.id === payload.id
        )

      if (commentToEditIndex === -1) {
        for (const comment of commentsSliceState.comments) {
          commentToEditIndex = comment.replies?.findIndex(
            (reply) => reply.id === payload.id
          )

          if (commentToEditIndex !== -1) {
            comment.replies[commentToEditIndex] = {
              ...comment.replies[commentToEditIndex],
              ...payload,
            } as IReply
            break
          }
        }

        if (commentToEditIndex === -1) {
          throw new Error("There is no such comment to edit")
        }
      } else {
        commentsSliceState.comments[commentToEditIndex] = {
          ...commentsSliceState.comments[commentToEditIndex],
          ...payload,
        } as IComment
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = FetchStatus.LOADING
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = FetchStatus.SUCCEDED

        state.commentsSliceState.comments = prepareComments(action.payload)
        //state.commentsSliceState.comments.push(...(action.payload || []))
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = FetchStatus.FAILED

        state.error = new Error(action.error.message)
      })
  },
})

export function selectAllComments(
  state: RootState
): CommentsInitialState["commentsSliceState"]["comments"] {
  return state.comments.commentsSliceState.comments
}
export function getCommentsStatus(
  state: RootState
): CommentsInitialState["status"] {
  return state.comments.status
}
export function getCommentsError(
  state: RootState
): CommentsInitialState["error"] {
  return state.comments.error
}

export const selectAllCommentsMemo = createSelector(
  [selectAllComments],
  (comments) => comments
)

export const { append, remove, reply, edit } = commentsSlice.actions

export const CommentsSliceReducer = commentsSlice.reducer
