import React, { FC } from "react"

import { useAppSelector } from "../../hooks/hooks"
import Actions from "../Actions/Actions"
import {
  selectIsCurrentUser
} from "../CommentsSection/currentUserSlice"
import UserDetails, { UserDetailsProps } from "../UserDetails/UserDetails"
import styles from "./Header.module.scss"

const Header: FC<UserDetailsProps> = (props) => {
  const isCurrentUser = useAppSelector((state) =>
    selectIsCurrentUser(state, props.user.userName)
  )

  return (
    <>
      <div className={styles["header"]}>
        <UserDetails {...props} />
      </div>
      <Actions isCurrentUser={isCurrentUser} />
    </>
  )
}

export default Header
