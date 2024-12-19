#!/usr/bin/env node
import got from 'got'
import kluer from 'kleur'
import { logcons } from 'logcons'
import { STATUS_ENUM } from '../db/status_enum.js'
import { upsertDevice } from '../lib/sdk.js'

import { fileURLToPath } from 'node:url'

const success = kluer.green().bold

const URL =
  'https://raw.githubusercontent.com/legionos-devices/OTA/11/devices.json'

async function main() {
  const response = await got(URL)

  const promises = (JSON.parse(response.body) || []).map(async deviceItem => {
    const codename = deviceItem.codename
    const deviceName = `${deviceItem.brand} ${deviceItem.name}`

    await upsertDevice({
      deviceName,
      codename,
      rom: {
        status: deviceItem.active ? STATUS_ENUM.active : STATUS_ENUM.unknown,
        androidVersion: ['11'],
        links: [deviceItem.xda_thread],
        name: 'LegionOS',
      },
    })
  })

  await Promise.all(promises)

  console.log(success(`${logcons.tick()} Done, Syncing Legion OS`))
}

exports.syncLegionOS = main

if (fileURLToPath(import.meta.url) === process.arv[1]) {
  main()
    .then(() => process.exit(0))
    .catch(err => {
      console.error(err)
      process.exit(1)
    })
}
