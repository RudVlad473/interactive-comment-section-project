import React, { forwardRef, useEffect } from "react"

interface CommentInputProps {
    textAreaRef?: React.MutableRefObject<HTMLTextAreaElement>
    formId?: string
    name?: string
    children?: React.ReactNode
}

const CommentInput = forwardRef(
    ({ formId, name, textAreaRef, ...props }: CommentInputProps) => {
        useEffect(() => {
            textAreaRef?.current?.scrollIntoView({
                block: "center",
                inline: "center",
            })
        }, [textAreaRef])

        return (
            <textarea
                ref={textAreaRef}
                // disabled={!isEditable}
                className="comment-area"
                placeholder={"Add a comment..."}
                form={formId}
                name={name}
                spellCheck="false">
                {props.children}
            </textarea>
        )
    }
)

CommentInput.displayName = "CommentInput"

export default CommentInput
