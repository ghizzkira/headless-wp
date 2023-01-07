import {
  QUERY_WP_ALL_CATEGORIES,
  QUERY_WP_CATEGORY_BY_SLUG,
  QUERY_WP_CATEGORY_SEO_BY_ID,
  QUERY_WP_ALL_CATEGORIES_SITEMAP,
} from "@/data/wp-categories"
import { wpFetchAPI } from "./wp-posts"
import env from "@/env"

export function wpCategoryPathBySlug(slug: string) {
  return `/category/${slug}`
}

export async function wpGetAllCategories() {
  const data = await wpFetchAPI(QUERY_WP_ALL_CATEGORIES)
  const categories = data?.data.categories.edges.map(({ node = {} }) => node)
  return {
    categories,
  }
}
export async function wpGetAllCategoriesSiteMap() {
  const data = await wpFetchAPI(QUERY_WP_ALL_CATEGORIES_SITEMAP)
  const categories = data?.categories.edges.map(({ node = {} }) => node)
  return {
    categories,
  }
}

export async function wpGetCategoryBySlug(slug: string) {
  const apiHost = new URL(env.WP_API_URL).host

  let categoryData

  try {
    categoryData = await wpFetchAPI(QUERY_WP_CATEGORY_BY_SLUG, {
      slug,
    })
  } catch (e) {
    console.log(
      `[categories][wpGetCategoryBySlug] Failed to query category data: ${e}`,
    )
    throw e
  }
  if (categoryData.categories === null) {
    let category: { error: string } = {
      error: "",
    }
    category.error = "Somethig went wrong"
    return { category }
  }

  const category = categoryData?.data.categories.edges
    .map(({ node = {} }) => node)
    .map(wpMapCategoryData)[0]

  // If the SEO plugin is enabled, look up the data
  // and apply it to the default settings

  if (categoryData.categories === null) {
    let category: { error: string } = {
      error: "",
    }
    category.error = "Something went wrong"
    return { category }
  }

  return {
    category,
  }
}

export async function wpGetCategories({ count }: { count: number }) {
  const { categories } = await wpGetAllCategories()
  return {
    categories: categories.slice(0, count),
  }
}

export function wpMapCategoryData(category: string[]) {
  const data = { ...category }
  return data
}

//TODO: Fix this
export function wpPrimaryCategorySlug(category: any[]) {
  const isPrimary = category.find(({ parent }: any) => {
    return parent === null
  })
  let primary
  if (isPrimary) {
    primary = isPrimary
    return { primary }
  } else {
    primary = category[0]
    return { primary }
  }
}
