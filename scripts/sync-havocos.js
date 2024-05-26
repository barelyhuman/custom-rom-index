#!/usr/bin/env node

const _got = require('got');

const { conch } = require('@barelyreaper/conch');
const { logcons } = require('logcons');
const kluer = require('kleur');
const { STATUS_ENUM } = require('../db/status_enum');
const { upsertDevice } = require('../lib/sdk');
const info = kluer.cyan().bold;
const success = kluer.green().bold;

const V13_COMMIT =
  'https://api.github.com/repos/Havoc-OS/OTA/contents/gapps?ref=thirteen';
const V12_COMMIT =
  'https://api.github.com/repos/Havoc-OS/OTA/contents/gapps?ref=twelve';
const V11_COMMIT =
  'https://api.github.com/repos/Havoc-OS/OTA/contents/vanilla?ref=eleven';
const V10_COMMIT =
  'https://api.github.com/repos/Havoc-OS/OTA/contents/vanilla?ref=ten';

async function main() {
  await addDevices(V13_COMMIT, 13);
  await addDevices(V12_COMMIT, 12);
  await addDevices(V11_COMMIT, 11);
  await addDevices(V10_COMMIT, 10);
  console.log(success(`${logcons.tick()} Done, Syncing HavocOS`));
}

async function addDevices(commit, version) {
  const { parse } = JSON;
  const response = await got(commit);
  const devices = parse(response.body);

  await conch(devices, item => addHavocOSToDevices(item, version), {
    limit: 1,
  });
  console.log(
    info(`${logcons.info()} Synced: ${Number(version).toFixed(1)} Havoc OS`)
  );
}

async function addHavocOSToDevices(item, version) {
  const { parse } = JSON;
  const deviceBlob = await got(item.url);
  const fileContent = Buffer.from(
    parse(deviceBlob.body).content,
    'base64'
  ).toString('utf8');

  if (!fileContent) return true;

  let parsedFileData;
  try {
    parsedFileData = parse(fileContent);
  } catch (_) {
    parsedFileData = false;
  }

  if (!parsedFileData) return true;

  const deviceData =
    (parsedFileData.response && parsedFileData.response[0]) || false;

  if (!deviceData) return true;

  const codename = deviceData.codename;
  await upsertDevice({
    deviceName: deviceData.name,
    codename,
    rom: {
      status: STATUS_ENUM.active,
      androidVersion: [version],
      links: [deviceData.url],
      name: 'HavocOS',
    },
  });
}

function got(url) {
  return _got(url, {
    headers: {
      Authorization: `token ${process.env.GH_TOKEN}`,
    },
  });
}

exports.syncHavocOS = main;

if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}
