import { ICommentContent } from "../CommentContent/ICommentContent"
import { IReply } from "./../Reply/IReply"

export interface IComment extends ICommentContent {
  replies: IReply[]
}

export type CommentId = number
export type Reaction = "+" | "-" | undefined

export type ReactedComment = {
  commentId: CommentId
  reaction: Reaction
}
