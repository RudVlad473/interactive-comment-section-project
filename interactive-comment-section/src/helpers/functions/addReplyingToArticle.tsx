import React from "react"

import UserName from "../../components/UserName/UserName"
import colors from "../../stylesheets/abstracts/colors/_colors.module.scss"
import weights from "../../stylesheets/abstracts/fonts/_weights.module.scss"

function addReplyingToArticle(
  replyingTo: string,
  article: React.ReactNode
): React.ReactNode {
  return (
    <>
      <UserName
        userName={`@${replyingTo}, `}
        styles={{
          color: colors["lightBlue"],
          fontWeight: weights["bold"],
        }}
      />
      {article}
    </>
  )
}

export default addReplyingToArticle
