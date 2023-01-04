import axios from "axios"
import { wpUpdateUserAvatar } from "./wp-users"

import {
  QUERY_WP_ALL_POSTS,
  QUERY_WP_POST_BY_SLUG,
  QUERY_WP_POSTS_BY_AUTHOR_SLUG,
  QUERY_WP_POSTS_BY_CATEGORY_ID,
  QUERY_WP_POST_SEO_BY_SLUG,
  QUERY_WP_POST_PER_PAGE,
  QUERY_WP_POSTS_BY_TAG_ID,
  QUERY_WP_ALL_POSTS_LOAD_MORE,
  QUERY_WP_ALL_SLUG,
  QUERY_WP_SEARCH_POSTS,
} from "@/data/wp-posts"

export function wpPostPathBySlug(slug: string) {
  return `/${slug}`
}
const WP_API_URL = "https://gamedaim.com/api"

export async function wpFetchAPI(query: string, { variables } = {} as any) {
  const headers = { "Content-Type": "application/json" }

  const res = await axios({
    url: WP_API_URL,
    headers: headers,
    params: { query },
    data: { variables: variables },
  })

  return res.data
}
export async function wpGetAllPosts() {
  const data = await wpFetchAPI(QUERY_WP_ALL_POSTS)
  const posts = data?.data.posts.edges.map(({ node = {} }) => node)

  return {
    posts: Array.isArray(posts) && posts.map(wpMapPostData),
  }
}
export async function wpGetAllPostsLoadMore(after = "") {
  const data = await wpFetchAPI(QUERY_WP_ALL_POSTS_LOAD_MORE, {
    variables: { after },
  })
  const posts = data?.data.posts.edges.map(({ node = {} }) => node)
  return {
    posts: Array.isArray(posts) && posts.map(wpMapPostData),
    pageInfo: data?.data.posts.pageInfo,
  }
}
export function wpMapPostData(post = {}) {
  const data: any = { ...post }

  // Clean up the author object to avoid someone having to look an extra
  // level deeper into the node

  if (data.author) {
    data.author = {
      ...data.author.node,
    }
  }

  // The URL by default that comes from Gravatar / WordPress is not a secure
  // URL. This ends up redirecting to https, but it gives mixed content warnings
  // as the HTML shows it as http. Replace the url to avoid those warnings
  // and provide a secure URL by default

  if (data.author?.avatar) {
    data.author.avatar = wpUpdateUserAvatar(data.author.avatar)
  }

  // Clean up the categories to make them more easy to access

  if (data.categories) {
    data.categories = data.categories.edges.map(({ node }: any) => {
      return {
        ...node,
      }
    })
  }

  // Clean up the tags to make them more easy to access

  if (data.tags) {
    data.tags = data.tags.edges.map(({ node }: any) => {
      return {
        ...node,
      }
    })
  }

  if (data.content) {
    if (data.content.includes(`https://media.wowkia.com`)) {
      let content
      content = data.content
      content = content.replace(
        /href="https:\/\/media.wowkia/gm,
        'href="https://wowkia',
      )
      content = content.replace(
        /https:\/\/media.wowkia.com\/wp-content/gm,
        "https://cdn.wowkia.com/wp-content",
      )
      data.content = content
    }
  }
  // Clean up the featured image to make them more easy to access

  if (data.featuredImage) {
    data.featuredImage = data.featuredImage.node
    let imageUrl
    imageUrl = data.featuredImage.sourceUrl
    if (imageUrl.includes("media") === true) {
      imageUrl = imageUrl.replace("media", "cdn")
      data.featuredImage.sourceUrl = imageUrl
    }
  }

  return data
}
