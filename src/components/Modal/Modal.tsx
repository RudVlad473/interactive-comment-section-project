import React, { FC } from "react"

import Button, { ButtonProps } from "../UI/Button/Button"
import styles from "./Modal.module.scss"

export interface ModalProps {
    onSubmit: () => void
    onSubmitButton: ButtonProps

    onDecline: () => void
    onDeclineButton: ButtonProps

    header: string
    descr: string
}

const Modal: FC<ModalProps> = ({
    onSubmit,
    onSubmitButton,
    onDecline,
    onDeclineButton,
    header,
    descr,
}) => {
    return (
        <>
            <div className={styles["background"]}></div>
            <div className={styles["modal"]}>
                <h1 className={styles["header"]}>{header}</h1>
                <article className="article">{descr}</article>
                <div className={styles["buttons"]}>
                    <Button
                        {...onDeclineButton}
                        isFixedSize={false}
                        buttonColor="gray"
                        buttonValue={onDeclineButton.buttonValue}
                        onClick={onDecline}
                    />
                    <Button
                        {...onSubmitButton}
                        isFixedSize={false}
                        buttonColor="red"
                        buttonValue={onSubmitButton.buttonValue}
                        onClick={onSubmit}
                    />
                </div>
            </div>
        </>
    )
}

export default Modal
