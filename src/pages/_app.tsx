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
        html {
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
