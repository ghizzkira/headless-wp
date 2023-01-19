import { forwardRef, HTMLAttributes } from "react"
import NextLink from "next/link"
import NextImage from "next/image"
import { MdAccessTime } from "react-icons/md"
import { Heading } from "@/ui"
import { formatDate } from "@/utils/datetime"
import { wpAuthorPathBySlug } from "@/lib/wp-users"

interface MetadataPostProps extends HTMLAttributes<HTMLDivElement> {
  authorName: string
  authorAvatarUrl: string
  authorSlug: string
  date: string
}

export const MetadataPost = forwardRef<HTMLDivElement, MetadataPostProps>(
  (props, ref) => {
    const { authorName, authorAvatarUrl, authorSlug, date, ...rest } = props
    return (
      <div className="flex-column flex" ref={ref} {...rest}>
        <div className="my-2 flex flex-row items-center gap-2">
          <div className="flex flex-row items-center">
            {authorAvatarUrl && (
              <NextImage
                width="40"
                height="40"
                src={authorAvatarUrl}
                alt={authorName}
                className="rounded-full object-cover"
              />
            )}
            <NextLink href={wpAuthorPathBySlug(authorSlug)}>
              <Heading as="h4" className="ml-2 !text-base">
                {authorName}
              </Heading>
            </NextLink>
          </div>
          {date && (
            <>
              <MdAccessTime className="h-3 w-3 text-gray-700 dark:text-gray-200" />
              <time
                className="ml-[-6px] text-xs text-gray-700 dark:text-gray-200"
                dateTime={date}
              >
                {formatDate(date)}
              </time>
            </>
          )}
        </div>
      </div>
    )
  },
)
