import * as React from "react"
import Link, { LinkProps } from "next/link"
import { tx } from "@twind/core"

export interface NextLinkProps extends LinkProps {
  classsName?: string
  disabled?: boolean
  external?: boolean
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
  colorScheme?: string
  children?: React.ReactNode
  variant?: "styled" | "unstyled"
}

// FIX: this with use the right interface / type
// FIX: style not applied
export const NextLink = React.forwardRef<unknown, any>((props, ref) => {
  const {
    disabled,
    external,
    onClick,
    colorScheme = "gray",
    className,
    children,
    href,
    variant = "unstyled",
    ...rest
  } = props

  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : null

  const classes = tx(
    `text-${colorScheme}-500 dark:text-${colorScheme}-400 focus:ring-${colorScheme}-500 cursor-pointer cursor-pointer no-underline outline-none hover:underline focus:ring-2`,
    disabled &&
      "disabled:cursor-not-allowed disabled:no-underline disabled:opacity-60",
    className,
  )

  const unstyledClasses = tx(className)

  return (
    <Link
      href={href}
      ref={ref}
      tabIndex={disabled ? -1 : undefined}
      data-color={variant === "styled" && colorScheme ? colorScheme : undefined}
      aria-disabled={disabled}
      onClick={disabled ? (event: any) => event.preventDefault() : onClick}
      className={variant === "styled" ? classes : unstyledClasses}
      {...externalProps}
      {...rest}
    >
      {children}
    </Link>
  )
})
