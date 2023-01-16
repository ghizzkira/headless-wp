import NextImage from "next/image"
import NextLink from "next/link"
import { GetServerSideProps } from "next"
import { Heading, Button, ButtonGroup } from "@/ui"

import {
  wpGetPostBySlug,
  wpGetAllPosts,
  wpPostPathBySlug,
} from "@/lib/wp-posts"
import { wpPrimaryCategorySlug } from "@/lib/wp-categories"
import { wpTagPathBySlug } from "@/lib/wp-tags"
import { SinglePostLayout } from "@/layouts/SinglePost"
import { PostCardSide } from "@/components/Card/PostCardSide"
import { MetadataPost } from "@/components/Metadata/MetaDataPost"
import { ShareButtonArticle } from "@/components/Share"

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
  posts: any
}

export default function Post(props: PostProps) {
  const { post, posts } = props
  const { content, title, author, categories, featuredImage, date, tags } = post

  return (
    <SinglePostLayout>
      <div className="flex">
        <section className="mx-4 lg:mx-8 flex flex-row w-full lg:w-8/12">
          <div className="pr-4">
            <div>
              {categories.map((category: { slug: string; name: string }) => {
                return (
                  <ButtonGroup className="p-1">
                    <Button
                      size="xs"
                      colorScheme="slate"
                      className="!rounded-full uppercase"
                    >
                      <NextLink href={`/${category.slug}`}>
                        {category.name}
                      </NextLink>
                    </Button>
                  </ButtonGroup>
                )
              })}
            </div>
            <Heading
              as="h1"
              className="mt-4 mb-2 border-b border-gray-200 pb-2 text-2xl font-bold leading-[36px] dark:border-gray-600 md:border-none md:text-3xl md:leading-[43px]"
              dangerouslySetInnerHTML={{
                __html: title,
              }}
            />
            <div>
              <MetadataPost
                authorName={author.name}
                authorAvatarUrl={author.avatar.url}
                authorSlug={author.slug}
                date={date}
              />
            </div>
            {featuredImage && (
              <>
                <NextImage
                  width="1280"
                  height="720"
                  alt={featuredImage.altText}
                  className="rounded-lg object-cover"
                  src={featuredImage.sourceUrl}
                />
                {featuredImage.caption && (
                  <span
                    className="text-center text-xs italic text-gray-600 dark:text-gray-500"
                    dangerouslySetInnerHTML={{
                      __html: featuredImage.caption,
                    }}
                  />
                )}
              </>
            )}
            <div className="flex">
              <div className="h-fit mr-2 shadow-xs fixed top-[unset] bottom-0 left-0 z-40 mx-0 mb-0 mr-0 flex w-full flex-row items-center justify-center bg-white dark:bg-gray-700 lg:sticky lg:top-20 lg:bottom-[unset] lg:left-[unset] lg:w-auto lg:bg-transparent lg:shadow-none lg:dark:bg-transparent">
                {/* TODO: category on slug not applied  */}
                <ShareButtonArticle
                  url={`/${wpPostPathBySlug(post.slug)}`}
                  text={title}
                />
              </div>
              <section
                className="article-body"
                dangerouslySetInnerHTML={{
                  __html: content,
                }}
              />
            </div>

            <section className="mx-12 my-6" id="tag">
              {tags.map((tag: { slug: string; name: string }) => {
                return (
                  <ButtonGroup className="p-1">
                    <Button
                      size="sm"
                      colorScheme="blue"
                      variant="outline"
                      className="mx-1"
                      key={tag.slug}
                    >
                      <NextLink href={wpTagPathBySlug(tag.slug)}>
                        {tag.name}
                      </NextLink>
                    </Button>
                  </ButtonGroup>
                )
              })}
            </section>
          </div>
        </section>
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
                title: string
                slug: string
                excerpt: string
                categories: any
              }) => {
                const { primary } = wpPrimaryCategorySlug(post.categories)
                return (
                  <PostCardSide
                    key={post.id}
                    src={post.featuredImage.sourceUrl}
                    alt={post.featuredImage.altText}
                    slug={`/${primary.slug}/${post.slug}`}
                    title={post.title}
                  />
                )
              },
            )}
          </div>
        </aside>
      </div>
    </SinglePostLayout>
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
  return {
    props: {
      post,
      posts,
    },
  }
}
