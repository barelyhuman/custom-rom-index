const { options } = require('../db/options');
const { db } = require('../db/db');

async function upsertDevice(data) {
  let trx;
  try {
    const codename = data.codename;
    trx = await db.transaction();
    let deviceDetails = await trx('devices')
      .where({
        codename,
      })
      .first();

    if (!deviceDetails) {
      deviceDetails = (
        await trx('devices')
          .insert({
            basename: data.deviceName,
            codename,
          })
          .returning('id')
      )[0];
    }

    const version =
      data.rom.androidVersion &&
      data.rom.androidVersion.length &&
      data.rom.androidVersion[0] !== 'N/A'
        ? data.rom.androidVersion[0] || null
        : null;

    let romDetails = await trx('roms')
      .where({
        name: data.rom.name,
        android_version: version,
      })
      .first();

    if (!romDetails) {
      romDetails = (
        await trx('roms')
          .insert({
            name: data.rom.name,
            android_version: version,
          })
          .returning('id')
      )[0];
    }

    const hasMapping = await trx('roms_devices_mapping')
      .where({
        device_id: deviceDetails.id,
        rom_id: romDetails.id,
      })
      .first();

    if (!hasMapping) {
      await trx('roms_devices_mapping').insert({
        device_id: deviceDetails.id,
        rom_id: romDetails.id,
        status:
          (options.STATUS[data.rom.status.toLowerCase()] &&
            options.STATUS[data.rom.status.toLowerCase()].value) ||
          options.STATUS.unknown.value,
      });
    }
    await trx.commit();
  } catch (err) {
    console.error(err);
    trx && (await trx.rollback());
    throw err;
  }
}

const getDevices = async () => {
  const devices = await db('devices')
    .leftJoin(
      'roms_devices_mapping',
      'roms_devices_mapping.device_id',
      'devices.id'
    )
    .leftJoin('roms', 'roms.id', 'roms_devices_mapping.rom_id');
  return devices;
};

module.exports = { upsertDevice, getDevices };
