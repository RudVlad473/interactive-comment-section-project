import React, { FC, useContext, useState } from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { useDispatch } from "react-redux"

import { CommentContext } from "../../context/CommentContext"
import { useAppSelector } from "../../hooks/hooks"
import {
  dislikeComment,
  likeComment,
  selectCurrentReaction,
} from "../CommentsSection/currentUserSlice"
import styles from "./LikeSection.module.scss"

const LikeSection: FC<{ likesCount: number }> = ({ likesCount }) => {
  const { id: currentCommentId } = useContext(CommentContext)

  const dispatch = useDispatch()

  const currentReaction = useAppSelector((state) =>
    selectCurrentReaction(state, currentCommentId)
  )

  const [score, setScore] = useState(likesCount)

  const maxLikesNumLength = 2

  return (
    <div className={styles["like-section"]}>
      <figure
        className={styles["like"]}
        onClick={() => {
          dispatch(likeComment(currentCommentId))
          setScore((score) =>
            currentReaction === undefined
              ? score + 1
              : currentReaction === "+"
              ? score - 1
              : score + 1
          )
        }}>
        <LazyLoadImage src={require("../../images/icon-plus.svg")} alt="+" />
      </figure>

      <div
        className={`${styles["like-section__score"]} ${
          currentReaction &&
          (currentReaction === "-"
            ? styles["like-section__score--disliked"]
            : styles["like-section__score--liked"])
        } `}>
        {score.toString().length > maxLikesNumLength ? "99+" : score}
      </div>

      <figure
        className={styles["dislike"]}
        onClick={() => {
          dispatch(dislikeComment(currentCommentId))
          setScore((score) =>
            currentReaction === undefined
              ? score - 1
              : currentReaction === "-"
              ? score + 1
              : score - 1
          )
        }}>
        <LazyLoadImage src={require("../../images/icon-minus.svg")} alt="-" />
      </figure>
    </div>
  )
}

export default LikeSection
