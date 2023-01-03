import React, {
  FC,
  MutableRefObject,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react"
import { useDispatch } from "react-redux"

import { CommentContext } from "../../context/CommentContext"
import { EditableContext } from "../../context/EditableContext"
import addReplyingToArticle from "../../helpers/functions/addReplyingToArticle"
import validateCommentInput, {
  MessageStates,
} from "../../helpers/functions/validateCommentInput"
import { ActionTypes } from "../../models/Action/ActionTypes"
import { CommentId } from "../../models/Comment/IComment"
import { ICommentContent } from "../../models/CommentContent/ICommentContent"
import { ReplyingTo } from "../../models/Reply/IReply"
import { UserName } from "../../models/User/IUser"
import CommentBody from "../CommentBody/CommentBody"
import { edit, remove } from "../CommentsSection/commentsSlice"
import LikeSection from "../LikeSection/LikeSection"
import Modal, { ModalProps } from "../Modal/Modal"
import PostReply from "../PostReply/PostReply"
import Button from "../UI/Button/Button"

export interface CommentContentProps {
  comment: ICommentContent
}

interface ActionType {
  commentId: CommentId
  replyingTo: ReplyingTo
}

interface Action {
  type: ActionTypes
  payload: ActionType | undefined
}

const CommentContent: FC<CommentContentProps> = ({ comment }) => {

  const [isEditable, setIsEditable] = useState<boolean>(false)
  const [article, setArticle] = useState<string | null>(null)
  const [deleteModal, setDeleteModal] = useState<ModalProps | null>(null)
  const [postReply, setPostReply] = useState<UserName | null>(null)

  const submitButtonRef = useRef<HTMLButtonElement>(
    null
  ) as MutableRefObject<HTMLButtonElement>
  const editableTextAreaRef = useRef<HTMLTextAreaElement>(
    null
  ) as MutableRefObject<HTMLTextAreaElement>

  const dispatch = useDispatch()

  useEffect(() => {

    setArticle(() => editableTextAreaRef?.current?.textContent)
  }, [editableTextAreaRef])

  const [, dispatchActions] = useReducer(actionsReducer, {
    commentId: 0,
    replyingTo: "",
  })

  function actionsReducer(state: ActionType, action: Action): ActionType {
    try {
      switch (action.type) {
        case ActionTypes.REPLY: {
          setPostReply(() => action.payload?.replyingTo || null)

          break
        }
        case ActionTypes.EDIT: {
          setIsEditable((isCurrentlyEditable) => !isCurrentlyEditable)

          break
        }
        case ActionTypes.DELETE: {
          const commentId = action.payload?.commentId as number

          deleteModal
            ? setDeleteModal(null)
            : setDeleteModal({
                onSubmit: () => {
                  dispatch(remove([commentId]))
                  setDeleteModal(null)
                },
                onSubmitButton: { buttonValue: "YES, DELETE" },

                onDecline: () => {
                  setDeleteModal(null)
                },
                onDeclineButton: { buttonValue: "NO, CANCEL" },

                header: "Delete comment",
                descr:
                  "Are you sure you want to delete this comment? This will remove the comment and can't be undone.",
              })
        }
      }
    } catch {
      console.log(
        "Probably, state of actionReducer was expected to be something else"
      )
    }
    return state
  }

  function handleCommentUpdate(e: React.FormEvent) {
    e.preventDefault()

    const articleBeforeEdit = article
    const articleAfterEdit = editableTextAreaRef?.current

    if (!articleAfterEdit) {
      return
    }

    const validatedInput = validateCommentInput(
      articleAfterEdit.textContent as string
    )

    switch (validatedInput) {
      case MessageStates.Normal: {
        dispatch(edit({ ...comment, article: articleAfterEdit.textContent }))
        break
      }
      default: {
        alert(validatedInput)
        articleAfterEdit.textContent = articleBeforeEdit

        break
      }
    }
    setIsEditable(() => false)
  }

  return (
    <CommentContext.Provider
      value={{
        id: comment.id,
        userName: comment.user.userName,
        isEditable,
      }}>
      <form
        id={`${comment.id}`}
        data-name={comment.user.userName}
        className="comment"
        onClick={(e) => {
          const actionType = (e.target as HTMLDivElement).dataset["type"] as
            | ActionTypes
            | undefined

          if (!actionType) {
            return
          }

          const replyingTo = e.currentTarget.dataset["name"]
          //const commentId = parseInt(e.currentTarget.id)
          const commentId = comment.id

          if (!replyingTo || !commentId) {
            throw new Error(
              "It seems like comment doesn't have required information. Try to reload the page."
            )
          }
          const toDispatch = {
            type: actionType,
            payload: { commentId, replyingTo },
          }
          //console.log(toDispatch)
          dispatchActions(toDispatch)
        }}
        onSubmit={handleCommentUpdate}>
        <div className="comment__content">
          <LikeSection likesCount={comment.likesCount} />

          <EditableContext.Provider value={isEditable}>
            <CommentBody {...comment} articleRef={editableTextAreaRef} />
          </EditableContext.Provider>
        </div>

        {isEditable && (
          <Button buttonRef={submitButtonRef} buttonValue="Update" />
        )}
        {deleteModal && <Modal {...deleteModal} />}
      </form>
      {postReply && (
        <PostReply replyingTo={postReply} setPostReply={setPostReply} />
      )}
    </CommentContext.Provider>
  )
}

export default CommentContent
