import React, { MutableRefObject, forwardRef, useContext } from "react"

import { EditableContext } from "../../context/EditableContext"
import styles from "./Article.module.scss"

export interface ArticleProps {
  article: React.ReactNode
  articleRef?: MutableRefObject<HTMLTextAreaElement>
}

const Article = forwardRef(({ article, articleRef }: ArticleProps) => {
  const isEditable = useContext(EditableContext)

  return (
    <article
      ref={articleRef}
      spellCheck="false"
      contentEditable={isEditable}
      className={styles["article"]}>
      {article}
    </article>
  )
})

Article.displayName = "Article"

export default Article
