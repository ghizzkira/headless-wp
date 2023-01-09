import * as React from "react"
import { useDisclosure } from "@/ui"
import env from "@/env"
import NextLink from "next/link"
import NextImage from "next/image"
import { Footer } from "@/components/Footer"
import { wpGetPrimaryMenus } from "@/lib/wp-menus"
interface HeaderProps {
  children: React.ReactNode
}

export const Header = React.forwardRef<HTMLDivElement, HeaderProps>((props) => {
  const { isOpen, onToggle } = useDisclosure()
  const [primaryMenus, setPrimaryMenus] = React.useState(null)
  React.useEffect(() => {
    async function menus() {
      const { menu } = await wpGetPrimaryMenus()
      setPrimaryMenus(menu)
      console.log(primaryMenus)
    }
    menus()
  }, [])

  const { children } = props
  const listCategory = [
    {
      name: "Movies",
      url: "movies",
    },
    {
      name: "Games",
      url: "movies",
    },
    {
      name: "News",
      url: "movies",
    },
    {
      name: "Otaku",
      url: "movies",
    },
  ]
  return (
    <>
      <header className="box-border p-0 border-none bg-white outline-none align-baseline flex items-center -my-0 mx-auto fixed top-0 left-auto w-full opacity-1 h-16 shadow-lg shadow-black-500/40 z-[99]">
        <div className="grow pr-4 pl-4 mr-auto ml-auto">
          <div className="ak-bar-inner relative h-full">
            <div className="ak-row ak-row-items-middle flex-nowrap flex-row items-center flex justify-start h-full -ml-4 -mr-4">
              <div id="drawer" className="mx-2">
                <div className="space-y-1" onClick={onToggle}>
                  <div className="w-5 h-0.5 bg-gray-600"></div>
                  <div className="w-5 h-0.5 bg-gray-600"></div>
                  <div className="w-5 h-0.5 bg-gray-600"></div>
                </div>
              </div>
              <div className="flex-grow-0 flex-shrink-0 flex flex-col pl-4 pr-4 max-w-full min-w-0 basis-auto">
                <div className="pr-0 pl-0 items-center justify-start w-full flex flex-wrap flex-row">
                  <div className="ak-bar-item ak-header-logo pr-0 pl-0 items-center justify-start w-full flex flex-wrap flex-row">
                    <h1 className="logo-image m-0 p-0 leading-none font-bold text-4xl	">
                      <NextLink href={env.DOMAIN}>
                        <NextImage
                          className="site-logo"
                          height={32}
                          width={120}
                          alt={env.SITE_TITLE}
                          src={env.LOGO_URL}
                          srcSet={env.LOGO_SRC_SET}
                        />
                      </NextLink>
                    </h1>
                  </div>
                </div>
              </div>
              <div className="grow-1"></div>
            </div>
          </div>
        </div>
      </header>
      <div
        className={`${
          isOpen ? "-translate-x-full" : "translate-x-0"
        } transition ease-in-out delay-150 border-r border-gray-100 bg-white z-20 fixed pt-20 top-0 overflow-x-auto h-full flex flex-row bg-gray-100 w-[250px] scrollbar`}
      >
        <nav className="flex w-full flex-col w-56 relative">
          <ul className="flex flex-col py-4 border-b border-gray-100">
            {primaryMenus?.map((e) => {
              const fullUrl = e.url.includes(env.DOMAIN)
              let slicedUrl
              if (fullUrl) {
                slicedUrl = e.url.slice(env.DOMAIN.length + 1)
              }

              return (
                <li key={e.label}>
                  <NextLink
                    href={fullUrl ? slicedUrl : e.url}
                    className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
                  >
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                      <i className="bx bx-home"></i>
                    </span>
                    <span className="text-sm font-medium">{e.label}</span>
                  </NextLink>
                </li>
              )
            })}
          </ul>
          <ul className="flex flex-col py-4 border-b border-gray-100">
            {listCategory.map((e) => {
              return (
                <li>
                  <a
                    href="#"
                    className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
                  >
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                      <i className="bx bx-home"></i>
                    </span>
                    <span className="text-sm font-medium">{e.name}</span>
                  </a>
                </li>
              )
            })}
            {listCategory.map((e) => {
              return (
                <li>
                  <a
                    href="#"
                    className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
                  >
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                      <i className="bx bx-home"></i>
                    </span>
                    <span className="text-sm font-medium">{e.name}</span>
                  </a>
                </li>
              )
            })}
            {listCategory.map((e) => {
              return (
                <li>
                  <a
                    href="#"
                    className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
                  >
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                      <i className="bx bx-home"></i>
                    </span>
                    <span className="text-sm font-medium">{e.name}</span>
                  </a>
                </li>
              )
            })}
            {listCategory.map((e) => {
              return (
                <li>
                  <a
                    href="#"
                    className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
                  >
                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                      <i className="bx bx-home"></i>
                    </span>
                    <span className="text-sm font-medium">{e.name}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
      <div
        id="container"
        className={`flex mt-20 ${
          isOpen ? "pl-0" : "pl-[250px]"
        } transition-[padding] ease-in-out delay-150`}
      >
        {children}
      </div>
      <Footer className={`${isOpen ? "pl-0" : "pl-[250px]"}`} />
    </>
  )
})
