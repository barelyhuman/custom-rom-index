#!/usr/bin/env node
const { addDevice, devices } = require('../db/db');
const got = require('got');
const { generateDevices } = require('./generate-devices');
const kluer = require('kleur');
const { logcons } = require('logcons');
const { STATUS_ENUM } = require('../db/status_enum');
const { findOrCreate } = require('../lib/sdk');

const success = kluer.green().bold;

const URL =
  'https://raw.githubusercontent.com/PixysOS/official_devices/master/devices.json';

async function main() {
  const response = await got(URL);

  const promises = (JSON.parse(response.body) || []).map(async deviceItem => {
    const codename = deviceItem.codename;
    const deviceName = `${deviceItem.brand} ${deviceItem.name}`;

    const _internalPromises = (deviceItem.supported_bases || []).map(
      async versionDef => {
        const version =
          (versionDef.name === 'ten' && 10) ||
          (versionDef.name === 'eleven' && 11);
        await findOrCreate({
          deviceName,
          codename,
          rom: {
            status: STATUS_ENUM.active,
            androidVersion: [version],
            links: [versionDef.xda_thread],
            name: 'Pixys OS',
          },
        });
      }
    );

    await Promise.all(_internalPromises);
  });

  await Promise.all(promises);

  console.log(success(`${logcons.tick()} Done, Syncing PixysOS`));
}

exports.syncPixysOS = main;

if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}
