import { AppProps } from "next/app"
import { ThemeProvider } from "next-themes"
import install from "@twind/with-next/app"
import { Inter } from "@next/font/google"
import { Header } from "@/components/Header"
import styleConfig from "@/utils/style"
const inter = Inter({ subsets: ["latin"] })

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <ThemeProvider attribute="class" storageKey="theme" enableSystem>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default install(styleConfig, App)
