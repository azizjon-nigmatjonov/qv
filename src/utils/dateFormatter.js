const dateFormatter = (formatFunc, value, format = 'dd-MM-yyy', withHours = false) => {
  if (typeof value === 'string') value = new Date(value)

  if (Object.prototype.toString.call(value) === '[object Date]') {
    // it is a date
    if (isNaN(value)) {
      // date object is not valid
      // console.log('date object not is valid')
    } else {
      // date object is valid
      const dt = new Date(value)
      const dtDateOnly = new Date(dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000)
      return withHours ? formatFunc(dtDateOnly, `${format} HH:mm`) : formatFunc(dtDateOnly, format)
    }
  } else {
    // not a date object
    // console.log('not a date object')
  }
}

export default dateFormatter
