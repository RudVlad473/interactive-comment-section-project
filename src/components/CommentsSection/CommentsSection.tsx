import React, { FC, useEffect } from "react"

import { FetchStatus } from "../../api/commentsApi"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import Comments from "../Comments/Comments"
import styles from "./CommentsSection.module.scss"
import {
  fetchComments, getCommentsStatus,
  selectAllCommentsMemo
} from "./commentsSlice"

const PostComment = React.lazy(() => import("../PostComment/PostComment"))

interface CommentSectionProps {}

const CommentsSection: FC<CommentSectionProps> = () => {
  const comments = useAppSelector(selectAllCommentsMemo)
  const commentsStatus = useAppSelector(getCommentsStatus)
  //const commentsError = useAppSelector(getCommentsError)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (commentsStatus === FetchStatus.IDLE) {
      dispatch(fetchComments())
    }
  }, [dispatch, commentsStatus])

  return (
    <section
      aria-label="comments"
      className={styles["comments-section"]}
      style={{ marginBlock: "2rem" }}>
      <Comments comments={comments} />
      <React.Suspense>
        <PostComment />
      </React.Suspense>
    </section>
  )
}

export default CommentsSection
