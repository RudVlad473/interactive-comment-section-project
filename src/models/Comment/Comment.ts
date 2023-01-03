import extractReplies from "../../helpers/functions/extractReplies"
import { CommentContent } from "../CommentContent/CommentContent"
import { FetchedComment } from "./../FetchedComment/IFetchedComment"
import { IReply } from "./../Reply/IReply"
import { IComment } from "./IComment"

class Comment extends CommentContent implements IComment {
  replies: IReply[] | undefined

  constructor({ likesCount, article, when, user, replies }: IComment) {
    super({ likesCount, article, when, user })
    this.replies = replies
  }

  static getNullComment(): IComment {
    return new Comment({
      likesCount: 0,
      article: undefined,
      when: "",
      user: { avatarUrl: "", userName: "" },
      replies: undefined,
    } as IComment)
  }

  //TODO: Apply adapter pattern fetched comment => comment
  static extractCommentFromFetchedComment(fetchedComment: FetchedComment) {
    return new Comment({
      likesCount: fetchedComment.score,
      article: fetchedComment.content,
      when: fetchedComment.createdAt,
      user: {
        userName: fetchedComment.user.username,
        avatarUrl: fetchedComment.user.image.png,
      },
      replies: extractReplies(fetchedComment.replies),
    } as IComment)
  }
}

export default Comment
