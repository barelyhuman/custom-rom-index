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

export function sortByDate (dateOne, dateTwo, direction) {
  if (!dateOne) {
    return 1
  }

  if (!dateTwo) {
    return -1
  }

  const firstDate = getAsDate(dateOne).getTime()
  const secondDate = getAsDate(dateTwo).getTime()

  return direction === 1 ? firstDate - secondDate : secondDate - firstDate
}

function getAsDate (dateItem) {
  if (typeof dateItem === 'string' || typeof dateItem === 'number') {
    return dateStringToDate('' + dateItem)
  }

  if (Array.isArray(dateItem)) {
    let selectedDate
    dateItem.forEach((item) => {
      Object.keys(item).forEach((key) => {
        const date = dateStringToDate('' + item[key])
        if (!selectedDate) {
          selectedDate = date
          return
        }
        if (selectedDate.getTime() < date.getTime()) {
          selectedDate = date
        }
      })
    })
    return selectedDate
  }
}

// Expected format is year-month-date
function dateStringToDate (dateStr) {
  const dateSplits = dateStr.split('-')
  return new Date(dateSplits[0], dateSplits[1] || 1, dateSplits[2] || 1)
}
