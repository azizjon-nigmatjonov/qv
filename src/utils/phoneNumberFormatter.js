export default function (str) {
  if (str) {
    const modified = str.includes('+') ? str : '+' + str
    const countryCode = modified.slice(0, 4)
    const code = modified.slice(4, 6)
    const triple = modified.slice(6, 9)
    const double1 = modified.slice(9, 11)
    const double2 = modified.slice(11, 13)
    return `${countryCode} (${code}) ${triple}-${double1}-${double2}`
  }
}
