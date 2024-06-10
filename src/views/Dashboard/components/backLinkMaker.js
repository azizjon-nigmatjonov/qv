import { createSearchParams } from 'react-router-dom'

export function backLinkMaker({ searchParams, type, section }) {
  let params = Object.fromEntries([...searchParams])
  let backlink = ''
  if (params?.districtId) {
    const { districtId, ...rest } = params
    backlink = { pathname: `/dashboard-republic/${type}/${section}`, search: `?${createSearchParams(rest)}` }
  } else if (params?.regionId && !params?.districtId) {
    const { regionId, districtId, ...rest } = params
    backlink = { pathname: `/dashboard-republic/${type}/${section}`, search: `?${createSearchParams(rest)}` }
  } else if (!params?.regionId && !params?.districtId) {
    const { ...rest } = params
    backlink = { pathname: `/dashboard-republic`, search: `?${createSearchParams(rest)}` }
  }
  return backlink
}
