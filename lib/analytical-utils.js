import { db } from 'db';
import { options } from 'db/options';

export async function totalDevices() {
  const groupedByCodename = await db('devices').count('id').first();
  return groupedByCodename['count(`id`)'];
}

export async function totalRoms() {
  const allRoms = await db('roms_devices_mapping').count('id').first();
  return allRoms['count(`id`)'];
}

export async function totalActiveRoms() {
  const activeRoms = await db('roms_devices_mapping')
    .where({
      status: options.STATUS.active.value,
    })
    .count('id')
    .first();
  return activeRoms['count(`id`)'];
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
