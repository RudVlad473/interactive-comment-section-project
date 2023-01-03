import React, { CSSProperties, FC } from "react"

import classes from "./UserName.module.scss"

export interface UserNameProps {
  userName: string
  styles?: CSSProperties
}

const UserName: FC<UserNameProps> = ({ userName, styles }) => {
  return (
    <span className={classes["username"]} style={styles} title={userName}>
      {userName}
    </span>
  )
}

export default UserName
