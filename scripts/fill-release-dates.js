#!/usr/bin/env node

const got = require('got');
const YAML = require('yaml');
const fs = require('fs');
const path = require('path');
const { logcons } = require('logcons');
const kluer = require('kleur');
const info = kluer.cyan().bold;
const { db } = require('../db/db');
const conch = require('@barelyreaper/conch');
const { getReleasedOn, dateStringToDate } = require('../lib/date-utils');

const URL_TEMPLATE = deviceCodeName =>
  `https://raw.githubusercontent.com/PixelExperience/wiki/master/_data/devices/${deviceCodeName}.yml`;

const URL_TEMPLATE_TWO = deviceCodeName =>
  `https://raw.githubusercontent.com/LineageOS/lineage_wiki/master/_data/devices/${deviceCodeName}.yml`;

function parseYAML(text) {
  try {
    return text && YAML.parse(text);
  } catch (err) {
    return null;
  }
}

async function deviceInfoAPI(codename) {
  try {
    const response = await got(URL_TEMPLATE(codename)).catch(err => err);
    const responseTwo = await got(URL_TEMPLATE_TWO(codename)).catch(err => err);
    const text = response.body;
    const textTwo = responseTwo.body;
    const parsed = parseYAML(text);
    const parsedTwo = parseYAML(textTwo);
    return {
      dataSourceOne: parsed,
      dataSourceTwo: parsedTwo,
    };
  } catch (err) {
    console.log(`Failed: ${codename}`);
  }
}

async function main() {
  const devices = await db('devices').where({ released_on: null });
  const mapper = async device => {
    const { dataSourceOne, dataSourceTwo } = await deviceInfoAPI(
      device.codename
    );
    const releaseDate =
      (dataSourceOne && dataSourceOne.release) ||
      (dataSourceTwo && dataSourceTwo.release);

    if (!releaseDate) return;

    const dateData = getReleasedOn(releaseDate);

    if (dateData) {
      const _date = dateData && dateStringToDate(dateData);
      await db('devices')
        .update({
          released_on: _date,
        })
        .where({
          id: device.id,
        });
    }
  };

  await conch(devices, mapper, { limit: 5 });
}

if (require.main === module) main().then(() => process.exit(0));
