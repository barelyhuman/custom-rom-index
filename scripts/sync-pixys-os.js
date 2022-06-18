#!/usr/bin/env node
const { addDevice, devices } = require('../db/db')
const got = require('got')
const { generateDevices } = require('./generate-devices')
const kluer = require('kleur')
const { logcons } = require('logcons')
const { STATUS_ENUM } = require('../db/status_enum')

const success = kluer.green().bold

const URL =
  'https://raw.githubusercontent.com/PixysOS/official_devices/master/devices.json'

async function main () {
  const response = await got(URL);

  (JSON.parse(response.body) || []).forEach((deviceItem) => {
    const codename = deviceItem.codename
    const deviceName = `${deviceItem.brand} ${deviceItem.name}`;

    (deviceItem.supported_bases || []).forEach((versionDef) => {
      const version =
        (versionDef.name === 'ten' && 10) ||
        (versionDef.name === 'eleven' && 11)
      addDevice({
        deviceName,
        codename,
        rom: {
          status: STATUS_ENUM.active,
          androidVersion: [version],
          links: [versionDef.xda_thread],
          name: 'Pixys OS'
        }
      })
    })
  })

  console.log(success(`${logcons.tick()} Done, Syncing PixysOS`))
}

exports.syncPixysOS = main

if (require.main === module) {
  (async () => {
    const _devices = await main(devices)
    await generateDevices(_devices)
  })()
}
