import React, { useEffect } from "react"

import { FetchStatus } from "./api/commentsApi"
import CommentsSection from "./components/CommentsSection/CommentsSection"
import {
  fetchCurrentUser,
  getCurrentUserError,
  getCurrentUserStatus,
} from "./components/CommentsSection/currentUserSlice"
import { useAppDispatch, useAppSelector } from "./hooks/hooks"

const App = () => {
  const dispatch = useAppDispatch()

  const currentUserStatus = useAppSelector(getCurrentUserStatus)
  const currentUserError = useAppSelector(getCurrentUserError)

  useEffect(() => {
    if (currentUserStatus === FetchStatus.IDLE) {
      dispatch(fetchCurrentUser())
    }
  }, [currentUserStatus, dispatch])

  return <CommentsSection />
}

export default App
