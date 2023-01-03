import { configureStore } from "@reduxjs/toolkit"

import { CommentsSliceReducer } from "./../components/CommentsSection/commentsSlice"
import { CurrentUserSliceReducer } from "./../components/CommentsSection/currentUserSlice"

export const store = configureStore({
  reducer: {
    comments: CommentsSliceReducer,
    currentUser: CurrentUserSliceReducer,
  },
  //middleware: (getDefaultMiddleware) =>
  //getDefaultMiddleware({ serializableCheck: false }),
  //(window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
