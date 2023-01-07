export const QUERY_WP_ALL_CATEGORIES = `
  {
    categories(first: 100) {
      edges {
        node {
          categoryId
          description
          id
          name
          slug
        }
      }
    }
  }
`
export const QUERY_WP_ALL_CATEGORIES_SITEMAP = `
  {
    categories(first: 1000) {
      edges {
        node {
          categoryId
          description
          id
          name
          slug
        }
      }
    }
  }
`
export const QUERY_WP_CATEGORY_BY_SLUG = `
  query CategoryBySlug($slug: [String]) {
    categories(where: { slug: $slug }, first: 1000) {
      edges {
        node {
          categoryId
          description
          id
          name
          slug
        }
      }
    }
  }
`

// export const QUERY_WP_CATEGORY_SEO_BY_ID = `
//   query CategorySEOBySlug($id: ID!) {
//     category( id: $id ) {
//       seo {
//             canonical
//             metaDesc
//             metaRobotsNofollow
//             metaRobotsNoindex
//             opengraphAuthor
//             opengraphDescription
//             opengraphModifiedTime
//             opengraphPublishedTime
//             opengraphPublisher
//             opengraphTitle
//             opengraphType
//             title
//             twitterDescription
//             twitterTitle
//             twitterImage {
//               altText
//               sourceUrl
//               mediaDetails {
//                 width
//                 height
//               }
//             }
//             opengraphImage {
//               altText
//               sourceUrl
//               mediaDetails {
//                 height
//                 width
//               }
//             }
//           }
//     }
//   }
// `
