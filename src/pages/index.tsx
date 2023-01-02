import Head from "next/head"
// import NextLink from "next/link"
import { useRouter } from "next/router"

import env from "@/env"

export default function Home() {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>{env.SITE_TITLE}</title>
        <meta name="description" content={env.ABOUT} />
        <meta property="og:title" content={env.SITE_TITLE} />
        <meta property="og:title" content={env.SITE_TITLE} />
        <meta property="og:description" content={env.ABOUT} />
        <link
          rel="canonical"
          href={`https://${env.DOMAIN}${router.pathname}`}
        />
      </Head>
      <div>
        <div>div</div>
      </div>
    </>
  )
}
