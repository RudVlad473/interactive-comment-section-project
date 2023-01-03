import { ICommentContent } from "../CommentContent/ICommentContent"

export type ReplyingTo = string

export interface IReply extends ICommentContent {
  replyingTo: ReplyingTo
}
