import * as React from "react"

import {
  ShareButtonFacebook,
  ShareButtonTwitter,
  ShareButtonWhatsApp,
  ShareButtonReddit,
} from "."

interface ShareButtonArticleProps extends React.HTMLAttributes<HTMLDivElement> {
  url: string
  text?: string | null
  media?: string | null
}

export const ShareButtonArticle = React.forwardRef<
  HTMLDivElement,
  ShareButtonArticleProps
>((props, ref) => {
  const { url, text, ...rest } = props
  return (
    <div
      ref={ref}
      className="lg:justify-unset flex w-full flex-row justify-evenly py-2 sm:w-1/2 lg:mt-2 lg:w-auto lg:flex-col lg:py-0 "
      {...rest}
    >
      <ShareButtonFacebook url={url} />
      <ShareButtonTwitter url={url} shareText={text} />
      <ShareButtonReddit url={url} shareText={text} />
      <ShareButtonWhatsApp message={text} url={url} />
    </div>
  )
})
