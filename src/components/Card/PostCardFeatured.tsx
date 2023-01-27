import * as React from "react"
import NextLink from "next/link"
import { WpPostsProps } from "@/data/wp-types"
import NextImage from "next/image"

export interface PostCardFeaturedProps
  extends WpPostsProps,
    React.HTMLAttributes<HTMLDivElement> {
  index?: number
}

export const PostCardFeatured = React.forwardRef<
  HTMLDivElement,
  PostCardFeaturedProps
>(function PostCardFeatured({ post, ...props }, ref) {
  const { title, featuredImage, uri } = post

  return (
    <>
      <article
        className="post-card-thumbnail whitspace-normal relative h-full rounded-xl overflow-hidden"
        {...props}
        ref={ref}
      >
        <div className="h-full">
          <NextLink
            className="after:absolute after:top-0 after:left-0 after:h-full after:w-full after:rounded-xl after:bg-gradient-to-t after:from-[#282828] after:to-transparent after:transition-all"
            href={uri}
          >
            <div className="relative box-border overflow-hidden ">
              <NextImage
                priority={true}
                height={500}
                width={600}
                className="!w-auto rounded-md aspect-[9/16] object-cover !h-[200px] min-h-[200px] md:!h-[350px] hover:scale-150 transition-all"
                src={featuredImage.sourceUrl}
                alt={featuredImage.altText}
              />
            </div>
          </NextLink>
        </div>
        <div className="featured-meta absolute bottom-0 left-0 z-10 w-full px-3 py-4 md:py-5 md:px-4">
          <NextLink href={uri}>
            <h3
              className={`font-sans text-base font-bold md:text-lg text-white line-clamp-3 hover:text-primary-400 dark:text-gray-100`}
            >
              {title}
            </h3>
          </NextLink>
        </div>
      </article>
    </>
  )
})

export const ListPostFeatured = (props: { featured: any }) => {
  const { featured } = props
  return (
    <div className="mx-auto w-full max-w-full">
      <div className="mb-4 block h-auto min-w-full overflow-x-auto overflow-y-hidden whitespace-nowrap px-3 scrollbar">
        {featured.map((featuredItem: any, i: number) => {
          return (
            <div
              className={`featured-image mr-2 inline-block whitespace-normal pr-1`}
              key={featuredItem.slug}
            >
              <PostCardFeatured index={i} post={featuredItem} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
