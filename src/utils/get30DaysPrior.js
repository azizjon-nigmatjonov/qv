const get30DaysPrior = () => {
  let now = new Date()
  const backdate = new Date(now.setDate(now.getDate() - 30))
  return backdate
}

export default get30DaysPrior
