import React, { FC } from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"

import { IUser } from "../../models/User/IUser"
import UserName from "../UserName/UserName"
//import ContainedImage from "../ContainedImage/ContainedImage"
import styles from "./UserDetails.module.scss"

export interface UserDetailsProps {
  user: IUser
  when: string
}

const UserDetails: FC<UserDetailsProps> = ({ user, when }) => {
  return (
    <div className={styles["user-details"]}>
      <LazyLoadImage src={user.avatarUrl} style={{ maxWidth: "2rem" }} />

      <UserName userName={user.userName} />
      <span className={styles["user-details__when"]} title={when}>
        {when}
      </span>
    </div>
  )
}

export default UserDetails
