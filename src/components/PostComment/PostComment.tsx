import React, {
  FC,
  MutableRefObject, useEffect,
  useRef
} from "react"
import { useDispatch } from "react-redux"

import validateCommentInput, {
  MessageStates
} from "../../helpers/functions/validateCommentInput"
import { useAppSelector } from "../../hooks/hooks"
import { IComment } from "../../models/Comment/IComment"
import { append } from "../CommentsSection/commentsSlice"
import { selectCurrentUserMemo } from "../CommentsSection/currentUserSlice"
import PostForm from "../PostForm/PostForm"

interface PostCommentProps {}

const PostComment: FC<PostCommentProps> = () => {
  const { avatarUrl, userName } = useAppSelector(selectCurrentUserMemo)

  const commentInputRef = useRef<HTMLTextAreaElement>(
    null
  ) as MutableRefObject<HTMLTextAreaElement>
  const submitButtonRef = useRef<HTMLButtonElement>(
    null
  ) as MutableRefObject<HTMLButtonElement>

  const dispatch = useDispatch()

  function addComment() {
    const text = commentInputRef.current.value
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

    dispatch(
      append([
        {
          id: 0,
          likesCount: 0,
          user: { userName, avatarUrl },
          when: "today",
          article: commentInputRef.current.value,
          replies: [],
        } as IComment,
      ])
    )

    commentInputRef.current.value = ""
  }

  useEffect(() => {
    window.addEventListener("keypress", (e: KeyboardEvent) => {
      e.stopImmediatePropagation()
      if (e.key == "Enter") {
        submitButtonRef.current.click()
      }
    })
  }, [])

  return (
    <React.Suspense>
      <PostForm
        textAreaRef={commentInputRef}
        onFormSubmit={addComment}
        buttonValue="SEND"
        buttonRef={submitButtonRef}
      />
    </React.Suspense>
  )
}

export default PostComment
