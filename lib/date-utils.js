const MONTHS_MAP = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

// Expected format is year-month-date
export function releaseDateFormatter (dateToFormat) {
  const dateSplits = dateToFormat.split('-')
  let dateString = ''

  // if (dateSplits && dateSplits[2]) {
  //   dateString += dateSplits[2]
  // }

  if (dateSplits && dateSplits[1] && MONTHS_MAP[dateSplits[1] - 1]) {
    dateString += ' ' + MONTHS_MAP[dateSplits[1] - 1] + ', '
  }

  if (dateSplits && dateSplits[0]) {
    dateString += dateSplits[0]
  }
  return dateString
}
