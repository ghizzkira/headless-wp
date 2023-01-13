import { wpGetCategoryBySlug } from "@/lib/wp-categories"
import { Layout } from "@/components/Layout"
import { wpGetPostsByCategoryId } from "@/lib/wp-posts"
import { PostCard } from "@/components/Card/PostCard"
import { PostCardSide } from "@/components/Card/PostCardSide"
import { GetServerSideProps } from "next"

interface CategoryProps {
  category: {
    name: string
  }
  posts: any
}

export default function Category(props: CategoryProps) {
  // eslint-disable-next-line no-unused-vars
  const { category, posts } = props

  return (
    <>
      <Layout>
        <div className="flex flex-col"></div>

        <section className="mx-8 flex flex-row">
          <div>
            {posts.map(
              (post: {
                id: number
                featuredImage: {
                  sourceUrl: string
                  altText: string
                }
                slug: string
                title: string
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

          <aside className="w-4/12">
            <div className="rounded-xl border border-gray-100 p-4 sticky top-8">
              {posts.map(
                (post: {
                  id: number
                  featuredImage: {
                    sourceUrl: string
                    altText: string
                  }
                  slug: string
                  title: string
                  excerpt: string
                  categories: any
                  uri: string
                }) => {
                  return (
                    <PostCardSide
                      key={post.id}
                      src={post.featuredImage.sourceUrl}
                      alt={post.featuredImage.altText}
                      title={post.title}
                      slug={post.uri}
                    />
                  )
                },
              )}
            </div>
          </aside>
        </section>
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
}: any) => {
  const { category } = await wpGetCategoryBySlug(params?.category)
  if (category.error) {
    return {
      notFound: true,
    }
  }

  const { posts } = await wpGetPostsByCategoryId(category.name)
  return {
    props: {
      category,
      posts,
    },
  }
}
