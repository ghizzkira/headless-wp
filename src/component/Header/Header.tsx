import React from "react"
import { Button } from "@/ui"
import Link from "next/link"

export function Header() {
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
      <header className="box-border p-0 border-none outline-none align-baseline flex items-center -my-0 mx-auto fixed top-0 left-auto w-full opacity-1 h-16 shadow-lg shadow-black-500/40">
        <div className="grow pr-4 pl-4 mr-auto ml-auto">
          <div className="ak-bar-inner relative h-full">
            <div className="ak-row ak-row-items-middle flex-nowrap flex-row items-center flex justify-start h-full -ml-4 -mr-4">
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
              <div className="grow-1">
                {listCategory.map((e) => {
                  return (
                    <Button variant="ghost">
                      <Link href={e.url}>{e.name}</Link>
                    </Button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
