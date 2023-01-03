import { FetchedCurrentUser } from "./../../models/FetchedComment/IFetchedComment"
import { ICurrentUser } from "./../../models/User/IUser"
import getUserAvatar from "./getUserAvatar"

async function extractCurrentUser(
  currentUserData: FetchedCurrentUser
): Promise<ICurrentUser> {
  const currentUser: ICurrentUser = {
    avatarUrl: getUserAvatar(currentUserData.username),
    userName: currentUserData.username,
    reactedComments: currentUserData.reactedComments,
  }

  return currentUser
}

export default extractCurrentUser
