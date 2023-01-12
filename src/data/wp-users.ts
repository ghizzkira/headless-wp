export const QUERY_WP_ALL_USERS = `
  {
    users(first: 100) {
      edges {
        node {
          avatar {
            height
            width
            url
          }
          description
          id
          name
          roles {
            nodes {
              name
            }
          }
          slug
        }
      }
    }
  }
`
export const QUERY_WP_ALL_USERS_SLUG = `
  {
  users(first: 10) {
    edges {
      node {
        id
        slug
      }     
    }
  }
}
`
export const QUERY_WP_USERS_SEO_BY_ID = `
  query AuthorId($id: ID! ){
    user(id: $id) {
          id
          seo {
            metaDesc
            metaRobotsNofollow
            metaRobotsNoindex
            title
            social {
                  facebook
                  instagram
                  linkedIn
                  mySpace
                  pinterest
                  soundCloud
                  twitter
                  wikipedia
                  youTube
          }
          }
        
    }
  }
`
export const QUERY_WP_USERS_BY_ID = `
  query AuthorId($id: ID!){
    user(id: $id,idType: ID) {
          avatar {
            height
            width
            url
          }
          description
          id
          name
          roles {
            nodes {
              name
            }
          }
          slug
        
    }
  }
`

export const QUERY_WP_ALL_USERS_SEO = `
  {
    users(first: 1000) {
      edges {
        node {
          id
          seo {
            metaDesc
            metaRobotsNofollow
            metaRobotsNoindex
            title
            social {
                  facebook
                  instagram
                  linkedIn
                  mySpace
                  pinterest
                  soundCloud
                  twitter
                  wikipedia
                  youTube
          }
          }
        }
      }
    }
  }
`
