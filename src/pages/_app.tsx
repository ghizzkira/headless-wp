import { AppProps } from "next/app"
import { ThemeProvider } from "next-themes"
import install from "@twind/with-next/app"

import styleConfig from "@/utils/style"

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider attribute="class" storageKey="theme" enableSystem>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default install(styleConfig, App)
