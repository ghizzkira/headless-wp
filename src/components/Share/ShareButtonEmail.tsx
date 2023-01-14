import * as React from "react"
import { FaEnvelope } from "react-icons/fa"

import { ShareButton, ShareButtonProps } from "./ShareButton"

export const ShareButtonEmail = React.forwardRef<
  HTMLDivElement,
  ShareButtonProps
>((props, ref) => {
  const { url, onClick, subject, text, ...rest } = props

  return (
    <ShareButton
      ref={ref}
      additionalClassName="text-blue-300 bg-white lg:bg-blue-300 lg:hover:bg-blue-300 lg:text-white dark:text-gray-100"
      onClick={onClick}
      icon={<FaEnvelope />}
      subject={subject}
      text={text || "Email"}
      fullUrl={`mailto:?subject=${encodeURI(
        subject as string,
      )}&body=${encodeURI(url as string)}`}
      {...rest}
    />
  )
})
