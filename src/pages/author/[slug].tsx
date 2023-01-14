// import { wpGetUserbyId } from "@/lib/wp-users"
import { wpGetPostsByAuthorSlug } from "@/lib/wp-posts"
import { Layout } from "@/components/Layout"
import { PostCard } from "@/components/Card/PostCard"
import { PostCardSide } from "@/components/Card/PostCardSide"
import { Heading } from "@/ui"
export default function Author(props) {
  const { posts, sss } = props
  console.log(sss)

  return (
    <>
      <Layout>
        <section className="mx-4 md:max-w-[750px] lg:max-w-[1070px] xl:max-w-[1270px] md:mx-auto w-full flex flex-row lg:mx-4">
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
      </Layout>
    </>
  )
}
export const getServerSideProps = async ({ params }: any) => {
  const { posts, pageInfo, authorId } = await wpGetPostsByAuthorSlug(
    params?.slug,
  )
  // const sss = await wpGetUserbyId(authorId)
  // // if (user.error) {
  // //   return {
  // //     notFound: true,
  // //   }
  // // }

  return {
    props: {
      posts,
      pageInfo,
    },
  }
}
