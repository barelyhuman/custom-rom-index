#!/usr/bin/env node
const { addDevice, devices } = require('../db/db')
const got = require('got')
const { generateDevices } = require('./generate-devices')
const kluer = require('kleur')
const { logcons } = require('logcons')
const { STATUS_ENUM } = require('../db/status_enum')

const success = kluer.green().bold

const URL =
  'https://raw.githubusercontent.com/PixelExperience/official_devices/master/devices.json'

const ignoreVersionKeys = '_plus'

async function main () {
  const response = await got(URL);

  (JSON.parse(response.body) || []).forEach((deviceItem) => {
    const codename = deviceItem.codename
    const deviceName = `${deviceItem.brand} ${deviceItem.name}`

    deviceItem.supported_versions
      .filter((x) => !x.version_code.includes(ignoreVersionKeys))
      .forEach((deviceVersionItem) => {
        const versions = []

        if (deviceVersionItem.version_code === 'eleven') {
          versions.push(11)
        }

        if (deviceVersionItem.version_code === 'ten') {
          versions.push(10)
        }

        addDevice({
          deviceName: deviceName,
          codename: codename,
          rom: {
            status: deviceVersionItem.deprecated
              ? STATUS_ENUM.discontinued
              : STATUS_ENUM.active,
            androidVersion: versions,
            links: [`https://download.pixelexperience.org/${codename}`],
            name: 'Pixel Experience'
          }
        })
      })
  })

  console.log(success(`${logcons.tick()} Done, Syncing Pixel Experience`))
}

exports.syncPixelExperience = main

if (require.main === module) {
  (async () => {
    const _devices = await main(devices)
    await generateDevices(_devices)
  })()
}
