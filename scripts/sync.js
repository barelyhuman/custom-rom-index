#!/usr/bin/env node
const { devices } = require('../db/db')
const { generateDevices } = require('./generate-devices')
const { syncCRAndroid } = require('./sync-crdroid')
const { syncDotOS } = require('./sync-dotos')
const { syncLineageOS } = require('./sync-lineage-os')
const { syncLocalReleases } = require('./sync-local-releases')
const { syncPixelExperience } = require('./sync-pixel-experience')
const { logcons } = require('logcons')
const kluer = require('kleur')
const { db } = require('../db/db')
const { syncManualDevices } = require('./sync-manual-devices')

const bullet = kluer.white().bold
const success = kluer.green().bold

async function main () {
  db.set('devices', [])
  console.log(bullet('Syncing, Manual Devices...'))
  let _devices = await syncManualDevices()
  console.log(bullet('Syncing, Pixel Experience...'))
  _devices = await syncPixelExperience(devices)
  console.log(bullet('Syncing, Lineage OS...'))
  _devices = await syncLineageOS(_devices)
  console.log(bullet('Syncing, Dot OS...'))
  _devices = await syncDotOS(_devices)
  console.log(bullet('Syncing, CRDroid...'))
  _devices = await syncCRAndroid(_devices)
  await generateDevices(_devices)
  console.log(bullet('Syncing, Local Release Dates...'))
  syncLocalReleases()
  console.log(success(`${logcons.tick()} Done Syncing everything`))
}

main()
