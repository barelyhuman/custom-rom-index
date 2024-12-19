#!/usr/bin/env node
import kluer from 'kleur'
import { logcons } from 'logcons'
import { syncAospExtended } from './sync-aospextended.js'
import { syncArrowOS } from './sync-arrowos.js'
import { syncColtOS } from './sync-coltos.js'
import { syncCRAndroid } from './sync-crdroid.js'
import { syncDotOS } from './sync-dotos'
// import { syncParanoidAndroid } from "./sync-aospa".js;
import { syncHavocOS } from './sync-havocos.js'
import { syncLegionOS } from './sync-legionos.js'
import { syncLineageOS } from './sync-lineage-os.js'
import { syncManualDevices } from './sync-manual-devices.js'
import { syncPixelExperience } from './sync-pixel-experience.js'
import { syncPixysOS } from './sync-pixys-os.js'
import { syncPotatoProject } from './sync-potatorom.js'
import { syncSearchIndex } from './sync-search-index.js'

const bullet = kluer.white().bold
const success = kluer.green().bold

async function main() {
  console.log(bullet('Syncing, Manual Devices...'))
  await syncManualDevices()
  console.log(bullet('Syncing, Pixel Experience...'))
  await syncPixelExperience()
  console.log(bullet('Syncing, Lineage OS...'))
  await syncLineageOS()
  console.log(bullet('Syncing, Pixys OS...'))
  await syncPixysOS()
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
  console.log(bullet('Syncinc,Search Index...'))
  await syncSearchIndex()
  console.log(success(`${logcons.tick()} Done Syncing everything`))
}

main()
  .then(() => {
    process.exit(0)
  })
  .catch(() => {
    process.exit(1)
  })
