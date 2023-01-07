import React from "react"
import { Button, useDisclosure } from "@/ui"
import Link from "next/link"

export const Header = (props) => {
  const { isOpen, onToggle } = useDisclosure()

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
                <div class="space-y-1" onClick={onToggle}>
                  <div class="w-5 h-0.5 bg-gray-600"></div>
                  <div class="w-5 h-0.5 bg-gray-600"></div>
                  <div class="w-5 h-0.5 bg-gray-600"></div>
                </div>
              </div>
              <div className="flex-grow-0 flex-shrink-0 flex flex-col pl-4 pr-4 max-w-full min-w-0 basis-auto">
                <div className="pr-0 pl-0 items-center justify-start w-full flex flex-wrap flex-row">
                  <div className="ak-bar-item ak-header-logo pr-0 pl-0 items-center justify-start w-full flex flex-wrap flex-row">
                    <h1 className="logo-image m-0 p-0 leading-none font-bold text-4xl	">
                      <a href="https://wowkia.com/">
                        <img
                          className="site-logo"
                          height={32}
                          width={120}
                          alt="Wowkia.com"
                          src="https://wowkia.com/wp-content/uploads/2019/01/Wowkia-2019-v2-Menu-Logo-min.png"
                          srcSet="https://wowkia.com/wp-content/uploads/2019/01/Wowkia-2019-v2-Menu-Logo-min.png 1x, https://wowkia.com/wp-content/uploads/2019/03/Wowkia-Retina-Logo-min.png 2x"
                        />
                      </a>
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
          isOpen ? "translate-y-full" : "translate-y-0"
        } border-r border-gray-100 bg-white z-20 fixed mt-20 top-0 overflow-x-auto h-full flex flex-row bg-gray-100 w-[250px] scrollbar`}
      >
        <nav class="flex flex-col w-56 relative">
          <ul class="flex flex-col py-4">
            {listCategory.map((e) => {
              return (
                <li>
                  <a
                    href="#"
                    class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
                  >
                    <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                      <i class="bx bx-home"></i>
                    </span>
                    <span class="text-sm font-medium">{e.name}</span>
                  </a>
                </li>
              )
            })}
            {listCategory.map((e) => {
              return (
                <li>
                  <a
                    href="#"
                    class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
                  >
                    <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                      <i class="bx bx-home"></i>
                    </span>
                    <span class="text-sm font-medium">{e.name}</span>
                  </a>
                </li>
              )
            })}
            {listCategory.map((e) => {
              return (
                <li>
                  <a
                    href="#"
                    class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
                  >
                    <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                      <i class="bx bx-home"></i>
                    </span>
                    <span class="text-sm font-medium">{e.name}</span>
                  </a>
                </li>
              )
            })}
            {listCategory.map((e) => {
              return (
                <li>
                  <a
                    href="#"
                    class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
                  >
                    <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                      <i class="bx bx-home"></i>
                    </span>
                    <span class="text-sm font-medium">{e.name}</span>
                  </a>
                </li>
              )
            })}
            {listCategory.map((e) => {
              return (
                <li>
                  <a
                    href="#"
                    class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
                  >
                    <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                      <i class="bx bx-home"></i>
                    </span>
                    <span class="text-sm font-medium">{e.name}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
      <div
        id="container"
        className={`flex mt-20 ${isOpen ? "pl-0" : "pl-[250px]"}`}
      >
        {children}
      </div>
    </>
  )
}
