import * as React from "react"
import NextLink from "next/link"
import NextImage from "next/image"

interface PostCardProps {
  title: string
  slug: string
  excerpt: string
  src: string
  alt: string
  authorName: string
  authorUri: string
  authorAvatarUrl: string
  date: string
}

export const PostCard = React.forwardRef<HTMLDivElement, PostCardProps>(
  (props) => {
    const {
      src,
      alt,
      slug,
      excerpt,
      title,
      authorName,
      authorUri,
      authorAvatarUrl,
      date,
    } = props
    return (
      <article className="flex flex-row grow lg:flex-col rounded-lg drop-shadow-md mb-[30px] border-separate">
        <div className="relative  flex flex-row">
          <div className="mr-3 w-[125px] min-w-[125px] min-h-[90px] h-[90px] md:w-[220px] md:min-w-[220px] md:min-h-[158px] md:h-[158px]">
            <NextImage
              priority={true}
              height={250}
              width={350}
              className="post-card-thumbnail w-full h-full object-cover aspect-video rounded-lg"
              src={src}
              alt={alt}
            />
          </div>
          <div className="flex flex-col">
            <NextLink href={slug}>
              <h3 className="text-gray-800 md:text-xl text-lg">{title}</h3>
              <div
                className="hidden md:my-3 md:inline-flex md:text-lg text-gray-500 text-base md:!line-clamp-2"
                dangerouslySetInnerHTML={{ __html: excerpt }}
              />
            </NextLink>
            <div className="flex-column flex">
              <div className="flex flex-row items-center ">
                {authorName && (
                  <>
                    <div className="flex flex-row items-center">
                      {authorAvatarUrl && (
                        <NextImage
                          width="20"
                          height="20"
                          src={authorAvatarUrl}
                          alt={authorName}
                          className="rounded-full object-cover"
                        />
                      )}
                      <NextLink href={authorUri}>
                        <h4 className="ml-2 text-[12px] font-bold text-black">
                          {authorName}
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
