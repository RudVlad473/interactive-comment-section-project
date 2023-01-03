import React, { FC } from "react"

import { IComment } from "../../models/Comment/IComment"
import Comment from "../Comment/Comment"
import NoComments from "../NoComments/NoComments"

interface CommentsProps {
  comments: IComment[] | undefined
}

const Comments: FC<CommentsProps> = ({ comments }) => {
  return (
    <>
      {(comments &&
        comments.map((comment) => (
          <Comment key={comment.id} {...comment} />
        ))) || <NoComments />}
    </>
  )
}

export default Comments
