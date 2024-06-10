export const addHours = (date, h) => {
  if (typeof date === 'object') {
    date.setHours(date.getHours() + h)
    return date
  } else {
    const newDate = new Date(date)
    newDate.setHours(newDate.getHours() + h)
    return newDate
  }
}
