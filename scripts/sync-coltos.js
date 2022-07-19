#!/usr/bin/env node
const { addDevice, devices } = require('../db/db');
const _got = require('got');
const { generateDevices } = require('./generate-devices');
const conch = require('@barelyreaper/conch');
const { logcons } = require('logcons');
const kluer = require('kleur');
const { STATUS_ENUM } = require('../db/status_enum');
const {  upsertDevice } = require('../lib/sdk');
const info = kluer.cyan().bold;
const success = kluer.green().bold;

const URL =
  'https://api.github.com/repos/ColtOS-Devices/official_devices/contents/builds';

async function main() {
  await syncColtOSDevices();
  console.log(success(`${logcons.tick()} Done, Syncing ColtOS`));
}

async function syncColtOSDevices() {
  const { parse } = JSON;
  const response = await got(URL);
  const devices = parse(response.body);

  await conch(devices, item => addColtOSToDevices(item), {
    limit: 1,
  });
  console.log(info(`${logcons.info()} Synced: Colt OS`));
}

async function addColtOSToDevices(item) {
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

  const deviceData = parsedFileData || false;

  if (!deviceData) return true;

  const codename = item.name.replace('.json', '');

  await upsertDevice({
    deviceName: deviceData.devicename,
    codename,
    rom: {
      status: STATUS_ENUM.active,
      androidVersion: [parseInt(deviceData.version, 10)],
      links: [deviceData.url],
      name: 'ColtOS',
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

exports.syncColtOS = main;

if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}
