#!/usr/bin/env node

import { fileURLToPath } from 'node:url'
import got from 'got'
import kluer from 'kleur'
import { logcons } from 'logcons'
import { STATUS_ENUM } from '../db/status_enum.js'
import { upsertDevice } from '../lib/sdk.js'
const success = kluer.green().bold

const URL =
  'https://raw.githubusercontent.com/AospExtended/official_devices/main/devices.json'

async function main() {
  const response = await got(URL)

  const promises = (JSON.parse(response.body) || []).map(async deviceItem => {
    const codename = deviceItem.codename
    const deviceName = `${deviceItem.brand} ${deviceItem.name}`

    const _internalPromises = (deviceItem.supported_versions || []).map(
      async device => {
        if (device.version_code !== 'q' && device.version_code !== 'r') return

        let version
        if (device.version_code === 'q') version = 10

        if (device.version_code === 'r') version = 11

        await upsertDevice({
          deviceName,
          codename,
          rom: {
            status: STATUS_ENUM.active,
            androidVersion: [version],
            links: [device.xda_thread],
            name: 'AospExtended',
          },
        })
      }
    )

    await Promise.all(_internalPromises)
  })

  await Promise.all(promises)

  console.log(success(`${logcons.tick()} Done, Syncing AOSPExtended`))
}

export const syncAospExtended = main

if (fileURLToPath(import.meta.url) === process.argv[1])
  main()
    .then(() => process.exit(0))
    .catch(err => {
      console.error(err)
      process.exit(1)
    })
