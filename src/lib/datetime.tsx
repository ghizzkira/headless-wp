import { formatDistance } from "date-fns"

export function formatDate(date: string | number | Date) {
  return formatDistance(new Date(date), new Date(), {
    addSuffix: true,
  })
}

/**
 * sortObjectsByDate
 */
export function sortObjectsByDate(array: any[], { key = "date" } = {}) {
  return array.sort((a, b) => +new Date(b[key]) - +new Date(a[key]))
}
