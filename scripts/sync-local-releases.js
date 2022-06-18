#!/usr/bin/env node
const { db } = require('../db/db');
const { writeFileSync } = require('fs');
const path = require('path');
const localReleaseDB = require('../db/release-dates.json');

const kluer = require('kleur');
const { logcons } = require('logcons');

const success = kluer.green().bold;

async function main() {
  const withLocalReleaseDates = db
    .get('devices')
    .map(item => {
      item.releasedOn = item.releasedOn || localReleaseDB[item.codename];
      return item;
    })
    .value();

  writeFileSync(
    path.join(__dirname, '../db/devices.json'),
    JSON.stringify(
      {
        devices: withLocalReleaseDates,
      },
      null,
      2
    )
  );

  console.log(success(`${logcons.tick()} Done, Syncing Local Release Dates`));
}

exports.syncLocalReleases = main;

if (require.main === module) main();
