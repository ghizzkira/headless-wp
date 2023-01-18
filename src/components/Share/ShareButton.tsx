import * as React from "react"
import NextLink, { LinkProps } from "next/link"

import { IconButton } from "@/ui"

export interface ShareButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  fullUrl?: LinkProps | any
  url?: string | undefined
  variant?: "solid" | "outline" | "ghost"
  onClick?: () => void
  text?: string
  icon?: string | React.ReactElement
  additionalClassName?: string
  subject?: string | null
  message?: string | null
  sharetext?: string | null
  mediaSrc?: string | null
  baseUrl?: string | null
  caption?: string | null
  content?: string | null
  title?: string
}

export const ShareButton = React.forwardRef<HTMLDivElement, ShareButtonProps>(
  (props, ref) => {
    const {
      fullUrl,
      variant,
      onClick,
      text,
      icon,
      additionalClassName,
      ...rest
    } = props
    return (
      <div ref={ref} {...rest}>
        <NextLink
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClick}
          title={text}
          href={fullUrl}
        >
          <IconButton
            variant={variant}
            className={`${additionalClassName} mb-0 h-12 w-12 md:mb-1 !h-10`}
          >
            {icon}
          </IconButton>
        </NextLink>
      </div>
    )
  },
)
