import * as React from "react"
import { FaRedditAlien } from "react-icons/fa"

import { ShareButton, ShareButtonProps } from "./ShareButton"

export const ShareButtonReddit = React.forwardRef<
  HTMLDivElement,
  ShareButtonProps
>((props, ref) => {
  const { url, onClick, text, ...rest } = props

  return (
    <ShareButton
      additionalClassName="text-[#ff4500] bg-white lg:bg-[#ff4500] lg:hover:bg-[#ff4500] lg:text-white dark:text-gray-100 dark:bg-[#374151]"
      onClick={onClick}
      icon={<FaRedditAlien />}
      text={text || "Reddit"}
      fullUrl={`https://reddit.com/submit/?url=${encodeURI(url as string)}`}
      ref={ref}
      {...rest}
    />
  )
})
