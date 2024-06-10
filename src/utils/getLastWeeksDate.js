const getLastWeeksDate = () => {
  const now = new Date()

  return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)
}

export default getLastWeeksDate
