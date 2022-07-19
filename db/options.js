const options = {
  STATUS: {
    unknown: {
      value: 0,
      label: 'Unknown',
      sequence: 0,
    },
    active: {
      value: 1,
      label: 'Active',
      sequence: 1,
    },
    discontinued: {
      value: 2,
      label: 'Discontinued',
      sequence: 2,
    },
  },
};

const findInOptions = (identifier, value) => {
  const opt = Object.entries(options).find(
    ([k, v]) => k === identifier && v.value === value
  );

  if (!opt[1]) return null;

  return opt[1];
};

exports.findInOptions = findInOptions;
exports.options = options;
