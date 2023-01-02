import * as React from "react"
import Image, { ImageProps } from "next/image"
import { tx } from "@twind/core"

const convertImage = (h: number, w: number) => `
  <svg height="${h}" width="${w}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#333" offset="20%" />
        <stop stop-color="#222" offset="50%" />
        <stop stop-color="#333" offset="70%" />
      </linearGradient>
    </defs>
    <rect height="${h}" width="${w}" fill="#333" />
    <rect id="r" height="${h}" width="${w}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
  </svg>`

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str)

export interface NextImageProps extends ImageProps {}

export const NextImage: React.FunctionComponent<NextImageProps> = (props) => {
  const {
    alt,
    src,
    width,
    height,
    placeholder = "blur",
    className,
    ...rest
  } = props

  if (placeholder === "blur") {
    return (
      <Image
        src={src}
        alt={alt}
        height={height}
        width={width}
        className={tx(className)}
        placeholder={placeholder}
        blurDataURL={`data:image/svg+xml;base64,${toBase64(
          //@ts-ignore
          convertImage(height, width),
        )}`}
        {...rest}
      />
    )
  } else {
    return (
      <Image
        src={src}
        alt={alt}
        placeholder={placeholder}
        className={tx(className)}
        {...rest}
      />
    )
  }
}
