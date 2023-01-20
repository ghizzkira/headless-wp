import * as React from "react"

import { useDisclosure } from "@/ui"
import { TopNav, SideNav } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { wpGetPrimaryMenus } from "@/lib/wp-menus"

interface HeaderProps {
  children: React.ReactNode
}

export const HomeLayout = React.forwardRef<HTMLDivElement, HeaderProps>(
  (props, ref) => {
    const { isOpen, onToggle } = useDisclosure()
    const [primaryMenus, setPrimaryMenus] = React.useState<any>(null)
    React.useEffect(() => {
      async function menus() {
        const { menu } = await wpGetPrimaryMenus()
        setPrimaryMenus(menu)
      }
      menus()
    }, [])

    const { children, ...rest } = props

    return (
      <div ref={ref} {...rest}>
        <TopNav onToggle={onToggle} />
        <div>
          <div
            className={`${
              isOpen ? "translate-x-0" : "-translate-x-full"
            } transition ease-in-out delay-150 border-r border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 z-20 fixed pt-20 top-0 overflow-x-auto h-full flex flex-row bg-gray-100 w-[250px] scrollbar`}
          >
            <SideNav primaryMenus={primaryMenus} />
          </div>
          <div
            onClick={onToggle}
            className={`${
              isOpen ? "visible" : "invisible"
            } md:hidden bg-[linear-gradient(180deg,#000,#434343)] z-10 opacity-80 transition-all	 w-full top-0 bottom-0 fixed`}
          />
        </div>

        <div
          id="container"
          className={`flex w-full mt-20 ${
            isOpen ? "md:pl-[250px]" : "md:pl-[0]"
          } transition-[padding] ease-in-out delay-150`}
        >
          {children}
        </div>
        <Footer
          className={`transition-[padding] ease-in-out delay-150 ${
            isOpen ? "md:pl-[250px]" : "md:pl-[0]"
          }`}
        />
      </div>
    )
  },
)
