import Head from "next/head"
import NextLink from "next/link"
import { useRouter } from "next/router"
import { Header } from "@/components/Header"
import env from "@/env"
import { wpGetAllPosts } from "../lib/wp-posts"
import { PostCard } from "@/components/Card/PostCard"

export default function Home({ posts }) {
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
      <Header />
      <div className="flex">
        <section className="">
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
        </section>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const { posts } = await wpGetAllPosts()
  return { props: { posts } }
}
