import { CommentContent } from "../CommentContent/CommentContent"
import { IReply, ReplyingTo } from "./IReply"

export class Reply extends CommentContent implements IReply {
  replyingTo: ReplyingTo

  constructor({
    likesCount = 0,
    article = "",
    when = "",
    user = { avatarUrl: "", userName: "" },
    replyingTo = "",
  }: IReply) {
    super({ likesCount, article, when, user })
    this.replyingTo = replyingTo
  }
}
