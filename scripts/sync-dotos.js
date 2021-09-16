#!/usr/bin/env node

const { addDevice, devices } = require('../db/db')
const _got = require('got')
const { generateDevices } = require('./generate-devices')
const kluer = require('kleur')
const { logcons } = require('logcons')
const { STATUS_ENUM } = require('../db/status_enum')

const conch = require('@barelyreaper/conch')

const success = kluer.green().bold

const URL =
  'https://api.github.com/repos/DotOS/official_devices/contents/devices'

async function main () {
  const { parse } = JSON
  const response = await got(URL)
  const devices = parse(response.body)

  await conch(devices, (item) => addDotOSToDevices(item), {
    limit: 1
  })

  console.log(success(`${logcons.tick()} Done, Syncing DotOS`))
}

async function addDotOSToDevices (item) {
  const { parse } = JSON
  const deviceBlob = await got(item.url)
  const fileContent = Buffer.from(
    parse(deviceBlob.body).content,
    'base64'
  ).toString('utf8')

  if (!fileContent) {
    return true
  }

  let parsedFileData
  try {
    parsedFileData = parse(fileContent)
  } catch (_) {
    parsedFileData = false
  }

  if (!parsedFileData) {
    return true
  }

  const deviceData = parsedFileData || false

  if (!deviceData) {
    return true
  }

  const codename = deviceData.codename
  const deviceName = `${deviceData.brandName} ${deviceData.deviceName}`

  addDevice({
    deviceName: deviceName,
    codename: codename,
    rom: {
      status: STATUS_ENUM.active,
      androidVersion: ['11'],
      links: [deviceData.links.xda],
      name: 'Dot OS'
    }
  })
}

function got (url) {
  return _got(url, {
    headers: {
      Authorization: `token ${process.env.GH_TOKEN}`
    }
  })
}

exports.syncDotOS = main

if (require.main === module) {
  (async () => {
    const _devices = await main(devices)
    await generateDevices(_devices)
  })()
}
