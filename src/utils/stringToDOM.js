export const stringToDOM = (str = '', tag = 'a') => {
  const parser = new DOMParser()
  const html = parser.parseFromString(str, 'text/html')

  return html?.body?.querySelector(tag)
}
