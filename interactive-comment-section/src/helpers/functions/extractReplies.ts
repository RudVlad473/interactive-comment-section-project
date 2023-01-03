import { FetchedReply } from "../../models/FetchedComment/IFetchedComment"
import { IReply } from "./../../models/Reply/IReply"
import getUserAvatar from "./getUserAvatar"

function extractReplies(
  replies: FetchedReply[] | undefined
): IReply[] | undefined {
  const extractedReplies: IReply[] | undefined = replies?.map(
    ({ id, score, user, createdAt, content, replyingTo }: FetchedReply) =>
      ({
        id,
        likesCount: score,
        user: {
          avatarUrl: getUserAvatar(user.username),
          userName: user["username"],
        },
        when: createdAt,
        article: content,
        replyingTo,
      } as IReply)
  )

  return extractedReplies
}

export default extractReplies
