#!/usr/bin/env node
const { addDevice, STATUS_ENUM, devices } = require('../db/db')
const got = require('got')
const { generateDevices } = require('./generate-devices')

const URL =
  'https://raw.githubusercontent.com/LineageOS/hudson/master/updater/devices.json'

async function main (deviceList) {
  const response = await got(URL);

  (JSON.parse(response.body) || []).forEach((deviceItem) => {
    const codename = deviceItem.model
    const deviceName = `${deviceItem.oem} ${deviceItem.name}`

    addDevice({
      deviceName: deviceName,
      codename: codename,
      rom: {
        status: STATUS_ENUM.unknown,
        androidVersion: ['N/A'],
        links: [`https://download.pixelexperience.org/${codename}`],
        name: 'LineageOS'
      }
    })
  })

  console.log('✔ Done, Syncing LineageOS')
  return deviceList
}

exports.syncLineageOS = main

if (require.main === module) {
  (async () => {
    const _devices = await main(devices)
    await generateDevices(_devices)
  })()
}
