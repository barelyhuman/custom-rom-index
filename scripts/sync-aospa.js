#!/usr/bin/env node

import { fileURLToPath } from 'node:url'
import got from 'got'
import kluer from 'kleur'
import { logcons } from 'logcons'
import { STATUS_ENUM } from '../db/status_enum.js'
import { upsertDevice } from '../lib/sdk'

const success = kluer.green().bold

const URL = 'https://api.aospa.co/devices'

async function main() {
  const response = await got(URL)
  const deviceList = JSON.parse(response.body)

  const promises = deviceList.devices.map(async deviceItem => {
    await upsertDevice({
      deviceName: deviceItem.manufacturer + deviceItem.description,
      codename: deviceItem.name,
      rom: {
        name: 'Paranoid Android',
        status: STATUS_ENUM.unknown,
        links: [`https://aospa.co/downloads/${deviceItem.name}`],
      },
    })
  })

  await Promise.all(promises)

  console.log(
    success(`${logcons.tick()} Done, Syncing AOSPA - Paranoid Android...`)
  )
}

export const syncParanoidAndroid = main

if (fileURLToPath(import.meta.url) === process.argv[1])
  main()
    .then(() => process.exit(0))
    .catch(err => {
      console.error(err)
      process.exit(1)
    })
