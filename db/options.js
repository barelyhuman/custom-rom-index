export const options = {
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

export const findInOptions = (identifier, value) => {
  let opt;
  Object.entries(options).forEach(([k, v]) => {
    if (k !== identifier) return;
    Object.entries(v).forEach(([k1, v1]) => {
      if (v1.value !== value) return;
      opt = v[k1];
    });
  });

  if (!opt) return null;

  return opt;
};
