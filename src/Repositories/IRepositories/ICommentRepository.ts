import { CommentId , IComment } from "../../models/Comment/IComment"


interface ICommentsRepository {
  get(): Promise<IComment[] | undefined>
  create(comments: Promise<IComment[]>): void
  update(commentsToUpdate: Promise<IComment[]>): void
  delete(id: CommentId): void
}

export default ICommentsRepository
