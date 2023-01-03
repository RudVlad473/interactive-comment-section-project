import SequentialIdGenerator from "../../helpers/functions/idGenerator"
import { IUser } from "../User/IUser"
import { CommentId } from "./../Comment/IComment"
import { ICommentContent } from "./ICommentContent"

export class CommentContent implements ICommentContent {
  id: CommentId
  likesCount: number
  article: React.ReactNode
  when: string
  user: IUser

  constructor({
    likesCount = 0,
    article = "",
    when = "",
    user = { avatarUrl: "", userName: "" },
  }) {
    this.id = SequentialIdGenerator.getId()
    this.likesCount = likesCount
    this.article = article
    this.when = when
    this.user = user
  }

  static assignSequentialIds<T extends ICommentContent>(arr: T[]) {
    for (const obj of arr) {
      obj.id = SequentialIdGenerator.getId()
    }
    return arr
  }
}
