import { FetchedComment } from "../../models/FetchedComment/IFetchedComment"
import { IComment } from "./../../models/Comment/IComment"
import extractReplies from "./extractReplies"
import getUserAvatar from "./getUserAvatar"

async function extractComments(
  comments: FetchedComment[]
): Promise<IComment[] | undefined> {
  if (Object.keys(comments).length === 0) {
    return undefined
  }

  //const currentUser = await extractCurrentUser(commentsData)

  const extractedComments: IComment[] = comments.map(
    (comment: FetchedComment): IComment => ({
      id: comment["id"],
      likesCount: comment["score"],
      user: {
        avatarUrl: getUserAvatar(comment.user.username),
        userName: comment["user"]["username"],
      },
      when: comment["createdAt"],
      article: comment["content"],
      replies: extractReplies(comment.replies),
    })
  )

  return extractedComments
}

export default extractComments
