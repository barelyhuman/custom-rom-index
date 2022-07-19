#!/usr/bin/env node

const { addDevice } = require('../db/db');
const got = require('got');
const { STATUS_ENUM } = require('../db/status_enum');
const kluer = require('kleur');
const { logcons } = require('logcons');
const { upsertDevice } = require('../lib/sdk');

const success = kluer.green().bold;

const URL = 'https://api.aospa.co/devices';

async function main() {
  const response = await got(URL);
  const deviceList = JSON.parse(response.body);

  const promises = deviceList.devices.map(async deviceItem => {
    await upsertDevice({
      deviceName: deviceItem.manufacturer + deviceItem.description,
      codename: deviceItem.name,
      rom: {
        name: 'Paranoid Android',
        status: STATUS_ENUM.unknown,
        links: [`https://aospa.co/downloads/${deviceItem.name}`],
      },
    });
  });

  await Promise.all(promises);

  console.log(
    success(`${logcons.tick()} Done, Syncing AOSPA - Paranoid Android...`)
  );
}

exports.syncParanoidAndroid = main;

if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}
