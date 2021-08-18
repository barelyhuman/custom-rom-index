#!/usr/bin/env node

const { addDevice, devices } = require('../db/db')
const got = require('got')
const { generateDevices } = require('./generate-devices')
const kluer = require('kleur')
const { logcons } = require('logcons')
const { STATUS_ENUM } = require('../db/status_enum')

const success = kluer.green().bold

const URL =
  'https://raw.githubusercontent.com/DotOS/official_devices/master/devices.json'

async function main (deviceList) {
  const response = await got(URL);

  (JSON.parse(response.body) || []).forEach((deviceItem) => {
    const codename = deviceItem.codename
    const deviceName = `${deviceItem.brand} ${deviceItem.name}`

    addDevice({
      deviceName: deviceName,
      codename: codename,
      rom: {
        status: STATUS_ENUM.active,
        androidVersion: ['N/A'],
        links: [deviceItem.xda_thread],
        name: 'Dot OS'
      }
    })
  })

  console.log(success(`${logcons.tick()} Done, Syncing DotOS`))
  return deviceList
}

exports.syncDotOS = main

if (require.main === module) {
  (async () => {
    const _devices = await main(devices)
    await generateDevices(_devices)
  })()
}
