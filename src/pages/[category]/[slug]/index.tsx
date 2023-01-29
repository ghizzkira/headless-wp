import * as React from "react"
import { QueryClient, dehydrate } from "@tanstack/react-query"
import { useRouter } from "next/router"
import Head from "next/head"
import dynamic from "next/dynamic"
import { withCSR } from "@/utils/with-CSR"
import { GetServerSideProps } from "next"
import parse from "html-react-parser"
const HomeLayout = dynamic(() =>
  import("@/layouts/HomeLayout").then((mod) => mod.HomeLayout),
)
import env from "@/env"
import { getSeoDatas } from "@/lib/wp-seo"
import {
  wpGetPostBySlug,
  wpGetAllPosts,
  useWpGetAllPosts,
  useWpGetPostBySlug,
} from "@/lib/wp-posts"
import { SinglePostLayout } from "@/layouts/SinglePost"

// interface PostProps {
//   post: {
//     title: string
//     content: string
//     author: {
//       name: string
//       slug: string
//       avatar: {
//         url: string
//       }
//     }
//     slug: string
//     categories: any
//     featuredImage: {
//       altText: string
//       sourceUrl: string
//       caption: string
//     }
//     tags: any
//     date: string
//   }
//   seo: {
//     head: string
//     success: boolean
//   }
//   posts: any
// }

export default function Post() {
  const router = useRouter()
  const {
    query: { slug },
  } = router
  const { wpGetAllPostsData } = useWpGetAllPosts()

  const { wpGetPostBySlug } = useWpGetPostBySlug(slug as string)
  return (
    <>
      {/* <Head>{seo.success === true && parse(seo.head)}</Head> */}
      <HomeLayout>
        <SinglePostLayout
          post={wpGetPostBySlug?.data?.post}
          posts={wpGetAllPostsData?.data?.posts}
        />
      </HomeLayout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = withCSR(
  async ({ params, res }: any) => {
    const queryClient = new QueryClient()

    let isError = false

    try {
      await queryClient.fetchQuery(["post"], () =>
        wpGetPostBySlug(params?.slug),
      )
      await queryClient.fetchQuery(["posts"], () => wpGetAllPosts())
    } catch (error: any) {
      isError = true
      res.statusCode = error.response.status
    }
    if (isError) {
      return {
        notFound: true,
      }
    }
    // const seo = await getSeoDatas(`https://${env.DOMAIN}${post.uri}`)

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    }
  },
)
