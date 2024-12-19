#!/usr/bin/env node
import { fileURLToPath } from 'node:url'
import { conch } from '@barelyreaper/conch'
import _got from 'got'
import kluer from 'kleur'
import { logcons } from 'logcons'
import { STATUS_ENUM } from '../db/status_enum.js'
import { upsertDevice } from '../lib/sdk.js'

const info = kluer.cyan().bold
const success = kluer.green().bold

const URL =
  'https://api.github.com/repos/ColtOS-Devices/official_devices/contents/builds'

async function main() {
  await syncColtOSDevices()
  console.log(success(`${logcons.tick()} Done, Syncing ColtOS`))
}

async function syncColtOSDevices() {
  const { parse } = JSON
  const response = await got(URL)
  const devices = parse(response.body)

  await conch(devices, item => addColtOSToDevices(item), {
    limit: 1,
  })
  console.log(info(`${logcons.info()} Synced: Colt OS`))
}

async function addColtOSToDevices(item) {
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

  const codename = item.name.replace('.json', '')

  await upsertDevice({
    deviceName: deviceData.devicename,
    codename,
    rom: {
      status: STATUS_ENUM.active,
      androidVersion: [parseInt(deviceData.version, 10)],
      links: [deviceData.url],
      name: 'ColtOS',
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

export const syncColtOS = main

if (fileURLToPath(import.meta.url) === process.argv[1]) {
  main()
    .then(() => process.exit(0))
    .catch(err => {
      console.error(err)
      process.exit(1)
    })
}
