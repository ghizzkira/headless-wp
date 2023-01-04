import { Picture } from "@/components/Picture"
import NextLink from "next/link"

export const PostCard = ({ image, slug, excerpt, title }) => {
  return (
    <article class="flex flex-col justify-center h-screen">
      <div class="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
        <div class="w-full md:w-1/3 bg-white grid place-items-center">
          <Picture
            priority={true}
            objectFit="cover"
            layout="intrinsic"
            height={250}
            width={350}
            className="post-card-thumbnail h-full"
            src={image.sourceUrl}
            alt={image.altText}
          />
        </div>
        <div class="w-full md:w-2/3 bg-white flex flex-col space-y-2">
          <NextLink href={slug}>
            <h3 class="font-black text-gray-800 md:text-3xl text-xl">
              {title}
            </h3>
            <div
              class="md:text-lg text-gray-500 text-base"
              dangerouslySetInnerHTML={{ __html: excerpt }}
            />
          </NextLink>
        </div>
      </div>
    </article>
  )
}
