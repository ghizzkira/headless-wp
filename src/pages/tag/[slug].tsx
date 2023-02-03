import * as React from "react"
import Head from "next/head"
import parse from "html-react-parser"
import NextLink from "next/link"
import { GetStaticProps, GetStaticPaths } from "next"
import dynamic from "next/dynamic"
import env from "@/env"
import { wpGetTagBySlug, useWpGetTagBySlug, wpGetAllTags } from "@/lib/wp-tags"
import { wpGetPostsByTagSlug, useWpGetPostsByTagSlug } from "@/lib/wp-posts"
import { getSeoDatas } from "@/lib/wp-seo"
import { QueryClient, dehydrate } from "@tanstack/react-query"
import { useRouter } from "next/router"
const PostCardSide = dynamic(() =>
  import("@/components/Card").then((mod) => mod.PostCardSide),
)

const HomeLayout = dynamic(() =>
  import("@/layouts/HomeLayout").then((mod) => mod.HomeLayout),
)
const InfiniteScroll = dynamic(() =>
  import("@/components/InfiniteScroll").then((mod) => mod.InfiniteScroll),
)
const Button = dynamic(() => import("@/ui").then((mod) => mod.Button))
const Heading = dynamic(() => import("@/ui").then((mod) => mod.Heading))
interface TagProps {
  tag: {
    name: string
    slug: string
    id: string
  }
  seo: {
    head: string
    success: boolean
  }
  posts: any
  pageInfo: any
}

export default function Tag(props: TagProps) {
  const { seo } = props
  const router: any = useRouter()
  const {
    query: { slug },
  } = router
  const { getTagBySlug }: any = useWpGetTagBySlug(slug)
  const { getPostsByTagSlug }: any = useWpGetPostsByTagSlug(slug)
  return (
    <>
      <Head>{seo.success === true && parse(seo.head)}</Head>
      <HomeLayout>
        <section className="flex w-full flex-col">
          <div className="flex py-10 mb-10 flex-col bg-gradient-to-r from-[#1e3799] to-[#0984e3] relative">
            <div className="absolute top-1">
              <nav className="ml-2 flex" aria-label="Breadcrumb">
                <ol className="inline-flex items-center text-white">
                  <li className="inline-flex items-center">
                    <NextLink
                      href="/"
                      className="inline-flex items-center text-sm font-medium text-white dark:text-gray-400 dark:hover:text-white after:inline-block after:not-italic after:font-normal after:ml-2 after:mr-2 after:align-top after:content-['>']"
                    >
                      Home
                    </NextLink>
                  </li>
                  <li aria-current="page">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-white dark:text-gray-400">
                        {getTagBySlug?.data?.tag.name}
                      </span>
                    </div>
                  </li>
                </ol>
              </nav>
            </div>
            <div className="self-center">
              <Heading size="4xl" className="text-white">
                {getTagBySlug?.data?.tag?.name}
              </Heading>
            </div>
            <div className="self-center">
              <NextLink href={`/${slug}`}>
                <Button className="!mr-2 border border-[#24272f] !bg-[#1e3799]">
                  All
                </Button>
              </NextLink>
            </div>
          </div>
          <div className="mx-auto w-full md:max-[991px]:max-w-[750px] min-[992px]:max-[1199px]:max-w-[970px] min-[1200px]:max-w-[1170px] md:mx-auto flex flex-row">
            <div className="w-full flex px-4 flex-col lg:mr-4">
              <InfiniteScroll
                pageType="tag"
                posts={getPostsByTagSlug?.data?.posts}
                id={slug}
                pageInfo={getPostsByTagSlug?.data?.pageInfo}
              />
            </div>
            <aside className="w-4/12 hidden px-4 lg:block">
              <div className="rounded-xl border border-gray-100 dark:border-gray-700 p-4 sticky top-8">
                <div className="mb-4">
                  <Heading as="h4" className="!text-transparent">
                    <span className="after:absolute after:border after:border-[#1e3799] after:bg-[#1e3799] after:h-[3px] after:w-[50px] after:ml-[-25px] after:left-1/2 after:top-[40px]">
                      Trending
                    </span>
                  </Heading>
                </div>
                {getPostsByTagSlug?.data?.posts.map(
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

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const queryClient = new QueryClient()
  const slug = params?.slug
  const seo = await getSeoDatas(`https://${env.DOMAIN}/tag/${slug}`)
  let isError = false
  await queryClient.prefetchQuery(["tag", slug], () => wpGetTagBySlug(slug))
  try {
    await queryClient.prefetchQuery(["tagPosts", slug], () =>
      wpGetPostsByTagSlug(slug),
    )
  } catch (error: any) {
    isError = true
  }
  if (isError) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      seo,
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 100,
  }
}
export const getStaticPaths: GetStaticPaths = async () => {
  const { tags } = await wpGetAllTags()
  const paths = tags.map((tag: any) => {
    const { slug } = tag
    return {
      params: {
        slug,
      },
    }
  })

  return {
    paths,
    fallback: "blocking",
  }
}
