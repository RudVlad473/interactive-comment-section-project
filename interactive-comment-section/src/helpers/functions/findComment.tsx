import { CommentId, IComment } from "../../models/Comment/IComment"
import { ICommentContent } from "../../models/CommentContent/ICommentContent"

function findComment(
  commentId: CommentId,
  comments: IComment[]
): ICommentContent | undefined {
  let foundComment: ICommentContent | undefined = comments.find(
    (comment) => comment.id === commentId
  )

  if (!foundComment) {
    for (const comment of comments) {
      foundComment = comment.replies.find((reply) => reply.id === commentId)

      if (foundComment) {
        break
      }
    }
  }

  return foundComment
}

export default findComment
