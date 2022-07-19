#!/usr/bin/env node

const got = require('got');

const kluer = require('kleur');
const { findOrCreate } = require('lib/sdk');
const { logcons } = require('logcons');
const { STATUS_ENUM } = require('../db/status_enum');

const success = kluer.green().bold;

const URL =
  'https://raw.githubusercontent.com/AospExtended/official_devices/main/devices.json';

async function main() {
  const response = await got(URL);

  const promises = (JSON.parse(response.body) || []).map(async deviceItem => {
    const codename = deviceItem.codename;
    const deviceName = `${deviceItem.brand} ${deviceItem.name}`;

    const _internalPromises = (deviceItem.supported_versions || []).map(
      async device => {
        if (device.version_code !== 'q' && device.version_code !== 'r') return;

        let version;
        if (device.version_code === 'q') version = 10;

        if (device.version_code === 'r') version = 11;

        await findOrCreate({
          deviceName,
          codename,
          rom: {
            status: STATUS_ENUM.active,
            androidVersion: [version],
            links: [device.xda_thread],
            name: 'AospExtended',
          },
        });
      }
    );

    await Promise.all(_internalPromises);
  });

  await Promise.all(promises);

  console.log(success(`${logcons.tick()} Done, Syncing AOSPExtended`));
}

exports.syncAospExtended = main;

if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}
