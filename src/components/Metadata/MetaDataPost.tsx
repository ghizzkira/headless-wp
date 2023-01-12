import { forwardRef, HTMLAttributes } from "react"
import NextLink from "next/link"
import NextImage from "next/image"
import { WpAuthorsProps } from "@/data/wp-types"
import { wpAuthorPathBySlug } from "@/lib/wp-users"

interface MetadataPostProps extends HTMLAttributes<HTMLDivElement> {
  author: WpAuthorsProps
  date: string
}

export const MetadataPost = forwardRef<HTMLDivElement, MetadataPostProps>(
  function MetadataPost({ author, date, ...props }, ref) {
    return (
      <div className="flex-column flex" {...props} ref={ref}>
        <div className="my-2 flex flex-row items-center gap-2">
          {author && (
            <>
              <div className="flex flex-row items-center">
                {author.avatar && (
                  <NextImage
                    width="40"
                    height="40"
                    src={author.avatar.url}
                    alt={author.name}
                    className="rounded-full object-cover"
                  />
                )}
                <NextLink href={wpAuthorPathBySlug(author.slug)}>
                  <h4 className="ml-2 text-base font-bold text-[#E15F41]">
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
    )
  },
)
