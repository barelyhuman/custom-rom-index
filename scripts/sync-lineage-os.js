#!/usr/bin/env node
const got = require('got');
const kluer = require('kleur');
const { logcons } = require('logcons');
const { STATUS_ENUM } = require('../db/status_enum');
const { findOrCreate } = require('../lib/sdk');

const success = kluer.green().bold;

const URL =
  'https://raw.githubusercontent.com/LineageOS/hudson/master/updater/devices.json';

async function main() {
  const response = await got(URL);

  const promises = (JSON.parse(response.body) || []).map(async deviceItem => {
    const codename = deviceItem.model;
    const deviceName = `${deviceItem.oem} ${deviceItem.name}`;

    await findOrCreate({
      deviceName,
      codename,
      rom: {
        status: STATUS_ENUM.unknown,
        androidVersion: ['N/A'],
        links: [`https://download.lineageos.org/${codename}`],
        name: 'LineageOS',
      },
    });
  });

  await Promise.all(promises);

  console.log(success(`${logcons.tick()} Done, Syncing Lineage OS`));
}

exports.syncLineageOS = main;

if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}
