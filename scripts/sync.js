const { devices } = require('../db/db')
const { generateDevices } = require('./generate-devices')
const { syncPixelExperience } = require('./sync-pixel-experience')

async function main () {
  const _devices = await syncPixelExperience(devices)
  await generateDevices(_devices)
  console.log('✔ Done Syncing everything')
}

main()
