#!/usr/bin/env node

import { writeFileSync } from 'fs'
import path from 'path'
import devicesJSON from '../db/devices.json'

const missing = {}

devicesJSON.devices.forEach(item => {
  if (missing[item.codename]) return

  missing[item.codename] = ''
})

const filePath = path.join(__dirname, '../db/missing-releases.json')
writeFileSync(filePath, JSON.stringify(missing, null, 2))
