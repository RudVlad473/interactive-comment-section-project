import React, { FC, useCallback, useContext, useEffect, useRef } from "react"

import { CommentContext } from "../../context/CommentContext"
import validateCommentInput, {
  MessageStates,
} from "../../helpers/functions/validateCommentInput"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { IReply } from "../../models/Reply/IReply"
import { reply } from "../CommentsSection/commentsSlice"
import { selectCurrentUserMemo } from "../CommentsSection/currentUserSlice"

//import Reply, { ReplyProps } from "../Reply/Reply"

const PostForm = React.lazy(() => import("../PostForm/PostForm"))

export interface PostReplyProps {
  replyingTo: string
  setPostReply: React.Dispatch<React.SetStateAction<string | null>>
}

const PostReply: FC<PostReplyProps> = ({ replyingTo, setPostReply }) => {
  const { avatarUrl, userName } = useAppSelector(selectCurrentUserMemo)

  const commentInputRef = useRef<HTMLTextAreaElement>(
    null
  ) as React.MutableRefObject<HTMLTextAreaElement>

  const submitButtonRef = useRef<HTMLButtonElement>(
    null
  ) as React.MutableRefObject<HTMLButtonElement>

  const { id: commentId } = useContext(CommentContext)

  const dispatch = useAppDispatch()

  const addReply = useCallback(() => {
    const text = commentInputRef?.current.value
    const validatedInput = validateCommentInput(text)

    switch (validatedInput) {
      case MessageStates.Normal: {
        break
      }
      default: {
        alert(validatedInput)
        return
      }
    }

    const newReply = {
      id: 0,
      user: { avatarUrl, userName },
      when: "today",
      article: text,
      likesCount: 0,
      replyingTo,
    } as IReply

    setPostReply(() => null)

    dispatch(reply({ reply: newReply, commentId }))

    commentInputRef.current.value = ""
  }, [avatarUrl, commentId, dispatch, replyingTo, setPostReply, userName])

  function clickSubmitOnButtonPush(e: KeyboardEvent) {
    e.stopImmediatePropagation()
    if (e.key == "Enter") {
      submitButtonRef?.current?.click()
    }
  }

  useEffect(() => {
    window.addEventListener("keypress", clickSubmitOnButtonPush)

    return () => {
      window.removeEventListener("keypress", clickSubmitOnButtonPush)
    }
  }, [])

  return (
    <React.Suspense>
      <PostForm
        key={replyingTo}
        textAreaRef={commentInputRef}
        onFormSubmit={addReply}
        buttonValue="Reply"
        buttonRef={submitButtonRef}
      />
    </React.Suspense>
  )
}

export default PostReply
