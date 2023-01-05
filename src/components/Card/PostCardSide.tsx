import NextImage from "next/image"
import NextLink from "next/link"

export const PostCardSide = (props) => {
  const { image, slug, title } = props
  return (
    <article class="flex w-full flex-col rounded-lg drop-shadow-md mb-4 border-separate">
      <div class="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 max-w-xs md:max-w-3xl min-h-[80px] h-[80px]">
        <div class="w-[75px] h-[75px] grid place-items-stretch">
          <NextImage
            height={75}
            width={75}
            className="post-card-thumbnail h-full rounded-lg"
            src={image.sourceUrl}
            alt={image.altText}
          />
        </div>
        <div class="w-full md:w-2/3 flex flex-col space-y-2">
          <NextLink href={slug}>
            <h3 class="font-black text-gray-800 text-lg leading-5 line-clamp-3">
              {title}
            </h3>
          </NextLink>
        </div>
      </div>
    </article>
  )
}
