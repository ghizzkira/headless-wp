import * as React from "react"
import NextImage from "next/image"
import NextLink from "next/link"
import { Heading } from "@/ui"

interface PostCardSlideProps {
  title: string
  slug: string
  src: string
  alt: string
}

export const PostCardSide = React.forwardRef<
  HTMLDivElement,
  PostCardSlideProps
>((props, ref) => {
  const { src, alt, slug, title, ...rest } = props
  return (
    <article
      className="flex w-full flex-col rounded-lg drop-shadow-md mb-4 border-separate"
      ref={ref}
      {...rest}
    >
      <div className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 max-w-xs md:max-w-3xl min-h-[80px] h-[80px]">
        <div className="w-[75px] h-[75px] min-w-[75px] min-h-[75px]">
          <NextImage
            priority={true}
            height={75}
            width={75}
            className="post-card-thumbnail w-full h-full object-cover aspect-video rounded-lg"
            src={src}
            alt={alt}
          />
        </div>
        <div className="w-full md:w-2/3 flex flex-col space-y-2">
          <NextLink href={slug}>
            <Heading as="h3" className="!text-sm !leading-5 line-clamp-3">
              {title}
            </Heading>
          </NextLink>
        </div>
      </div>
    </article>
  )
})
