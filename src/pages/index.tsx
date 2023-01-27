import * as React from "react"
import Head from "next/head"
import parse from "html-react-parser"

import { Heading } from "@/ui"
import env from "@/env"
import { wpGetAllPosts } from "../lib/wp-posts"
import { PostCardSide, ListPostFeatured } from "@/components/Card"
import { HomeLayout } from "@/layouts/HomeLayout"
import { getSeoDatas } from "@/lib/wp-seo"
import { InfiniteScroll } from "@/components/InfiniteScrollPost"
import { QueryClient, dehydrate } from "@tanstack/react-query"
import { wpGetMenusByName } from "@/lib/wp-menus"

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
  const featured = posts.slice(0, 7)

  return (
    <>
      <Head>{seo.success === true && parse(seo.head)}</Head>
      <HomeLayout>
        <section className="flex w-full flex-col">
          <ListPostFeatured featured={featured} />
          <div className="mx-auto px-4 w-full md:max-[991px]:max-w-[750px] min-[992px]:max-[1199px]:max-w-[970px] min-[1200px]:max-w-[1170px] flex flex-row lg:mx-auto lg:px-4">
            <div className="w-full flex flex-col lg:mr-4">
              <InfiniteScroll posts={posts} pageInfo={pageInfo} />
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
          </div>
        </section>
      </HomeLayout>
    </>
  )
}

export async function getServerSideProps() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(["menus"], () =>
    wpGetMenusByName(env.MENU_PRIMARY),
  )

  const { posts, pageInfo } = await wpGetAllPosts()
  const seo = await getSeoDatas(`https://${env.DOMAIN}`)

  return {
    props: { posts, dehydratedState: dehydrate(queryClient), pageInfo, seo },
  }
}
