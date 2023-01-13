import * as React from "react"
import { useDisclosure } from "@/ui"
import { TopNav, SideNav } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { wpGetPrimaryMenus } from "@/lib/wp-menus"
interface HeaderProps {
  children: React.ReactNode
}

export const Layout = React.forwardRef<HTMLDivElement, HeaderProps>((props) => {
  const { isOpen, onToggle } = useDisclosure()
  const [primaryMenus, setPrimaryMenus] = React.useState<any>(null)
  React.useEffect(() => {
    async function menus() {
      const { menu } = await wpGetPrimaryMenus()
      setPrimaryMenus(menu)
    }
    menus()
  }, [])

  const { children } = props

  return (
    <>
      <TopNav onToggle={onToggle} />
      <div
        className={`${
          isOpen ? "-translate-x-full" : "translate-x-0"
        } transition ease-in-out delay-150 border-r border-gray-100 bg-white z-20 fixed pt-20 top-0 overflow-x-auto h-full flex flex-row bg-gray-100 w-[250px] scrollbar`}
      >
        <SideNav primaryMenus={primaryMenus} />
      </div>
      <div
        id="container"
        className={`flex mt-20 ${
          isOpen ? "pl-0" : "pl-[250px]"
        } transition-[padding] ease-in-out delay-150`}
      >
        {children}
      </div>
      <Footer
        className={`transition-[padding] ease-in-out delay-150 ${
          isOpen ? "pl-0" : "pl-[250px]"
        }`}
      />
    </>
  )
})
