#!/usr/bin/env node

const got = require('got')
const YAML = require('yaml')
const fs = require('fs')
const { devices } = require('../db/db.js')
const path = require('path')

const URL_TEMPLATE = (deviceCodeName) =>
  `https://raw.githubusercontent.com/PixelExperience/wiki/master/_data/devices/${deviceCodeName}.yml`

const URL_TEMPLATE_TWO = (deviceCodeName) =>
  `https://raw.githubusercontent.com/LineageOS/lineage_wiki/master/_data/devices/${deviceCodeName}.yml`

function parseYAML (text) {
  try {
    return text && YAML.parse(text)
  } catch (err) {
    return null
  }
}

async function deviceInfoAPI (codename) {
  try {
    const response = await got(URL_TEMPLATE(codename)).catch((err) => err)
    const responseTwo = await got(URL_TEMPLATE_TWO(codename)).catch(
      (err) => err
    )
    const text = response.body
    const textTwo = responseTwo.body
    const parsed = parseYAML(text)
    const parsedTwo = parseYAML(textTwo)
    return {
      dataSourceOne: parsed,
      dataSourceTwo: parsedTwo
    }
  } catch (err) {
    console.log(`Failed: ${codename}`)
  }
}

async function main (deviceList) {
  console.log('ℹ Generating Devices')
  const withReleasesPromises = deviceList.map(async (item) => {
    const { dataSourceOne, dataSourceTwo } = await deviceInfoAPI(item.codename)
    item.releasedOn =
      item.releasedOn ||
      (dataSourceOne && dataSourceOne.release) ||
      (dataSourceTwo && dataSourceTwo.release)
    return item
  })
  const withRelease = await Promise.all(withReleasesPromises)

  fs.writeFileSync(
    path.join(__dirname, '../db/devices.json'),
    JSON.stringify(withRelease, null, 2)
  )
}

exports.generateDevices = main

if (require.main === module) {
  main(devices)
}
