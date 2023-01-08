import { AppProps } from "next/app"
import { ThemeProvider } from "next-themes"
import install from "@twind/with-next/app"
import { Inter } from "@next/font/google"
import styleConfig from "@/utils/style"
const inter = Inter({ subsets: ["latin"] })

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        body {
          font-family: -apple-system, BlinkMacSystemFont, segoe ui,
            helvetica neue, Arial, noto sans, sans-serif, apple color emoji,
            segoe ui emoji, segoe ui symbol, noto color emoji !important;
        }
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: ${inter.style.fontFamily};
        }
        .scrollbar::-webkit-scrollbar {
          width: 10px;
        }

        .scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .scrollbar::-webkit-scrollbar-thumb {
          background: transparent;
        }

        .scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
        .scrollbar::-webkit-scrollbar-track:hover {
          background: #f1f1f1;
        }
      `}</style>

      <ThemeProvider attribute="class" storageKey="theme" enableSystem>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default install(styleConfig, App)
