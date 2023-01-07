import { wpGetAllCategories, wpGetCategoryBySlug } from "@/lib/wp-categories"
import { Header } from "@/components/Header"
import { wpGetPostsByCategoryId } from "@/lib/wp-posts"
import { PostCard } from "@/components/Card/PostCard"
import { PostCardSide } from "@/components/Card/PostCardSide"
export default function Category(props) {
  const { category, posts } = props
  console.log(posts)

  return (
    <>
      <Header>
        <section className="mx-8 flex flex-row">
          <div>
            {posts.map((e) => {
              return (
                <PostCard
                  key={e.id}
                  image={e.featuredImage}
                  slug={e.slug}
                  title={e.title}
                  excerpt={e.excerpt}
                />
              )
            })}
          </div>

          <aside className="w-4/12">
            <div className="rounded-xl border border-gray-100 p-4 sticky top-8">
              {posts.map((e) => {
                return (
                  <PostCardSide
                    key={e.id}
                    image={e.featuredImage}
                    slug={e.slug}
                    title={e.title}
                  />
                )
              })}
            </div>
          </aside>
        </section>
      </Header>
    </>
  )
}
export const getStaticProps = async ({ params }: any) => {
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
    revalidate: 3600,
  }
}

export const getStaticPaths = async () => {
  const { categories } = await wpGetAllCategories()
  const paths = categories.map((category) => {
    const { slug } = category
    return {
      params: {
        category: slug,
      },
    }
  })

  return {
    paths,
    fallback: "blocking",
  }
}
