import React, { memo } from "react"

import {
  AuthorActions as authorActions,
  UserActions as userActions,
} from "../../models/Action/ActionTypes"
import Action from "../Action/Action"
import styles from "./Actions.module.scss"

interface ActionsProps {
  isCurrentUser: boolean
}

const Actions = memo(({ isCurrentUser }: ActionsProps) => {
  return (
    <div className={styles["actions"]}>
      {(isCurrentUser ? authorActions : userActions).map((action) => (
        <Action key={action.actionName} {...action} />
      ))}
    </div>
  )
})

Actions.displayName = "Actions"

export default Actions
