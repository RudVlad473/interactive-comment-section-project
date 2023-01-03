import { CommentId } from "../Comment/IComment"
import { IUser } from "../User/IUser"

export interface ICommentContent {
  id: CommentId
  likesCount: number
  article: React.ReactNode
  when: string
  user: IUser
}
