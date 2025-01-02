#!/usr/bin/env node

import _got from 'got'

import { fileURLToPath } from 'node:url'
import { conch } from '@barelyreaper/conch'
import kluer from 'kleur'
import { logcons } from 'logcons'
import { STATUS_ENUM } from '../db/status_enum.js'
import { upsertDevice } from '../lib/sdk.js'

const success = kluer.green().bold

const URL =
  'https://api.github.com/repos/DotOS/official_devices/contents/devices'

async function main() {
  const { parse } = JSON
  const response = await got(URL)
  const devices = parse(response.body)

  await conch(devices, item => addDotOSToDevices(item), {
    limit: 1,
  })

  console.log(success(`${logcons.tick()} Done, Syncing DotOS`))
}

async function addDotOSToDevices(item) {
  const { parse } = JSON
  const deviceBlob = await got(item.url)
  const fileContent = Buffer.from(
    parse(deviceBlob.body).content,
    'base64'
  ).toString('utf8')

  if (!fileContent) return true

  let parsedFileData
  try {
    parsedFileData = parse(fileContent)
  } catch (_) {
    parsedFileData = false
  }

  if (!parsedFileData) return true

  const deviceData = parsedFileData || false

  if (!deviceData) return true

  const codename = deviceData.codename
  const deviceName = `${deviceData.brandName} ${deviceData.deviceName}`

  await upsertDevice({
    deviceName,
    codename,
    rom: {
      status: STATUS_ENUM.active,
      androidVersion: ['11'],
      links: [deviceData.links.xda],
      name: 'Dot OS',
    },
  })
}

function got(url) {
  return _got(url, {
    headers: {
      Authorization: `token ${process.env.GH_TOKEN}`,
    },
  })
}

export const syncDotOS = main

if (fileURLToPath(import.meta.url) === process.argv[1]) {
  main()
    .then(() => process.exit(0))
    .catch(err => {
      console.error(err)
      process.exit(1)
    })
}
