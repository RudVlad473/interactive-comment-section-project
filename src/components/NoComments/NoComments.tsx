import React from "react"

import styles from "./NoComments.module.scss"

const NoComments = () => {
    return (
        <div className={styles["centered-grid"]}>
            <div>No comments were left yet.</div>
            <div>Be first!</div>
        </div>
    )
}

export default NoComments
