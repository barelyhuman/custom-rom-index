#!/usr/bin/env node
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
const { syncArrowOS } = require('./sync-arrowos')
const { syncAospExtended } = require('./sync-aospextended')
// const { syncParanoidAndroid } = require("./sync-aospa");
const { syncHavocOS } = require('./sync-havocos')
const { syncPotatoProject } = require('./sync-potatorom')
const { syncColtOS } = require('./sync-coltos')
const { syncLegionOS } = require('./sync-legionos')

const bullet = kluer.white().bold
const success = kluer.green().bold

async function main () {
  db.set('devices', [])
  console.log(bullet('Syncing, Manual Devices...'))
  await syncManualDevices()
  console.log(bullet('Syncing, Pixel Experience...'))
  await syncPixelExperience()
  console.log(bullet('Syncing, Lineage OS...'))
  await syncLineageOS()
  console.log(bullet('Syncing, Potato Project...'))
  await syncPotatoProject()
  console.log(bullet('Syncing, Dot OS...'))
  await syncDotOS()
  console.log(bullet('Syncing, ArrowOS...'))
  await syncArrowOS()
  console.log(bullet('Syncing, AOSPExtended...'))
  await syncAospExtended()

  // Disabled cause their API is down.
  // console.log(bullet('Syncing, AOSPA - Paranoid Android...'))
  // await syncParanoidAndroid()

  console.log(bullet('Syncing, LegionOS...'))
  await syncLegionOS()
  console.log(bullet('Syncing, CRDroid...'))
  await syncCRAndroid()
  console.log(bullet('Syncing, HavocOS...'))
  await syncHavocOS()
  console.log(bullet('Syncing, ColtOS...'))
  await syncColtOS()
  await generateDevices()
  console.log(bullet('Syncing, Local Release Dates...'))
  syncLocalReleases()
  console.log(success(`${logcons.tick()} Done Syncing everything`))
}

main()
