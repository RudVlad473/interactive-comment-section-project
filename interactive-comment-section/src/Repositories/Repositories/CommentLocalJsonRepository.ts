import getCommentsFromLocalJson from "../../api/commentsApi"
import extractComments from "../../helpers/functions/extractComments"
import { IComment } from "../../models/Comment/IComment"
import ICommentsRepository from "../IRepositories/ICommentRepository"

class CommentLocalJsonRepository implements ICommentsRepository {
  async get(): Promise<IComment[] | undefined> {
    const comments = await getCommentsFromLocalJson()

    return await extractComments(comments)
  }
  create(comments: Promise<IComment[]>): void {
    throw new Error("Method not implemented.")
  }
  update(commentsToUpdate: Promise<IComment[]>): void {
    throw new Error("Method not implemented.")
  }
  delete(id: number): void {
    throw new Error("Method not implemented.")
  }
}

export default CommentLocalJsonRepository
