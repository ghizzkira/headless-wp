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
      <article className="flex flex-row lg:flex-col rounded-lg drop-shadow-md mb-[30px] border-separate">
        <div className="relative flex flex-row lg:flex-col md:space-x-5 space-y-3 md:space-y-0 max-w-xs md:max-w-3xl mx-auto">
          <div className="w-[125px] h-[90px] md:w-1/3 grid place-items-stretch">
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
            <NextLink href={slug}>
              <h3 className="text-gray-800 md:text-xl text-lg">{title}</h3>
              <div
                className="hidden lg:block md:text-lg text-gray-500 text-base line-clamp-2"
                dangerouslySetInnerHTML={{ __html: excerpt }}
              />
            </NextLink>
            <div className="flex-column flex">
              <div className="my-2 flex flex-row items-center gap-2">
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
                        <h4 className="ml-2 text-base font-bold text-black">
                          {authorName}
                        </h4>
                      </NextLink>
                    </div>
                  </>
                )}
                {/* <span className="text-sm">&bull;</span> */}
                {/* {date && (
                  <time
                    className="pl-0.5 text-sm text-gray-700 dark:text-gray-200"
                    dateTime={date}
                  >
                    {date}
                  </time>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </article>
    )
  },
)
