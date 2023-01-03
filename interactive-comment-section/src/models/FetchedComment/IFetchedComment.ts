import { ReactedComment } from "../Comment/IComment"

export interface FetchedImage {
  png: string
  webp: string
}

export interface FetchedUser {
  image: FetchedImage
  username: string
}

export interface FetchedCurrentUser extends FetchedUser {
  reactedComments: ReactedComment[]
}
export interface FetchedComment {
  id: number
  content: string
  createdAt: string
  score: number
  user: FetchedUser
  replies?: FetchedReply[]
}

export interface FetchedReply extends FetchedComment {
  replyingTo: string
}

export interface FetchedData {
  currentUser: FetchedCurrentUser
  comments: FetchedComment[]
}
