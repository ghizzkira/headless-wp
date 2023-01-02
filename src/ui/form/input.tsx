import * as React from "react"
import { tx } from "@twind/core"
import { SizesProps } from "@/ui/type-utils"

import { useFormControl } from "./form-control"

type InputSizes = Exclude<SizesProps, "4xl" | "3xl" | "2xl" | "base">

export interface IInputProps<T = HTMLInputElement> {
  disabled?: React.InputHTMLAttributes<T>["disabled"]
  invalid?: boolean
  required?: React.InputHTMLAttributes<T>["required"]
  readOnly?: React.InputHTMLAttributes<T>["readOnly"]
  colorScheme?: string
  size?: InputSizes
  as?: React.ElementType
  type?: string
  "aria-label"?: string
  "aria-describedby"?: string
}

export type InputOmittedType =
  | "size"
  | "disabled"
  | "required"
  | "checked"
  | "defaultChecked"
  | "readOnly"

type InputHTMLAttributes = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  InputOmittedType
>

export type InputProps<T = HTMLElement> = IInputProps &
  InputHTMLAttributes &
  React.RefAttributes<T>

export const Input = React.forwardRef<HTMLElement, InputProps>((props, ref) => {
  const {
    size = "md",
    colorScheme = "gray",
    as: Comp = "input",
    "aria-label": ariaLabel,
    "aria-describedby": ariaDescribedby,
    className,
    type = "text",
    id,
    ...rest
  } = props

  const { readOnly, disabled, invalid, required, ...formControl } =
    useFormControl(props)

  const sizeClasses = {
    xs: "h-7 text-xs",
    sm: "h-8 text-sm",
    md: "h-9 text-base",
    lg: "h-11 text-lg",
    xl: "h-[3.125rem] text-xl",
  }

  const classes = tx(
    `relative rounded-md w-full min-w-0 inline-flex px-3 items-center appearance-none focus:outline-none transition-colors duration-75 ease-out border border-${colorScheme}-300 text-${colorScheme}-900 bg-${colorScheme}-50 hover:bg-${colorScheme}-50 focus:bg-white invalid:border-1 invalid:border-red-500 invalid:ring-red-600 focus:ring-2 dark:border-${colorScheme}-600 dark:text-white dark:bg-${colorScheme}-200 dark:hover:bg-${colorScheme}-100 dark:focus:bg-${colorScheme}-900 dark:invalid:border-1 dark:invalid:border-red-700 dark:invalid:ring-offset-2 dark:invalid:ring-red-700`,
    sizeClasses[size],
    disabled &&
      `disabled:shadow-none disabled:cursor-not-allowed disabled:opacity-60 disabled:border-${colorScheme}-200 disabled:bg-${colorScheme}-200 dark:disabled:border-transparent dark:disabled:bg-${colorScheme}-200`,
  )

  return (
    <Comp
      ref={ref}
      readOnly={readOnly}
      aria-readonly={readOnly}
      disabled={disabled}
      aria-disabled={disabled}
      aria-label={ariaLabel}
      aria-invalid={invalid}
      required={required}
      aria-required={required}
      aria-describedby={ariaDescribedby}
      data-color={colorScheme ? colorScheme : undefined}
      className={tx(classes, className)}
      type={type}
      id={id || formControl.id}
      {...rest}
    />
  )
})
