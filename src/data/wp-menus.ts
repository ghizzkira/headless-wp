import env from "@/env"
export const Wp_PrimaryMenus = `query PrimaryMenus {
  menu(id: "${env.MENU_PRIMARY}", idType: NAME) {
    menuItems {
      edges {
        node {
          url
          label
        }
      }
    }
  }
}`
