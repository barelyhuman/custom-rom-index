#!/usr/bin/env node
import { fileURLToPath } from 'node:url'
import got from 'got'
import kluer from 'kleur'
import { logcons } from 'logcons'
import { STATUS_ENUM } from '../db/status_enum.js'
import { upsertDevice } from '../lib/sdk.js'

const success = kluer.green().bold

const URL =
  'https://raw.githubusercontent.com/PixysOS/official_devices/master/devices.json'

async function main() {
  const response = await got(URL)

  const promises = (JSON.parse(response.body) || []).map(async deviceItem => {
    const codename = deviceItem.codename
    const deviceName = `${deviceItem.brand} ${deviceItem.name}`

    const _internalPromises = (deviceItem.supported_bases || []).map(
      async versionDef => {
        const version =
          (versionDef.name === 'ten' && 10) ||
          (versionDef.name === 'eleven' && 11) ||
          (versionDef.name === 'twelve' && 12) ||
          (versionDef.name === 'thirteen' && 13) ||
          (versionDef.name === 'fourteen' && 14)
        await upsertDevice({
          deviceName,
          codename,
          rom: {
            status: STATUS_ENUM.active,
            androidVersion: [version],
            links: [versionDef.xda_thread],
            name: 'Pixys OS',
          },
        })
      }
    )

    await Promise.all(_internalPromises)
  })

  await Promise.all(promises)

  console.log(success(`${logcons.tick()} Done, Syncing PixysOS`))
}

export const syncPixysOS = main

if (fileURLToPath(import.meta.url) === process.argv[1]) {
  main()
    .then(() => process.exit(0))
    .catch(err => {
      console.error(err)
      process.exit(1)
    })
}
