import * as React from "react"
import "nprogress/nprogress.css"
import NProgress from "nprogress"
import { useRouter } from "next/router"
import { AppProps } from "next/app"
import { ThemeProvider as NextThemeProvider } from "next-themes"
import install from "@twind/with-next/app"
import { Inter } from "@next/font/google"
import styleConfig from "@/utils/style"
const inter = Inter({ subsets: ["latin"] })

function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  React.useEffect(() => {
    const handleRouteStart = () => NProgress.start()
    const handleRouteDone = () => NProgress.done()

    router.events.on("routeChangeStart", handleRouteStart)
    router.events.on("routeChangeComplete", handleRouteDone)
    router.events.on("routeChangeError", handleRouteDone)

    return () => {
      // Make sure to remove the event handler on unmount!
      router.events.off("routeChangeStart", handleRouteStart)
      router.events.off("routeChangeComplete", handleRouteDone)
      router.events.off("routeChangeError", handleRouteDone)
    }
  }, [])

  return (
    <>
      <style jsx global>{`
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: ${inter.style.fontFamily};
          font-weight: 600;
        }
      `}</style>
      <NextThemeProvider defaultTheme="system" attribute="class" enableSystem>
        <Component {...pageProps} />
      </NextThemeProvider>
    </>
  )
}

export default install(styleConfig, App)
