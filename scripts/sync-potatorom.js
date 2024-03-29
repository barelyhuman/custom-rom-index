#!/usr/bin/env node
const got = require('got');
const kluer = require('kleur');
const { logcons } = require('logcons');
const { STATUS_ENUM } = require('../db/status_enum');
const { upsertDevice } = require('../lib/sdk');

const success = kluer.green().bold;

const URL =
  'https://raw.githubusercontent.com/PotatoProject/vendor_potato/92e407b1696ac962dbd3ef2acaff8dc560268010/devices.json';

async function main() {
  const response = await got(URL);
  const deviceList = JSON.parse(response.body) || {};
  const promises = Object.keys(deviceList).map(async deviceCodeName => {
    const codename = deviceCodeName;
    const device = deviceList[deviceCodeName];

    await upsertDevice({
      deviceName: '',
      codename,
      rom: {
        status: STATUS_ENUM.active,
        androidVersion: ['N/A'],
        links: [`${device.repo}/releases/latest`],
        name: 'Potato Open Source Project | POSP',
      },
    });
  });

  await Promise.all(promises);

  console.log(success(`${logcons.tick()} Done, Syncing Potato Project`));
}

exports.syncPotatoProject = main;

if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}
