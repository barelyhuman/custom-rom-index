#!/usr/bin/env node

const { addDevice } = require('../db/db');
const got = require('got');
const { STATUS_ENUM } = require('../db/status_enum');
const kluer = require('kleur');
const { logcons } = require('logcons');

const success = kluer.green().bold;

const URL = 'https://api.aospa.co/devices';

async function main() {
  const response = await got(URL);
  const deviceList = JSON.parse(response.body);

  deviceList.devices.forEach(deviceItem => {
    addDevice({
      deviceName: deviceItem.manufacturer + deviceItem.description,
      codename: deviceItem.name,
      rom: {
        name: 'Paranoid Android',
        status: STATUS_ENUM.unknown,
        links: [`https://aospa.co/downloads/${deviceItem.name}`],
      },
    });
  });

  console.log(
    success(`${logcons.tick()} Done, Syncing AOSPA - Paranoid Android...`)
  );
}

exports.syncParanoidAndroid = main;

if (require.main === module) main();
