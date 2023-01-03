import React from "react"

import styles from "./LoadingComments.module.scss"

const LoadingComments = () => {
    const iconSize = 150

    return (
        <svg
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width={iconSize}
            height={iconSize}
            viewBox="0 0 35 35"
            style={{ enableBackground: "new 0 0 35 35" }}
            className={styles["animated-columns"]}
            xmlSpace="preserve">
            <g>
                <g>
                    <path d="M0,35h35v-6.717H0V35z M2.121,30.404h30.758v2.475H2.121V30.404z" />
                    <path d="M0,0v6.717h35V0H0z M32.879,4.596H2.121V2.121h30.758V4.596z" />
                    <rect y="9.016" width="9.426" height="16.968" />
                    <rect x="12.787" y="9.016" width="9.426" height="16.968" />
                    <rect x="25.574" y="9.016" width="9.426" height="16.968" />
                </g>
            </g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
        </svg>
    )
}

export default LoadingComments
