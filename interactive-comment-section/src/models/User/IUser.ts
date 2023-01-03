import { ReactedComment } from "../Comment/IComment"

export type UserName = string

export interface IUser {
  avatarUrl: string
  userName: UserName
}

export interface ICurrentUser extends IUser {
  reactedComments: ReactedComment[]
}
