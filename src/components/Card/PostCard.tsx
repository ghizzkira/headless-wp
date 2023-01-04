import { Picture } from "@/components/Picture"
import NextLink from "next/link"

export const PostCard = ({ image, slug, excerpt, title }) => {
  return (
    <article class="flex flex-col rounded-lg drop-shadow-md mb-2 border-separate">
      <div class="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 max-w-xs md:max-w-3xl mx-auto min-h-[185px] h-[185px]">
        <div class="w-full md:w-1/3 grid place-items-stretch">
          <Picture
            priority={true}
            objectFit="cover"
            layout="intrinsic"
            height={250}
            width={350}
            className="post-card-thumbnail h-full rounded-l-lg"
            src={image.sourceUrl}
            alt={image.altText}
          />
        </div>
        <div class="w-full md:w-2/3 flex flex-col space-y-2">
          <NextLink href={slug}>
            <h3 class="font-black text-gray-800 md:text-xl text-lg">{title}</h3>
            <div
              class="md:text-lg text-gray-500 text-base line-clamp-2"
              dangerouslySetInnerHTML={{ __html: excerpt }}
            />
          </NextLink>
        </div>
      </div>
    </article>
  )
}
