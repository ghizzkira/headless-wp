import * as React from "react"
import { FaTwitter } from "react-icons/fa"

import { ShareButton, ShareButtonProps } from "./ShareButton"

export const ShareButtonTwitter = React.forwardRef<
  HTMLDivElement,
  ShareButtonProps
>((props, ref) => {
  const { url, onClick, text, shareText, ...rest } = props

  return (
    <ShareButton
      additionalClassName="text-[#1DA1F2] bg-white lg:bg-[#1DA1F2] lg:hover:bg-[#1DA1F2] lg:text-white dark:text-gray-100 dark:bg-[#374151]"
      onClick={onClick}
      icon={<FaTwitter />}
      text={text || "Twitter"}
      shareText={shareText}
      fullUrl={`https://twitter.com/intent/tweet/?text=${encodeURI(
        shareText as string,
      )}&url=${encodeURI(url as string)}`}
      ref={ref}
      {...rest}
    />
  )
})
