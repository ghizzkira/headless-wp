import * as React from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { Heading } from "@/ui"
import parse from "html-react-parser"
import env from "@/env"
import { wpGetAllPosts, wpGetAllPostsLoadMore } from "../lib/wp-posts"
import { PostCard } from "@/components/Card/PostCard"
import { PostCardSide } from "@/components/Card/PostCardSide"
import { HomeLayout } from "@/layouts/HomeLayout"
import { getSeoDatas } from "@/lib/wp-seo"

import { Text } from "@/ui"
interface HomeProps {
  posts: any
  pageInfo: any
  seo: {
    head: string
    success: boolean
  }
}

export default function Home(props: HomeProps) {
  const { posts, seo, pageInfo } = props
  const loadMoreRef: any = React.useRef(null)
  const [page, setPage] = React.useState(pageInfo)
  const [list, setList] = React.useState(posts)

  const handleObserver = React.useCallback(
    async (entries: any) => {
      const [target] = entries
      if (target.isIntersecting && page.hasNextPage == true) {
        const data: any = await wpGetAllPostsLoadMore(page.endCursor)
        setList((list: any) => [...list, ...data.posts])
        setPage(data.pageInfo)
      }
    },
    [page.endCursor, page.hasNextPage],
  )

  React.useEffect(() => {
    const lmRef: any = loadMoreRef.current
    const observer = new IntersectionObserver(handleObserver)

    if (loadMoreRef.current) observer.observe(loadMoreRef.current)
    return () => {
      observer.unobserve(lmRef)
    }
  }, [handleObserver])

  return (
    <>
      <Head>{seo.success === true && parse(seo.head)}</Head>
      <HomeLayout>
        <section className="mx-4 px-4 w-full md:max-[991px]:max-w-[750px] min-[992px]:max-[1199px]:max-w-[970px] min-[1200px]:max-w-[1170px] md:mx-auto w-full flex flex-row lg:mx-auto lg:px-4">
          <div className="w-full flex flex-col lg:mr-4">
            {list.map(
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
            <div ref={loadMoreRef} className="bg-primary-700 rounded-md p-4">
              <Text className="!text-white m-auto">
                {page.hasNextPage == true ? "Loading..." : "No More Posts"}
              </Text>
            </div>
          </div>

          <aside className="w-4/12 hidden lg:block">
            <div className="rounded-xl border border-gray-100 dark:border-gray-700 p-4 sticky top-8">
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

export async function getServerSideProps() {
  const { posts, pageInfo } = await wpGetAllPosts()
  const seo = await getSeoDatas(`https://${env.DOMAIN}`)

  return { props: { posts, pageInfo, seo } }
}
