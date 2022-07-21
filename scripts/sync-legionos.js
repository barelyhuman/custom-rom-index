#!/usr/bin/env node
const got = require('got');
const kluer = require('kleur');
const { logcons } = require('logcons');
const { STATUS_ENUM } = require('../db/status_enum');
const { upsertDevice } = require('../lib/sdk');

const success = kluer.green().bold;

const URL =
  'https://raw.githubusercontent.com/legionos-devices/OTA/11/devices.json';

async function main() {
  const response = await got(URL);

  const promises = (JSON.parse(response.body) || []).map(async deviceItem => {
    const codename = deviceItem.codename;
    const deviceName = `${deviceItem.brand} ${deviceItem.name}`;

    await upsertDevice({
      deviceName,
      codename,
      rom: {
        status: deviceItem.active ? STATUS_ENUM.active : STATUS_ENUM.unknown,
        androidVersion: ['11'],
        links: [deviceItem.xda_thread],
        name: 'LegionOS',
      },
    });
  });

  await Promise.all(promises);

  console.log(success(`${logcons.tick()} Done, Syncing Legion OS`));
}

exports.syncLegionOS = main;

if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}
