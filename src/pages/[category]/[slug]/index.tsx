import { wpGetPostBySlug, wpGetAllPosts } from "@/lib/wp-posts"
import { wpPrimaryCategorySlug } from "@/lib/wp-categories"
import { Layout } from "@/components/Layout"
import { PostCardSide } from "@/components/Card/PostCardSide"
import NextImage from "next/image"
import { Heading, Button } from "@/ui"
import NextLink from "next/link"
import { MetadataPost } from "@/components/Metadata/MetaDataPost"
import { GetServerSideProps } from "next"

interface PostProps {
  post: {
    title: string
    content: string
    author: {
      name: string
      slug: string
      avatar: {
        url: string
      }
    }
    categories: any
    featuredImage: {
      altText: string
      sourceUrl: string
      caption: string
    }
    date: string
  }
  posts: any
}

export default function Post(props: PostProps) {
  const { post, posts } = props
  const { content, title, author, categories, featuredImage, date } = post

  return (
    <Layout>
      <section className="mx-8 flex flex-row">
        <div className="pr-4">
          <div>
            {categories.map((category: { slug: string; name: string }) => {
              return (
                <Button variant="ghost" className="rounded-full">
                  <NextLink href={`/${category.slug}`}>
                    {category.name}
                  </NextLink>
                </Button>
              )
            })}
          </div>
          <Heading
            as="h1"
            className="mt-4 mb-2 border-b border-gray-200 pb-2 text-2xl font-bold leading-[36px] dark:border-gray-600 md:border-none md:text-3xl md:leading-[43px]"
            dangerouslySetInnerHTML={{
              __html: title,
            }}
          />
          <div>
            <MetadataPost
              authorName={author.name}
              authorAvatarUrl={author.avatar.url}
              authorSlug={author.slug}
              date={date}
            />
          </div>
          {featuredImage && (
            <>
              <NextImage
                width="1280"
                height="720"
                alt={featuredImage.altText}
                className="featured-thumbnail object-cover"
                src={featuredImage.sourceUrl}
              />
              {featuredImage.caption && (
                <span
                  className="text-center text-xs italic text-gray-600 dark:text-gray-500"
                  dangerouslySetInnerHTML={{
                    __html: featuredImage.caption,
                  }}
                />
              )}
            </>
          )}
          <section
            className="article-body"
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          />
        </div>

        <aside className="w-4/12">
          <div className="rounded-xl border border-gray-100 p-4 sticky top-8">
            {posts.map(
              (post: {
                id: number
                featuredImage: {
                  sourceUrl: string
                  altText: string
                }
                title: string
                slug: string
                excerpt: string
                categories: any
              }) => {
                const { primary } = wpPrimaryCategorySlug(post.categories)
                return (
                  <PostCardSide
                    key={post.id}
                    src={post.featuredImage.sourceUrl}
                    alt={post.featuredImage.altText}
                    slug={`${primary.slug}/${post.slug}`}
                    title={post.title}
                  />
                )
              },
            )}
          </div>
        </aside>
      </section>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
}: any) => {
  const { post } = await wpGetPostBySlug(params?.slug)
  const { posts } = await wpGetAllPosts()
  if (post.author === undefined) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      post,
      posts,
    },
  }
}
