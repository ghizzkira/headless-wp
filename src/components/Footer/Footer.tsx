import env from "@/env"
import NextLink from "next/link"
import NextImage from "next/image"
export const Footer = (props) => {
  const { className } = props
  return (
    <footer className={`${className} flex flex-col mt-12`}>
      <div className="border-t min-h-[120px] flex border-gray-100">
        <NextLink className="w-full pl-4 self-center" href={env.DOMAIN}>
          <NextImage
            className="site-logo"
            height={32}
            width={120}
            alt={env.SITE_TITLE}
            src={env.LOGO_URL}
            srcSet={env.LOGO_SRC_SET}
          />
        </NextLink>
      </div>
      <div className="border-t border-gray-100 flex min-h-[60px]">
        <div className="pl-4 w-full self-center">
          {"© 2023 Gamedaim - Everlasting Gaming Knowledge"}
        </div>
      </div>
    </footer>
  )
}
