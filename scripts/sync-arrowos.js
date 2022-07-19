#!/usr/bin/env node
const got = require('got');
const { findOrCreate } = require('../lib/sdk');

const urlsToSyncV11 = [
  'https://raw.githubusercontent.com/ArrowOS/arrow_ota/master/arrow-11.0_vanilla_builds_unofficial.json',
  'https://raw.githubusercontent.com/ArrowOS/arrow_ota/master/arrow-11.0_vanilla_builds_official.json',
  'https://raw.githubusercontent.com/ArrowOS/arrow_ota/master/arrow-11.0_vanilla_builds_community_unofficial.json',
  'https://raw.githubusercontent.com/ArrowOS/arrow_ota/master/arrow-11.0_vanilla_builds_community.json',
];

const urlsToSyncV10 = [
  'https://raw.githubusercontent.com/ArrowOS/arrow_ota/master/arrow-10.0_vanilla_builds_unofficial.json',
  'https://raw.githubusercontent.com/ArrowOS/arrow_ota/master/arrow-10.0_vanilla_builds_official.json',
  'https://raw.githubusercontent.com/ArrowOS/arrow_ota/master/arrow-10.0_vanilla_builds_community_unofficial.json',
  'https://raw.githubusercontent.com/ArrowOS/arrow_ota/master/arrow-10.0_vanilla_builds_community.json',
];

async function syncArrowOSData(url, version) {
  const response = await got(url);
  const deviceList = JSON.parse(response.body);

  const promises = Object.keys(deviceList).map(async deviceKey => {
    const deviceItems = deviceList[deviceKey];
    const _internalPromises = deviceItems.map(async device => {
      const links = [];
      if (device.filepath) {
        links.push(
          `https://sourceforge.net/projects/arrow-os/files${device.filepath}`
        );
      }

      await findOrCreate({
        deviceName: device.model,
        codename: deviceKey,
        rom: {
          name: `ArrowOS ${device.type ? `(${device.type})` : ''}`,
          androidVersion: [version],
          status: 'active',
          links,
        },
      });
    });

    return Promise.all(_internalPromises);
  });

  await Promise.all(promises);
}

async function main() {
  const syncPromisesV11 = urlsToSyncV11.map(item => syncArrowOSData(item, 11));
  const syncPromisesV10 = urlsToSyncV10.map(item => syncArrowOSData(item, 10));
  await Promise.all([...syncPromisesV11, ...syncPromisesV10]);
}

exports.syncArrowOS = main;

if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}
