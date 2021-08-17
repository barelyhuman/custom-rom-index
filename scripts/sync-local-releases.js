const devices = require('../db/devices.json')
const { writeFileSync } = require('fs')
const path = require('path')
const localReleaseDB = require('../db/release-dates.json')

async function main () {
  const withLocalReleaseDates = devices.map((item) => {
    item.releasedOn = item.releasedOn || localReleaseDB[item.codename]
    return item
  })

  writeFileSync(
    path.join(__dirname, '../db/devices.json'),
    JSON.stringify(withLocalReleaseDates, null, 2)
  )

  console.log('✔ Done, Syncing Local Release Dates')
}

exports.syncLocalReleases = main

if (require.main === module) {
  main()
}
