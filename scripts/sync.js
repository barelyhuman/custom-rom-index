#!/usr/bin/env node
const { syncCRAndroid } = require('./sync-crdroid');
const { syncDotOS } = require('./sync-dotos');
const { syncLineageOS } = require('./sync-lineage-os');
const { syncPixelExperience } = require('./sync-pixel-experience');
const { logcons } = require('logcons');
const kluer = require('kleur');
const { syncManualDevices } = require('./sync-manual-devices');
const { syncArrowOS } = require('./sync-arrowos');
const { syncAospExtended } = require('./sync-aospextended');
// const { syncParanoidAndroid } = require("./sync-aospa");
const { syncHavocOS } = require('./sync-havocos');
const { syncPotatoProject } = require('./sync-potatorom');
const { syncColtOS } = require('./sync-coltos');
const { syncLegionOS } = require('./sync-legionos');
const { syncPixysOS } = require('./sync-pixys-os');
const { syncSearchIndex } = require('./sync-search-index');

const bullet = kluer.white().bold;
const success = kluer.green().bold;

async function main() {
  console.log(bullet('Syncing, Manual Devices...'));
  await syncManualDevices();
  console.log(bullet('Syncing, Pixel Experience...'));
  await syncPixelExperience();
  console.log(bullet('Syncing, Lineage OS...'));
  await syncLineageOS();
  console.log(bullet('Syncing, Pixys OS...'));
  await syncPixysOS();
  console.log(bullet('Syncing, Potato Project...'));
  await syncPotatoProject();
  console.log(bullet('Syncing, Dot OS...'));
  await syncDotOS();
  console.log(bullet('Syncing, ArrowOS...'));
  await syncArrowOS();
  console.log(bullet('Syncing, AOSPExtended...'));
  await syncAospExtended();

  // Disabled cause their API is down.
  // console.log(bullet('Syncing, AOSPA - Paranoid Android...'))
  // await syncParanoidAndroid()

  console.log(bullet('Syncing, LegionOS...'));
  await syncLegionOS();
  console.log(bullet('Syncing, CRDroid...'));
  await syncCRAndroid();
  console.log(bullet('Syncing, HavocOS...'));
  await syncHavocOS();
  console.log(bullet('Syncing, ColtOS...'));
  await syncColtOS();
  console.log(bullet('Syncinc,Search Index...'));
  await syncSearchIndex();
  console.log(success(`${logcons.tick()} Done Syncing everything`));
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch(() => {
    process.exit(1);
  });
