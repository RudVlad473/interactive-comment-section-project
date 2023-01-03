import { createContext } from "react"

export interface ICommentContext {
    readonly id: number
    readonly userName: string
    isEditable: boolean
    replyingTo?: string
}

// Create a context
export const CommentContext = createContext<ICommentContext>({
    id: 0,
    userName: "",
    isEditable: false,
    replyingTo: "",
})
