// import { wpGetAllCategories, wpGetCategoryBySlug } from "@/lib/wp-categories"
// import { wpGetPostsByCategoryId } from "@/lib/wp-posts"

// export default function Category(props) {
//   const { params } = props
//   console.log(params)

//   return <>agis</>
// }
// export const getStaticProps = async ({ params }: any) => {
//   return {
//     props: {
//       params,
//     },
//     revalidate: 3600,
//   }
// }

// export const getStaticPaths = async () => {
//   const { categories } = await wpGetAllCategories()
//   const paths = categories.map((category) => {
//     const { slug } = category
//     return {
//       params: {
//         category: slug,
//         slug: slug,
//       },
//     }
//   })

//   return {
//     paths,
//     fallback: "blocking",
//   }
// }
