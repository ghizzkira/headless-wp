import { wpGetUserbyId } from "@/lib/wp-users"
import { wpGetPostsByAuthorSlug } from "@/lib/wp-posts"
import { Layout } from "@/components/Layout"
import { PostCard } from "@/components/Card/PostCard"
import { PostCardSide } from "@/components/Card/PostCardSide"
export default function Author(props) {
  const { posts } = props
  console.log(posts)

  return (
    <>
      <Layout>
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
                uri: string
              }) => {
                return (
                  <PostCard
                    key={post.id}
                    src={post.featuredImage.sourceUrl}
                    alt={post.featuredImage.altText}
                    slug={post.uri}
                    title={post.title}
                    excerpt={post.excerpt}
                    author={post.author}
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
export const getServerSideProps = async ({ params }: any) => {
  const { posts, pageInfo, authorId } = await wpGetPostsByAuthorSlug(
    params?.slug,
  )
  const { user } = await wpGetUserbyId(authorId)
  if (user.error) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      user,
      posts,
      pageInfo,
    },
  }
}
