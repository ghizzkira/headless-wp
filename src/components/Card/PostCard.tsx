import * as React from "react"
import NextLink from "next/link"
import NextImage from "next/image"

interface PostCardProps {
  title: string
  slug: string
  excerpt: string
  src: string
  alt: string
}

export const PostCard = React.forwardRef<HTMLDivElement, PostCardProps>(
  (props) => {
    const { src, alt, slug, excerpt, title, author, date } = props
    return (
      <article className="flex flex-col rounded-lg drop-shadow-md mb-2 border-separate">
        <div className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 max-w-xs md:max-w-3xl mx-auto min-h-[185px] h-[185px]">
          <div className="w-full md:w-1/3 grid place-items-stretch">
            <NextImage
              priority={true}
              height={250}
              width={350}
              className="post-card-thumbnail h-full rounded-lg"
              src={src}
              alt={alt}
            />
          </div>
          <div className="w-full md:w-2/3 flex flex-col space-y-2">
            <NextLink href={`/${slug}`}>
              <h3 className="text-gray-800 md:text-xl text-lg">{title}</h3>
              <div
                className="md:text-lg text-gray-500 text-base line-clamp-2"
                dangerouslySetInnerHTML={{ __html: excerpt }}
              />
            </NextLink>
            <div className="flex-column flex">
              <div className="my-2 flex flex-row items-center gap-2">
                {author && (
                  <>
                    <div className="flex flex-row items-center">
                      {author.avatar && (
                        <NextImage
                          width="20"
                          height="20"
                          src={author.avatar.url}
                          alt={author.name}
                          className="rounded-full object-cover"
                        />
                      )}
                      <NextLink href={author.uri}>
                        <h4 className="ml-2 text-base font-bold text-black">
                          {author.name}
                        </h4>
                      </NextLink>
                    </div>
                  </>
                )}
                <span className="text-sm">&bull;</span>
                {date && (
                  <time
                    className="pl-0.5 text-sm text-gray-700 dark:text-gray-200"
                    dateTime={date}
                  >
                    {date}
                  </time>
                )}
              </div>
            </div>
          </div>
        </div>
      </article>
    )
  },
)
