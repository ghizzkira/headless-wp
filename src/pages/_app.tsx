import { AppProps } from "next/app"
import { ThemeProvider as NextThemeProvider } from "next-themes"
import install from "@twind/with-next/app"
import { Inter } from "@next/font/google"
import styleConfig from "@/utils/style"
const inter = Inter({ subsets: ["latin"] })

function App({ Component, pageProps }: AppProps) {
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

      <NextThemeProvider attribute="class" storageKey="theme" enableSystem>
        <Component {...pageProps} />
      </NextThemeProvider>
    </>
  )
}

export default install(styleConfig, App)
