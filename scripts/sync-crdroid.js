#!/usr/bin/env node
const { addDevice, STATUS_ENUM, devices } = require('../db/db')
const _got = require('got')
const { generateDevices } = require('./generate-devices')
const conch = require('@barelyreaper/conch')

const V11_COMMIT =
  'https://api.github.com/repos/crdroidandroid/android_vendor_crDroidOTA/branches/11.0'
const V10_COMMIT =
  'https://api.github.com/repos/crdroidandroid/android_vendor_crDroidOTA/branches/10.0'

async function main (deviceList) {
  await addV11Devices()
  await addV10Devices()
  console.log('✔ Done, Syncing crAndroid')
  return deviceList
}

async function addV11Devices () {
  const { parse } = JSON
  const response = await got(V11_COMMIT)
  const repoTreeUrl = parse(response.body).commit.commit.tree.url
  const repoTreeResponse = await got(repoTreeUrl)

  const devicesToSync = parse(repoTreeResponse.body).tree.filter(
    (item) =>
      !item.path.includes('changelog') &&
      item.type === 'blob' &&
      String(item.path).endsWith('.json')
  )

  await conch(devicesToSync, (item) => addCRDroidToDevices(item, 11), {
    limit: 1
  })
  console.log('Synced: 11.0 crDroid')
}

async function addV10Devices () {
  const { parse } = JSON
  const response = await got(V10_COMMIT)
  const repoTreeUrl = parse(response.body).commit.commit.tree.url
  const repoTreeResponse = await got(repoTreeUrl)

  const devicesToSync = parse(repoTreeResponse.body).tree.filter(
    (item) =>
      !item.path.includes('changelog') &&
      item.type === 'blob' &&
      String(item.path).endsWith('.json')
  )

  await conch(devicesToSync, (item) => addCRDroidToDevices(item, 10), {
    limit: 10
  })
  console.log('Synced: 10.0 crDroid')
}

async function addCRDroidToDevices (item, version) {
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

  const deviceData =
    (parsedFileData.response && parsedFileData.response[0]) || false

  if (!deviceData) {
    return true
  }

  const codename = item.path.replace('.json', '')
  addDevice({
    deviceName: deviceData.device,
    codename: codename,
    rom: {
      status: STATUS_ENUM.unknown,
      androidVersion: [version],
      links: [deviceData.forum],
      name: 'crDroid'
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

exports.syncCRAndroid = main

if (require.main === module) {
  (async () => {
    const _devices = await main(devices)
    await generateDevices(_devices)
  })()
}
