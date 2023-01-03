import React, { forwardRef, useEffect } from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"

import { useAppSelector } from "../../hooks/hooks"
import CommentInput from "../CommentInput/CommentInput"
import { selectCurrentUserMemo } from "../CommentsSection/currentUserSlice"
import Button from "../UI/Button/Button"
import styles from "./PostForm.module.scss"

export interface PostFormProps {
  formId?: string

  buttonValue: string
  buttonRef?: React.MutableRefObject<HTMLButtonElement>

  textAreaValue?: string
  textAreaRef?: React.MutableRefObject<HTMLTextAreaElement>

  onFormSubmit(): void
}

const PostForm = forwardRef(
  ({
    formId,

    buttonValue,
    buttonRef,

    textAreaValue,
    textAreaRef,

    onFormSubmit,
  }: PostFormProps) => {
    useEffect(() => {
      textAreaRef?.current?.focus()
    }, [textAreaRef])

    const { avatarUrl } = useAppSelector(selectCurrentUserMemo)

    return (
      <form
        id={formId}
        className={styles["post-form"]}
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          onFormSubmit()
        }}>
        <LazyLoadImage src={avatarUrl} alt="You" style={{ minWidth: "2rem" }} />
        <CommentInput
          textAreaRef={
            textAreaRef as React.MutableRefObject<HTMLTextAreaElement>
          }>
          {textAreaValue || ""}
        </CommentInput>
        <Button
          buttonRef={buttonRef as React.MutableRefObject<HTMLButtonElement>}
          buttonValue={buttonValue}
        />
      </form>
    )
  }
)

PostForm.displayName = "PostForm"

export default PostForm
