#!/usr/bin/env node
import { fileURLToPath } from 'node:url'
import got from 'got'
import kluer from 'kleur'
import { logcons } from 'logcons'
import { STATUS_ENUM } from '../db/status_enum.js'
import { upsertDevice } from '../lib/sdk.js'

const success = kluer.green().bold

const URL =
  'https://raw.githubusercontent.com/LineageOS/hudson/main/updater/devices.json'

async function main() {
  const response = await got(URL)

  const promises = (JSON.parse(response.body) || []).map(async deviceItem => {
    const codename = deviceItem.model
    const deviceName = `${deviceItem.oem} ${deviceItem.name}`

    await upsertDevice({
      deviceName,
      codename,
      rom: {
        status: STATUS_ENUM.unknown,
        androidVersion: ['N/A'],
        links: [`https://download.lineageos.org/${codename}`],
        name: 'LineageOS',
      },
    })
  })

  await Promise.all(promises)

  console.log(success(`${logcons.tick()} Done, Syncing Lineage OS`))
}

export const syncLineageOS = main

if (fileURLToPath(import.meta.url) === process.arv[1]) {
  main()
    .then(() => process.exit(0))
    .catch(err => {
      console.error(err)
      process.exit(1)
    })
}
