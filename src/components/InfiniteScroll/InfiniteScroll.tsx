import * as React from "react"

import { wpGetAllPostsLoadMore } from "@/lib/wp-posts"
import { PostCard } from "@/components/Card"
import { Button } from "@/ui"

export const InfiniteScroll = (props: any) => {
  const { posts, pageInfo } = props

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
      <div ref={loadMoreRef}>
        <Button
          ref={loadMoreRef}
          loading={page.hasNextPage == true}
          loadingText="Loading ..."
          colorScheme="blue"
          className="!w-full !cursor-default"
        >
          No More Posts
        </Button>
      </div>
    </>
  )
}
