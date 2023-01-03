import React, { FC } from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"

import IAction from "../../models/Action/ActionTypes"
import styles from "./Action.module.scss"

const Action: FC<IAction> = ({ iconUrl, actionName, color }) => {
    return (
        <div data-type={actionName} className={styles["action"]}>
            <LazyLoadImage src={iconUrl} style={{ maxWidth: "1rem" }} />
            <span style={{ color }}>{actionName}</span>
        </div>
    )
}

export default Action
