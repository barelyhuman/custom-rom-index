#!/usr/bin/env node

const got = require('got')
const YAML = require('yaml')
const fs = require('fs')
const { devices } = require('../db/db.js')
const path = require('path')

const URL_TEMPLATE = (deviceCodeName) =>
  `https://raw.githubusercontent.com/PixelExperience/wiki/master/_data/devices/${deviceCodeName}.yml`

async function deviceInfoAPI (codename) {
  try {
    const response = await got(URL_TEMPLATE(codename))
    const text = response.body
    const parsed = YAML.parse(text)
    return parsed
  } catch (err) {
    return {
      release: null
    }
  }
}

async function main (deviceList) {
  const withReleasesPromises = deviceList.map(async (item) => {
    const deviceInfo = await deviceInfoAPI(item.codename)
    item.releasedOn = item.releasedOn || deviceInfo.release
    return item
  })
  const withRelease = await Promise.all(withReleasesPromises)

  fs.writeFileSync(
    path.join(__dirname, '../db/devices.json'),
    JSON.stringify(withRelease, null, 2)
  )
}

exports.generateDevices = main

main(devices)
