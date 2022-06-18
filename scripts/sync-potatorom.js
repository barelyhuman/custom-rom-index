#!/usr/bin/env node

const { addDevice, devices } = require('../db/db')
const got = require('got')
const { generateDevices } = require('./generate-devices')
const kluer = require('kleur')
const { logcons } = require('logcons')
const { STATUS_ENUM } = require('../db/status_enum')

const success = kluer.green().bold

const URL =
  'https://raw.githubusercontent.com/PotatoProject/vendor_potato/92e407b1696ac962dbd3ef2acaff8dc560268010/devices.json'

async function main () {
  const response = await got(URL)
  const deviceList = JSON.parse(response.body) || {}
  Object.keys(deviceList).forEach((deviceCodeName) => {
    const codename = deviceCodeName
    const device = deviceList[deviceCodeName]

    addDevice({
      deviceName: '',
      codename,
      rom: {
        status: STATUS_ENUM.active,
        androidVersion: ['N/A'],
        links: [`${device.repo}/releases/latest`],
        name: 'Potato Open Source Project | POSP'
      }
    })
  })

  console.log(success(`${logcons.tick()} Done, Syncing Potato Project`))
}

exports.syncPotatoProject = main

if (require.main === module) {
  (async () => {
    const _devices = await main(devices)
    await generateDevices(_devices)
  })()
}
