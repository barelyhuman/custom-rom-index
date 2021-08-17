#!/usr/bin/env node
const { devices } = require('../db/db')
const { generateDevices } = require('./generate-devices')
const { syncCRAndroid } = require('./sync-crdroid')
const { syncDotOS } = require('./sync-dotos')
const { syncLineageOS } = require('./sync-lineage-os')
const { syncLocalReleases } = require('./sync-local-releases')
const { syncPixelExperience } = require('./sync-pixel-experience')

async function main () {
  let _devices = await syncPixelExperience(devices)
  _devices = await syncLineageOS(_devices)
  _devices = await syncDotOS(_devices)
  _devices = await syncCRAndroid(_devices)
  await generateDevices(_devices)
  syncLocalReleases()
  console.log('✔ Done Syncing everything')
}

main()
