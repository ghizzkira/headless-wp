import { GetServerSideProps } from "next"
import { Heading } from "@/ui"
import NextLink from "next/link"
import { wpGetTagBySlug } from "@/lib/wp-tags"
import { wpGetPostsByTagId } from "@/lib/wp-posts"
import { HomeLayout } from "@/layouts/HomeLayout"
import { PostCard } from "@/components/Card/PostCard"
import { PostCardSide } from "@/components/Card/PostCardSide"
import { Button } from "@/ui"
import Head from "next/head"
import parse from "html-react-parser"
import { getSeoDatas } from "@/lib/wp-seo"
import env from "@/env"
interface TagProps {
  tag: {
    name: string
  }
  posts: any
}
export default function Tag(props: TagProps) {
  // eslint-disable-next-line no-unused-vars
  const { tag, posts, seo } = props

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
                        {tag.name}
                      </span>
                    </div>
                  </li>
                </ol>
              </nav>
            </div>
            <div className="self-center">
              <Heading size="4xl" className="text-white">
                Gamedaim
              </Heading>
            </div>
            <div className="self-center">
              <NextLink href={`/${tag.slug}`}>
                <Button className="mr-2 border border-[#24272f] !bg-[#1e3799]">
                  All
                </Button>
              </NextLink>
              {/* {categoryChild &&
                categoryChild.map((child: { slug: string; name: string }) => {
                  return (
                    <NextLink href={`/${child.slug}`}>
                      <Button className="mr-2 border border-[#24272f] !bg-[#ffffff33] hover:!bg-[#1e3799]">
                        {child.name}
                      </Button>
                    </NextLink>
                  )
                })} */}
            </div>
          </div>
          <div className="mx-4 container md:mx-auto flex flex-row lg:mx-auto lg:px-4">
            <div className="w-full flex flex-col lg:mr-4">
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
export const getServerSideProps: GetServerSideProps = async ({
  params,
}: any) => {
  const { tag } = await wpGetTagBySlug(params?.name)
  if (tag == null || tag?.error) {
    return {
      notFound: true,
    }
  }

  const { posts } = await wpGetPostsByTagId(tag.id)
  const seo = await getSeoDatas(`${env.DOMAIN}${tag.uri}`)

  return {
    props: {
      tag,
      posts,
      seo,
    },
  }
}
