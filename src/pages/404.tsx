import env from "@/env"
import Head from "next/head"
// import NextLink from "next/link"
import { useRouter } from "next/router"

export default function Custom404() {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>{env.SITE_TITLE} | 404</title>
        <meta name="description" content={env.ABOUT} />
        <meta property="og:title" content={`${env.SITE_TITLE} | 404`} />
        <meta property="og:description" content={env.ABOUT} />
        <link
          rel="canonical"
          href={`https://${env.DOMAIN}${router.pathname}`}
        />
      </Head>
      <div className="flex items-center justify-center h-screen bg-white">
        404
      </div>
    </>
  )
}
