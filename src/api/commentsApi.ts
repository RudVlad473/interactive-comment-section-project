import commentsData from "../data/comments.json"
import { FetchedComment } from "../models/FetchedComment/IFetchedComment"

export enum FetchStatus {
  IDLE = "idle",
  LOADING = "loading",
  SUCCEDED = "succeded",
  FAILED = "failed",
}

async function getCommentsFromLocalJson(): Promise<FetchedComment[]> {
  return commentsData.comments
}

export default getCommentsFromLocalJson
