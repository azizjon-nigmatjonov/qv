export const getSearchParams = (searchParams) => {
  return Object.entries(searchParams)
    .map((param) => param.join('=') + '&')
    .join('')
}
