import { STATUS_ENUM } from 'db/status_enum';
import devicesJSON from 'db/devices.json';

const { devices } = devicesJSON;

export function totalDevices() {
  const groupedByCodename = devices.reduce((acc, deviceItem) => {
    (acc[deviceItem.codename] || (acc[deviceItem.codename] = [])).push(
      deviceItem
    );
    return acc;
  }, {});

  return Object.keys(groupedByCodename).length;
}

export function totalRoms() {
  return devices.reduce((acc, item) => {
    // TODO: group by codename
    return acc + 1;
  }, 0);
}

export function totalActiveRoms() {
  return devices.reduce((acc, item) => {
    if (item.rom.status === STATUS_ENUM.active) return acc + 1;

    return acc;
  }, 0);
}

export function topDevicesInROMCount() {
  const groupedByCodename = devices.reduce((acc, deviceItem) => {
    (acc[deviceItem.codename] || (acc[deviceItem.codename] = [])).push(
      deviceItem
    );
    return acc;
  }, {});

  const sortByHighestFirst = Object.keys(groupedByCodename).sort(
    (x, y) => groupedByCodename[y].length - groupedByCodename[x].length
  );

  return sortByHighestFirst.slice(0, 10).map(item => {
    return {
      name: groupedByCodename[item][0].deviceName,
      count: groupedByCodename[item].length,
      releasedOn: groupedByCodename[item][0].releasedOn,
    };
  });
}

export const totalUniqueRoms = () => {
  const roms = new Set();
  devices.forEach(i => {
    roms.add(i.rom.name);
  });
  return roms.size;
};
