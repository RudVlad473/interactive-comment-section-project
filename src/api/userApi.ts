import commentsData from "../data/comments.json"
import { FetchedCurrentUser } from "../models/FetchedComment/IFetchedComment"

async function getCurrentUserFromLocalJson(): Promise<FetchedCurrentUser> {
  return commentsData.currentUser
}

export default getCurrentUserFromLocalJson
