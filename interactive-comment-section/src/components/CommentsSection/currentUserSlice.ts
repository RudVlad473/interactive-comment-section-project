import {
  PayloadAction,
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit"

import ICurrentUserRepository from "../../Repositories/IRepositories/ICurrentUserRepository"
import CurrentUserLocalJsonRepository from "../../Repositories/Repositories/CurrentUserLocalJsonRepository"
import { FetchStatus } from "../../api/commentsApi"
import { CommentId, ReactedComment } from "../../models/Comment/IComment"
import { RootState } from "./../../app/store"
import { ICurrentUser, UserName } from "./../../models/User/IUser"

export interface CurrentUserSliceState {
  currentUser: ICurrentUser
}

export interface CurrentUserInitialState {
  currentUserSliceState: CurrentUserSliceState
  status: FetchStatus
  error: Error | undefined
}

const initialState: CurrentUserInitialState = {
  currentUserSliceState: {
    currentUser: { avatarUrl: "", userName: "You", reactedComments: [] },
  },
  status: FetchStatus.IDLE,
  error: undefined,
}

const currentUserRepository: ICurrentUserRepository =
  new CurrentUserLocalJsonRepository()
export const fetchCurrentUser = createAsyncThunk(
  "currentUser/fetchCurrentUser",
  async () => {
    const fetchedCurrentUser = await currentUserRepository.get()

    return fetchedCurrentUser
  }
)

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    likeComment: (
      { currentUserSliceState },
      { payload }: PayloadAction<CommentId>
    ) => {
      const currentReaction =
        currentUserSliceState.currentUser.reactedComments.find(
          (reactedComment) => reactedComment.commentId == payload
        )
      const newReaction: ReactedComment = {
        commentId: payload,
        reaction:
          currentReaction?.reaction === undefined
            ? "+"
            : currentReaction.reaction === "+"
            ? undefined
            : undefined,
      }

      if (currentReaction) {
        currentReaction.reaction = newReaction.reaction
      } else {
        currentUserSliceState.currentUser.reactedComments.push(newReaction)
      }
    },

    dislikeComment: (
      { currentUserSliceState },
      { payload }: PayloadAction<CommentId>
    ) => {
      const currentReaction =
        currentUserSliceState.currentUser.reactedComments.find(
          (reactedComment) => reactedComment.commentId == payload
        )
      const newReaction: ReactedComment = {
        commentId: payload,
        reaction:
          currentReaction?.reaction === undefined
            ? "-"
            : currentReaction?.reaction === "-"
            ? undefined
            : undefined,
      }

      if (currentReaction) {
        currentReaction.reaction = newReaction.reaction
      } else {
        currentUserSliceState.currentUser.reactedComments.push(newReaction)
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.status = FetchStatus.LOADING
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.status = FetchStatus.SUCCEDED

        //state.commentsSliceState.comments = prepareComments(action.payload)
        state.currentUserSliceState.currentUser = action.payload as ICurrentUser
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.status = FetchStatus.FAILED

        state.error = new Error(action.error.message)
      })
  },
})

export function selectCurrentUser(
  state: RootState
): CurrentUserInitialState["currentUserSliceState"]["currentUser"] {
  return state.currentUser.currentUserSliceState.currentUser
}

export function getCurrentUserStatus(
  state: RootState
): CurrentUserInitialState["status"] {
  return state.currentUser.status
}

export function getCurrentUserError(
  state: RootState
): CurrentUserInitialState["error"] {
  return state.currentUser.error
}

export const selectCurrentUserMemo = createSelector(
  [selectCurrentUser],
  (currentUser) => currentUser
)

export const selectIsCurrentUser = createSelector(
  [
    (state: RootState, userName: UserName) =>
      state.currentUser.currentUserSliceState.currentUser.userName === userName,
  ],
  (isCurrentUser) => isCurrentUser
)
export const selectCurrentReaction = createSelector(
  [
    (state: RootState, currentCommentId: number) =>
      state.currentUser.currentUserSliceState.currentUser.reactedComments.find(
        (comment) => comment.commentId === currentCommentId
      )?.reaction,
  ],
  (currentUser) => currentUser
)

export const { likeComment, dislikeComment } = currentUserSlice.actions

export const CurrentUserSliceReducer = currentUserSlice.reducer
