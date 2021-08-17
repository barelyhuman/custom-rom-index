#!/usr/bin/env node

const allDevices = require('../db/devices.json')
const { writeFileSync } = require('fs')
const path = require('path')

const missing = {}

allDevices.forEach((item) => {
  if (missing[item.codename]) {
    return
  }

  missing[item.codename] = ''
})

const filePath = path.join(__dirname, '../db/missing-releases.json')
writeFileSync(filePath, JSON.stringify(missing, null, 2))
