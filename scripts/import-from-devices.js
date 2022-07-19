#!/usr/bin/env node

const { options } = require('../db/options');
const { db } = require('../db/db');
const { readFileSync } = require('fs');
const { resolve, join } = require('path');
const { dateStringToDate } = require('../lib/date-utils');

async function insertROMS(devices) {
  const romsToCreate = new Set();
  devices.forEach(x => {
    if (x.rom.androidVersion && x.rom.androidVersion.length) {
      x.rom.androidVersion.forEach(version => {
        if (version && version !== 'N/A')
          romsToCreate.add(x.rom.name + '---' + version);
        else romsToCreate.add(x.rom.name);
      });
    } else {
      romsToCreate.add(x.rom.name);
    }
  });
  const uniqueRoms = Object.values(
    Object.fromEntries(romsToCreate.entries())
  ).map(k => {
    const ks = k.split('---');
    return {
      name: ks[0],
      android_version: ks[1] || undefined,
    };
  });

  await db.batchInsert('roms', uniqueRoms, 10).returning('id');
}

async function insertDevices(devices) {
  const devicesToCreate = [];
  const mappingsToCreate = [];
  const promises = devices.map(async device => {
    const basename = device.deviceName;
    const codename = device.codename;
    const releasedOn =
      typeof device.releasedOn === 'string' ||
      typeof device.releasedOn === 'number'
        ? dateStringToDate(device.releasedOn)
        : null;
    const version =
      device.rom.androidVersion && device.rom.androidVersion.length
        ? device.rom.androidVersion[0] || null
        : null;

    const status =
      (options.STATUS[device.rom.status.toLowerCase()] &&
        options.STATUS[device.rom.status.toLowerCase()].value) ||
      options.STATUS.unknown.value;

    const rom = await db('roms')
      .where({
        name: device.rom.name,
        android_version: version,
      })
      .first()
      .select('id');

    const insertedDevice = await db('devices')
      .insert({
        basename,
        codename,
        released_on: new Date(releasedOn),
      })
      .returning(['id']);

    if (rom && insertDevices.length) {
      await db('roms_devices_mapping').insert({
        device_id: insertedDevice[0].id,
        rom_id: rom.id,
        status,
      });
    }

    return true;
  });

  await Promise.all(promises);
  await db.batchInsert('devices', devicesToCreate, 10).returning('id');
  await db
    .batchInsert('roms_devices_mapping', mappingsToCreate, 10)
    .returning('id');
}

async function importFromDevicesJSON() {
  const deviceJson = resolve(join(__dirname, '..', 'db', 'devices.json'));
  let baseData = readFileSync(deviceJson, 'utf-8');
  baseData = JSON.parse(baseData);

  await insertROMS(baseData.devices);
  await insertDevices(baseData.devices);
}

exports.importFromDevicesJSON = importFromDevicesJSON;

if (require.main === module) {
  importFromDevicesJSON()
    .then(x => process.exit(0))
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}
