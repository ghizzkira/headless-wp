import { FunctionComponent } from "react"
import NextImage, { ImageProps } from "next/image"

export const Picture: FunctionComponent<ImageProps> = ({
  src,
  alt,
  layout = "fill",
  placeholder = "blur",
  ...props
}) => {
  const convertImage = (w: number, h: number) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#333" offset="20%" />
        <stop stop-color="#222" offset="50%" />
        <stop stop-color="#333" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#333" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
  </svg>`

  const toBase64 = (str: string) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str)

  if (placeholder === "blur") {
    return (
      <NextImage
        src={src}
        alt={alt}
        layout={layout}
        placeholder={placeholder}
        blurDataURL={`data:image/svg+xml;base64,${toBase64(
          convertImage(700, 475),
        )}`}
        {...props}
      />
    )
  } else {
    return (
      <NextImage
        src={src}
        alt={alt}
        layout={layout}
        placeholder={placeholder}
        {...props}
      />
    )
  }
}
