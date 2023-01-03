import React, { FC } from "react"

import addReplyingToArticle from "../../helpers/functions/addReplyingToArticle"
import { IReply } from "../../models/Reply/IReply"
import CommentBody from "../CommentBody/CommentBody"
import LikeSection from "../LikeSection/LikeSection"

export interface ReplyProps extends IReply {}

const Reply: FC<ReplyProps> = (reply) => {
  return (
    <div id={`${reply.id}`} className="comment">
      <React.Suspense>
        <LikeSection likesCount={reply.likesCount} />
      </React.Suspense>

      <CommentBody
        user={reply.user}
        article={addReplyingToArticle(reply.replyingTo, reply.article)}
        when={reply.when}
      />
    </div>
  )
}

export default Reply
