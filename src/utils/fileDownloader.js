const fileDownloader = (filename, hasItsOwnLink) => {
  // Create blob link to download
  const link = document.createElement('a')
  link.href = hasItsOwnLink ? filename : `${process.env.REACT_APP_CDN_FILE_URL}${filename}`
  link.setAttribute('download', filename)
  link.setAttribute('target', '_blank')

  // Append to html link element page
  document.body.appendChild(link)

  // Start download
  link.click()

  // Clean up and remove the link
  link.parentNode.removeChild(link)
}

export default fileDownloader
