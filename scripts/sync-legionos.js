#!/usr/bin/env node
const { addDevice, devices } = require('../db/db')
const got = require('got')
const { generateDevices } = require('./generate-devices')
const kluer = require('kleur')
const { logcons } = require('logcons')
const { STATUS_ENUM } = require('../db/status_enum')

const success = kluer.green().bold

const URL =
  'https://raw.githubusercontent.com/legionos-devices/OTA/11/devices.json'

async function main () {
  const response = await got(URL);

  (JSON.parse(response.body) || []).forEach((deviceItem) => {
    const codename = deviceItem.codename
    const deviceName = `${deviceItem.brand} ${deviceItem.name}`

    addDevice({
      deviceName,
      codename,
      rom: {
        status: deviceItem.active ? STATUS_ENUM.active : STATUS_ENUM.unknown,
        androidVersion: ['11'],
        links: [deviceItem.xda_thread],
        name: 'LegionOS'
      }
    })
  })

  console.log(success(`${logcons.tick()} Done, Syncing Legion OS`))
}

exports.syncLegionOS = main

if (require.main === module) {
  (async () => {
    const _devices = await main(devices)
    await generateDevices(_devices)
  })()
}
