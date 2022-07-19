#!/usr/bin/env node

const _got = require('got');

const conch = require('@barelyreaper/conch');
const { logcons } = require('logcons');
const kluer = require('kleur');
const { STATUS_ENUM } = require('../db/status_enum');
const { findOrCreate } = require('../lib/sdk');
const info = kluer.cyan().bold;
const success = kluer.green().bold;

const V11_COMMIT =
  'https://api.github.com/repos/Havoc-OS/OTA/contents/vanilla?ref=eleven';
const V10_COMMIT =
  'https://api.github.com/repos/Havoc-OS/OTA/contents/vanilla?ref=ten';

async function main() {
  await addV11Devices();
  await addV10Devices();
  console.log(success(`${logcons.tick()} Done, Syncing HavocOS`));
}

async function addV11Devices() {
  const { parse } = JSON;
  const response = await got(V11_COMMIT);
  const devices = parse(response.body);

  await conch(devices, item => addHavocOSToDevices(item, 11), {
    limit: 1,
  });
  console.log(info(`${logcons.info()} Synced: 11.0 Havoc OS`));
}

async function addV10Devices() {
  const { parse } = JSON;
  const response = await got(V10_COMMIT);
  const devices = parse(response.body);

  await conch(devices, item => addHavocOSToDevices(item, 10), {
    limit: 1,
  });
  console.log(info(`${logcons.info()} Synced: 10.0 Havoc OS`));
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
  await findOrCreate({
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
