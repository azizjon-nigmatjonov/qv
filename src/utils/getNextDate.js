const getNextDate = (date = new Date()) => {
  const nextDay = new Date(date)
  nextDay.setDate(date.getDate() + 1)
  return nextDay
}

export default getNextDate
