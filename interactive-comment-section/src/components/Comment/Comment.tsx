import React, { FC, useEffect } from "react"

import { IComment } from "../../models/Comment/IComment"
import { IReply } from "../../models/Reply/IReply"
import CommentContent from "../CommentContent/CommentContent"
import NoComments from "../NoComments/NoComments"
import repliesStyles from "../Replies/Replies.module.scss"

export interface CommentProps extends IComment {}

export type ReplyActions = "REPLY"
export interface ReplyAction {
  type: ReplyActions
  payload: IReply[] | undefined
}

const Comment: FC<CommentProps> = (comment) => {
  return (
    <>
      <CommentContent comment={comment} />
      <React.Suspense fallback={<NoComments />}>
        {comment.replies?.length ? (
          <section
            className={repliesStyles["replies-section"]}
            aria-label="replies">
            <div
              className={
                repliesStyles["replies-section__left-separator"]
              }></div>

            <div className={repliesStyles["replies"]}>
              {comment.replies?.map((reply) => (
                <CommentContent key={reply.id} comment={reply} />
              ))}
            </div>
          </section>
        ) : undefined}
      </React.Suspense>
    </>
  )
}

export default Comment
