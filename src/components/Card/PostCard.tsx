import * as React from "react"
import NextLink from "next/link"
import NextImage from "next/image"

interface PostCardProps {
  title: string
  slug: string
  excerpt: string
  image: {
    sourceUrl: string
    altText: string
  }
}

export const PostCard = React.forwardRef<HTMLDivElement, PostCardProps>(
  (props) => {
    const { image, slug, excerpt, title } = props
    return (
      <article className="flex flex-col rounded-lg drop-shadow-md mb-2 border-separate">
        <div className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 max-w-xs md:max-w-3xl mx-auto min-h-[185px] h-[185px]">
          <div className="w-full md:w-1/3 grid place-items-stretch">
            <NextImage
              priority={true}
              height={250}
              width={350}
              className="post-card-thumbnail h-full rounded-lg"
              src={image.sourceUrl}
              alt={image.altText}
            />
          </div>
          <div className="w-full md:w-2/3 flex flex-col space-y-2">
            <NextLink href={slug}>
              <h3 className="text-gray-800 md:text-xl text-lg">{title}</h3>
              <div
                className="md:text-lg text-gray-500 text-base line-clamp-2"
                dangerouslySetInnerHTML={{ __html: excerpt }}
              />
            </NextLink>
          </div>
        </div>
      </article>
    )
  },
)
