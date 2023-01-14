import { formatDistance } from "date-fns"

function formatDate(date: any) {
  return formatDistance(new Date(date), new Date(), {
    addSuffix: true,
  })
}

function sortObjectsByDate(array: any[], { key = "date" } = {}) {
  return array.sort((a, b) => +new Date(b[key]) - +new Date(a[key]))
}

export { formatDate, sortObjectsByDate }
