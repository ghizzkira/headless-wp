import * as React from "react"
import NextLink from "next/link"
import NextImage from "next/image"
import { Heading } from "@/ui"
import { formatDate } from "@/utils/datetime"
import { MdAccessTime } from "react-icons/md"

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
              <Heading as="h3">{title}</Heading>
              <div
                className="hidden md:my-3 md:inline-flex md:text-lg text-gray-500 dark:text-gray-300 text-base md:!line-clamp-2"
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
                        <Heading bold as="h4" className="ml-2 text-[12px] ">
                          {authorName}
                        </Heading>
                      </NextLink>
                    </div>
                  </>
                )}
                <MdAccessTime className="h-3 w-3 ml-2 text-gray-700 dark:text-gray-200" />
                {date && (
                  <time
                    className="pl-0.5 text-xs text-gray-700 dark:text-gray-200"
                    dateTime={date}
                  >
                    {formatDate(date)}
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
