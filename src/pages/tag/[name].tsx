import { GetServerSideProps } from "next"
import { Heading } from "@/ui"

import { wpGetTagBySlug } from "@/lib/wp-tags"
import { wpGetPostsByTagId } from "@/lib/wp-posts"
import { HomeLayout } from "@/layouts/HomeLayout"
import { PostCard } from "@/components/Card/PostCard"
import { PostCardSide } from "@/components/Card/PostCardSide"

interface TagProps {
  tag: {
    name: string
  }
  posts: any
}
export default function Tag(props: TagProps) {
  // eslint-disable-next-line no-unused-vars
  const { tag, posts } = props

  return (
    <>
      <HomeLayout>
        <section className="mx-4 md:max-w-[750px] lg:max-w-[1070px] xl:max-w-[1270px] md:mx-auto w-full flex flex-row lg:mx-auto lg:px-4">
          <div className="w-full flex flex-col lg:mr-4">
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
                author: {
                  name: string
                  avatar: {
                    url: string
                  }
                  uri: string
                }
                uri: string
                date: string
              }) => {
                return (
                  <PostCard
                    key={post.id}
                    src={post.featuredImage.sourceUrl}
                    alt={post.featuredImage.altText}
                    slug={post.uri}
                    title={post.title}
                    excerpt={post.excerpt}
                    authorName={post.author.name}
                    authorAvatarUrl={post.author.avatar.url}
                    authorUri={post.author.uri}
                    date={post.date}
                  />
                )
              },
            )}
          </div>

          <aside className="w-4/12 hidden lg:block">
            <div className="rounded-xl border border-gray-100 p-4 sticky top-8">
              <div className="mb-4">
                <Heading as="h4" className="!text-transparent">
                  <span className="after:absolute after:border after:border-[#1e3799] after:bg-[#1e3799] after:h-[3px] after:w-[50px] after:ml-[-25px] after:left-1/2 after:top-[40px]">
                    Trending
                  </span>
                </Heading>
              </div>
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
                  uri: string
                }) => {
                  return (
                    <PostCardSide
                      key={post.id}
                      src={post.featuredImage.sourceUrl}
                      alt={post.featuredImage.altText}
                      slug={post.uri}
                      title={post.title}
                    />
                  )
                },
              )}
            </div>
          </aside>
        </section>
      </HomeLayout>
    </>
  )
}
export const getServerSideProps: GetServerSideProps = async ({
  params,
}: any) => {
  const { tag } = await wpGetTagBySlug(params?.name)
  if (tag == null || tag?.error) {
    return {
      notFound: true,
    }
  }

  const { posts } = await wpGetPostsByTagId(tag.id)
  return {
    props: {
      tag,
      posts,
    },
  }
}
