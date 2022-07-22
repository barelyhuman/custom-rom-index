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
  'December',
];

// Expected format is year-month-date
function releaseDateFormatter(dateToFormat) {
  if (!dateToFormat) return false;

  const date = dateStringToDate(dateToFormat);
  const dateString = `${MONTHS_MAP[date.getMonth()]}, ${date.getFullYear()}`;

  return dateString;
}

function sortByDate(dateOne, dateTwo, direction) {
  if (!dateOne) return 1;

  if (!dateTwo) return -1;

  const firstDate = getAsDate(dateOne).getTime();
  const secondDate = getAsDate(dateTwo).getTime();

  return direction === 1 ? firstDate - secondDate : secondDate - firstDate;
}

function getAsDate(dateItem) {
  if (typeof dateItem === 'string' || typeof dateItem === 'number')
    return dateStringToDate('' + dateItem);

  if (Array.isArray(dateItem)) {
    let selectedDate;
    dateItem.forEach(item => {
      Object.keys(item).forEach(key => {
        const date = dateStringToDate('' + item[key]);
        if (!selectedDate) {
          selectedDate = date;
          return;
        }
        if (selectedDate.getTime() < date.getTime()) selectedDate = date;
      });
    });
    return selectedDate;
  }
}

// Expected format is year-month-date
function dateStringToDate(dateStr) {
  if (typeof dateStr !== 'number' && typeof dateStr !== 'string') {
    console.log({ dateStr });
    throw new Error(`Invalid dateStr: ${dateStr}`);
  }

  if (typeof dateStr === 'number') dateStr = '' + dateStr;

  const dateSplits = dateStr.split('-');
  return new Date(dateSplits[0], dateSplits[1] || 1, dateSplits[2] || 1);
}

function getReleasedOn(releasedOn) {
  if (!releasedOn) return null;

  if (Array.isArray(releasedOn)) {
    let _date;
    for (let i = 0; releasedOn.length; i += 1) {
      const item = releasedOn[i];
      Object.keys(item).map(key => {
        _date = dateStringToDate(String(item[key]));
      });
      break;
    }
    return _date;
  }

  // return multiRelease.join(' | ');

  if (typeof releasedOn === 'string')
    return dateStringToDate(String(releasedOn));

  if (typeof releasedOn === 'number') {
    const _date = new Date();
    _date.setDate(1);
    _date.setMonth(0);
    _date.setFullYear(releasedOn);
    return _date;
  }
}

module.exports = {
  releaseDateFormatter,
  getReleasedOn,
  dateStringToDate,
  sortByDate,
};
