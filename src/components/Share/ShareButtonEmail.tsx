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
      additionalClassName="text-primary-300 bg-white lg:bg-primary-300 lg:hover:bg-primary-300 lg:text-white dark:text-gray-100"
      onClick={onClick}
      icon={<FaEnvelope />}
      subject={encodeURI(subject as string)}
      text={text || "Email"}
      fullUrl={`mailto:?subject=${subject}&body=${encodeURI(url as string)}`}
      {...rest}
    />
  )
})
