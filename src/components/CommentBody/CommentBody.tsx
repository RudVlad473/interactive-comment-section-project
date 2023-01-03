import React, { FC, MutableRefObject } from "react"

import { IUser } from "../../models/User/IUser"
import Article from "../Article/Article"
import Header from "../Header/Header"

export interface CommentBodyProps {
  user: IUser
  when: string
  article: React.ReactNode
  articleRef: MutableRefObject<HTMLTextAreaElement>
}

const CommentBody: FC<CommentBodyProps> = ({
  user,
  when,
  article,
  articleRef,
}) => {
  return (
    <>
      <Header user={user} when={when} />

      <Article article={article} articleRef={articleRef} />
    </>
  )
}

export default CommentBody
