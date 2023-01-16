import NextLink from "next/link"
import { GetServerSideProps } from "next"
import { Button, Heading } from "@/ui"

import { wpGetCategoryBySlug } from "@/lib/wp-categories"
import { HomeLayout } from "@/layouts/HomeLayout"
import { wpGetPostsByCategoryId } from "@/lib/wp-posts"
import { PostCard } from "@/components/Card/PostCard"
import { PostCardSide } from "@/components/Card/PostCardSide"

interface CategoryProps {
  category: {
    name: string
    slug: string
    children: {
      nodes: any
    }
  }
  posts: any
}

export default function Category(props: CategoryProps) {
  const { category, posts } = props
  const categoryChild = category.children.nodes

  return (
    <>
      <HomeLayout>
        <section className="mx-4 md:max-w-[750px] lg:max-w-[1070px] xl:max-w-[1270px] md:mx-auto flex flex-col">
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
                        {category.name}
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
              <NextLink href={`/${category.slug}`}>
                <Button className="mr-2 border border-[#24272f] !bg-[#1e3799]">
                  All
                </Button>
              </NextLink>
              {categoryChild &&
                categoryChild.map((child: { slug: string; name: string }) => {
                  return (
                    <NextLink href={`/${child.slug}`}>
                      <Button className="mr-2 border border-[#24272f] !bg-[#ffffff33] hover:!bg-[#1e3799]">
                        {child.name}
                      </Button>
                    </NextLink>
                  )
                })}
            </div>
          </div>
          <div className=" w-full flex flex-row lg:mx-auto lg:px-4">
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
              <div className="rounded-xl border border-gray-100 p-4 sticky top-8">
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
  const { category } = await wpGetCategoryBySlug(params?.category)
  if (category.error) {
    return {
      notFound: true,
    }
  }

  const { posts } = await wpGetPostsByCategoryId(category.slug)
  return {
    props: {
      category,
      posts,
    },
  }
}
