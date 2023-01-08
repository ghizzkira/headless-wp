import { wpGetAllCategories, wpGetCategoryBySlug } from "@/lib/wp-categories"
import { Header } from "@/components/Header"
import { wpGetPostsByCategoryId } from "@/lib/wp-posts"
import { PostCard } from "@/components/Card/PostCard"
import { PostCardSide } from "@/components/Card/PostCardSide"

interface CategoryProps {
  category: {
    name: string
  }
  posts: any
}

export default function Category(props: CategoryProps) {
  // eslint-disable-next-line no-unused-vars
  const { category, posts } = props
  console.log(posts)

  return (
    <>
      <Header>
        <section className="mx-8 flex flex-row">
          <div>
            {posts.map(
              (post: {
                id: number
                featuredImage: string
                slug: string
                title: string
                excerpt: string
              }) => {
                return (
                  <PostCard
                    key={post.id}
                    src={post.featuredImage}
                    alt={post.title}
                    slug={post.slug}
                    title={post.title}
                    excerpt={post.excerpt}
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
                  featuredImage: string
                  slug: string
                  title: string
                  excerpt: string
                }) => {
                  return (
                    <PostCardSide
                      key={post.id}
                      src={post.featuredImage}
                      alt={post.slug}
                      title={post.title}
                      slug={post.slug}
                    />
                  )
                },
              )}
            </div>
          </aside>
        </section>
      </Header>
    </>
  )
}

export const getServerSideProps = async ({ params }: any) => {
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

// export const getStaticPaths = async () => {
//   const { categories } = await wpGetAllCategories()
//   const paths = categories.map((category) => {
//     const { slug } = category
//     return {
//       params: {
//         category: slug,
//       },
//     }
//   })

//   return {
//     paths,
//     fallback: "blocking",
//   }
// }
