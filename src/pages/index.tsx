import Head from "next/head"
import { useRouter } from "next/router"
import env from "@/env"
import { wpGetAllPosts } from "../lib/wp-posts"
import { PostCard } from "@/components/Card/PostCard"
import { PostCardSide } from "@/components/Card/PostCardSide"
import { Header } from "@/components/Header"

interface HomeProps {
  posts: any
}

export default function Home(props: HomeProps) {
  const { posts } = props
  const router = useRouter()

  return (
    <>
      <Head>
        <title>{env.SITE_TITLE}</title>
        <meta name="description" content={env.ABOUT} />
        <meta property="og:title" content={env.SITE_TITLE} />
        <meta property="og:title" content={env.SITE_TITLE} />
        <meta property="og:description" content={env.ABOUT} />
        <link
          rel="canonical"
          href={`https://${env.DOMAIN}${router.pathname}`}
        />
      </Head>
      <Header>
        <section className="mx-8 flex flex-row">
          <div>
            {posts.map(
              (post: {
                id: number
                featuredImage: string
                title: string
                slug: string
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
                  title: string
                  slug: string
                  excerpt: string
                }) => {
                  return (
                    <PostCardSide
                      key={post.id}
                      src={post.featuredImage}
                      alt={post.title}
                      slug={post.slug}
                      title={post.title}
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

export async function getServerSideProps() {
  const { posts } = await wpGetAllPosts()
  return { props: { posts } }
}
