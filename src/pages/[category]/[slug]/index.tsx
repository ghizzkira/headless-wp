import * as React from "react"

import Head from "next/head"
import dynamic from "next/dynamic"

import { GetServerSideProps } from "next"
import parse from "html-react-parser"
const HomeLayout = dynamic(() =>
  import("@/layouts/HomeLayout").then((mod) => mod.HomeLayout),
)
import env from "@/env"
import { getSeoDatas } from "@/lib/wp-seo"
import { wpGetPostBySlug, wpGetAllPosts } from "@/lib/wp-posts"
import { SinglePostLayout } from "@/layouts/SinglePost"

interface PostProps {
  post: {
    title: string
    content: string
    author: {
      name: string
      slug: string
      avatar: {
        url: string
      }
    }
    slug: string
    categories: any
    featuredImage: {
      altText: string
      sourceUrl: string
      caption: string
    }
    tags: any
    date: string
  }
  seo: {
    head: string
    success: boolean
  }
  posts: any
}

export default function Post(props: PostProps) {
  const { post, posts, seo } = props

  return (
    <>
      <Head>{seo.success === true && parse(seo.head)}</Head>
      <HomeLayout>
        <SinglePostLayout post={post} posts={posts} />
      </HomeLayout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
}: any) => {
  const { post } = await wpGetPostBySlug(params?.slug)
  const { posts } = await wpGetAllPosts()
  if (post.author === undefined) {
    return {
      notFound: true,
    }
  }
  const seo = await getSeoDatas(`https://${env.DOMAIN}${post.uri}`)

  return {
    props: {
      post,
      posts,
      seo,
    },
  }
}
