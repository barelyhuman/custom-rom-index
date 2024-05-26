#!/usr/bin/env node
const _got = require('got');
const kluer = require('kleur');
const { logcons } = require('logcons');
const { STATUS_ENUM } = require('../db/status_enum');
const { upsertDevice } = require('../lib/sdk');
const { parse } = require('yaml');
const { dateStringToDate } = require('../lib/date-utils');

const success = kluer.green().bold;

const versionMap = {
  '13.0': 6,
  '14.1': 7.1,
  '15.1': 8.1,
  '16.0': 9,
  '17.1': 10,
  '18.1': 11,
  '19.1': 12,
  '20': 13,
  '21': 14,
};

const URL =
  'https://raw.githubusercontent.com/LineageOS/hudson/main/updater/devices.json';

const getDeviceDetailsUrl = deviceId =>
  `https://ungh.cc/repos/LineageOS/lineage_wiki/files/main/_data/devices/${deviceId}`;
const getAllDevices = async () => {
  const data = await _got(
    'https://ungh.cc/repos/LineageOS/lineage_wiki/files/main'
  ).json();

  const devicePromises = data.files
    .filter(d => {
      return d.path.startsWith('_data/devices');
    })
    .map(async d => {
      const [_, _a, name] = d.path.split('/');

      const deviceDetails = (await got(getDeviceDetailsUrl(name)).json()).file
        .contents;
      const parsedDetails = parse(deviceDetails);
      const codename = name.replace(/_variant(\d+)/, '').replace(/.yml$/, '');
      let releaseDate = '';
      if (typeof parsedDetails.release === 'object') {
        // const [firstKey] = Object.keys(parsedDetails.release);
        // releaseDate = dateStringToDate(parsedDetails.release[firstKey]);
      } else {
        releaseDate = dateStringToDate(parsedDetails.release);
      }

      const versions = (parsedDetails.versions ?? []).map(d => {
        return versionMap[d] ?? 'N/A';
      });
      return {
        codename,
        release: releaseDate,
        versions,
      };
    });

  const result = await Promise.all(devicePromises);
  return result.reduce((acc, item) => {
    acc[item.codename] = item;
    return acc;
  }, {});
};

async function main() {
  const deviceDetails = await getAllDevices();

  const response = await got(URL);

  const promises = (JSON.parse(response.body) || []).map(async deviceItem => {
    const codename = deviceItem.model;
    const details = deviceDetails[codename];
    const deviceName = `${deviceItem.oem} ${deviceItem.name}`;

    await upsertDevice({
      deviceName,
      codename,
      rom: {
        status: STATUS_ENUM.unknown,
        androidVersion: details?.versions || ['N/A'],
        links: [`https://download.lineageos.org/${codename}`],
        name: 'LineageOS',
      },
    });
  });

  await Promise.all(promises);

  console.log(success(`${logcons.tick()} Done, Syncing Lineage OS`));
}

function got(url) {
  return _got(url, {
    headers: {
      Authorization: `Bearer ${process.env.GH_TOKEN}`,
    },
  });
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
