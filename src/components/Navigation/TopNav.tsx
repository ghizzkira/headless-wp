import * as React from "react"
import NextLink from "next/link"
import NextImage from "next/image"
import { useTheme } from "next-themes"

import env from "@/env"
import { IconButton, MoonIcon, SunIcon } from "@/ui"

interface TopNavProps {
  onToggle: any
}

export const TopNav = React.forwardRef<HTMLDivElement, TopNavProps>((props) => {
  const { onToggle } = props
  const [mounted, setMounted] = React.useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  React.useEffect(() => setMounted(true), [])

  const switchTheme = () => {
    if (mounted) {
      setTheme(resolvedTheme === "dark" ? "light" : "dark")
    }
  }

  return (
    <header className="box-border p-0 border-none bg-white px-4 outline-none align-baseline flex items-center -my-0 mx-auto fixed top-0 left-auto w-full opacity-1 h-16 shadow-lg shadow-black-500/40 z-[99]">
      <div className="grow pr-4 pl-4 mr-auto ml-auto">
        <div className="ak-bar-inner relative h-full">
          <div className="ak-row ak-row-items-middle flex-nowrap flex-row items-center flex h-full -ml-4 -mr-4">
            <div id="drawer" className="mx-2">
              <div
                className="space-y-[6px] hover:space-y-[3px]"
                onClick={onToggle}
              >
                <div className="w-5 h-0.5 bg-gray-600 transition-[margin] delay-200	"></div>
                <div className="w-5 h-0.5 bg-gray-600 transition-[margin] delay-200	"></div>
                <div className="w-5 h-0.5 bg-gray-600 transition-[margin] delay-200	"></div>
              </div>
            </div>
            <div className="flex-grow-0 flex-shrink-0 flex flex-col pl-4 pr-4 max-w-full min-w-0 basis-auto">
              <div className="pr-0 pl-0 items-center justify-start w-full flex flex-wrap flex-row">
                <div className="ak-bar-item ak-header-logo pr-0 pl-0 items-center justify-start w-full flex flex-wrap flex-row">
                  <h1 className="logo-image m-0 p-0 leading-none font-bold text-4xl	">
                    <NextLink href="/">
                      {mounted &&
                        (resolvedTheme === "light" ? (
                          <NextImage
                            className="site-logo"
                            height={32}
                            width={120}
                            alt={env.SITE_TITLE}
                            src={env.LOGO_URL}
                          />
                        ) : (
                          <div>kontol</div>
                        ))}
                    </NextLink>
                  </h1>
                </div>
              </div>
            </div>
            <div className="grow-1 ml-auto">
              <IconButton
                variant="ghost"
                aria-label="Toggle Dark Mode"
                onClick={switchTheme}
              >
                {mounted &&
                  (resolvedTheme === "light" ? (
                    <MoonIcon className="h-5 w-5" />
                  ) : (
                    <SunIcon className="h-5 w-5" />
                  ))}
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
})
