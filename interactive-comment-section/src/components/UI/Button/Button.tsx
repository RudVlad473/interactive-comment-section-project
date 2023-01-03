import React, { forwardRef } from "react"

type ButtonColors = "gray" | "red" | "default"
export interface ButtonProps {
    buttonRef?: React.MutableRefObject<HTMLButtonElement>
    buttonValue: string
    props?: React.HTMLProps<HTMLButtonElement>
    buttonColor?: ButtonColors
    isFixedSize?: boolean
}

const Button = forwardRef(
    ({
        buttonValue,
        buttonRef,
        buttonColor = "default",
        isFixedSize = true,
        ...props
    }: ButtonProps) => {
        return (
            <button
                ref={buttonRef}
                className={`button button--${buttonColor} ${
                    !isFixedSize && "button--unfixed"
                }`}
                {...props}>
                {buttonValue}
            </button>
        )
    }
)

Button.displayName = "Button"

export default Button
