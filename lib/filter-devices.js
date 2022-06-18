import { normaliseSearchableString } from './search-utils';

export function filterDevices(device, searchTerm) {
  const normalisedSearchTerm = searchTerm.toLowerCase();

  const deviceNamesToSearch = [];
  const codeNamesToSearch = [];
  const romNamesToSearch = [];
  const versionsToSearch = [];

  // TODO: split into readable logic for the filteration and matching
  // TODO: remove x number of loops and reduce to 2 loops max.

  searchTerm.split(',').forEach(item => {
    const deviceSplit = item.split('device:');
    const codenameSplit = item.split('codename:');
    const romSplit = item.split('rom:');
    const versionSplit = item.split('version:');

    if (deviceSplit.length >= 2 && normaliseSearchableString(deviceSplit[1])) {
      const _term = normaliseSearchableString(deviceSplit[1]);
      _term && deviceNamesToSearch.push(_term);
    }
    if (
      codenameSplit.length >= 2 &&
      normaliseSearchableString(codenameSplit[1])
    ) {
      const _term = normaliseSearchableString(codenameSplit[1]);
      _term && codeNamesToSearch.push(_term);
    }
    if (romSplit.length >= 2 && normaliseSearchableString(romSplit[1])) {
      const _term = normaliseSearchableString(romSplit[1]);
      _term && romNamesToSearch.push(_term);
    }

    if (
      versionSplit.length >= 2 &&
      normaliseSearchableString(versionSplit[1])
    ) {
      const _term = normaliseSearchableString(versionSplit[1]);
      _term && versionsToSearch.push(_term);
    }
  });

  const matchState = [];

  if (deviceNamesToSearch.length) {
    matchState.push(
      !!deviceNamesToSearch.filter(item =>
        normaliseSearchableString(device.deviceName).includes(item)
      ).length
    );
  }

  if (codeNamesToSearch.length) {
    matchState.push(
      !!codeNamesToSearch.filter(item =>
        normaliseSearchableString(device.codename).toLowerCase().includes(item)
      ).length
    );
  }
  if (romNamesToSearch.length) {
    matchState.push(
      !!romNamesToSearch.filter(item =>
        normaliseSearchableString(device.rom.name).toLowerCase().includes(item)
      ).length
    );
  }

  if (versionsToSearch.length) {
    matchState.push(
      !!versionsToSearch.filter(item => {
        return device.rom.androidVersion.indexOf(Number(item)) > -1;
      }).length
    );
  }

  if (
    deviceNamesToSearch.length ||
    codeNamesToSearch.length ||
    romNamesToSearch.length ||
    versionsToSearch.length
  )
    return !(matchState.indexOf(false) > -1);

  return (
    device.deviceName.toLowerCase().includes(normalisedSearchTerm) ||
    device.codename.toLowerCase().includes(normalisedSearchTerm) ||
    device.rom.name.toLowerCase().includes(normalisedSearchTerm)
  );
}
