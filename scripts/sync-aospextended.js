#!/usr/bin/env node
const { addDevice } = require('../db/db')
const got = require('got')
const { generateDevices } = require('./generate-devices')
const kluer = require('kleur')
const { logcons } = require('logcons')
const { STATUS_ENUM } = require('../db/status_enum')

const success = kluer.green().bold

const URL =
  'https://raw.githubusercontent.com/AospExtended/official_devices/main/devices.json'

async function main () {
  const response = await got(URL);

  (JSON.parse(response.body) || []).forEach((deviceItem) => {
    const codename = deviceItem.codename
    const deviceName = `${deviceItem.brand} ${deviceItem.name}`;

    (deviceItem.supported_versions || []).forEach((device) => {
      if (device.version_code !== 'q' && device.version_code !== 'r') {
        return
      }

      let version
      if (device.version_code === 'q') {
        version = 10
      }
      if (device.version_code === 'r') {
        version = 11
      }
      addDevice({
        deviceName,
        codename,
        rom: {
          status: STATUS_ENUM.active,
          androidVersion: [version],
          links: [device.xda_thread],
          name: 'AospExtended'
        }
      })
    })
  })

  console.log(success(`${logcons.tick()} Done, Syncing AOSPExtended`))
}

exports.syncAospExtended = main

if (require.main === module) {
  (async () => {
    await main()
    await generateDevices()
  })()
}
