#!/usr/bin/env node

import got from "got";
import kluer from "kleur";
import YAML from "yaml";
const info = kluer.cyan().bold;
import { fileURLToPath } from "url";
import { conch } from "@barelyreaper/conch";
import { db } from "../db/db.js";
import { getReleasedOn } from "../lib/date-utils.js";

const URL_TEMPLATE = (deviceCodeName) =>
  `https://raw.githubusercontent.com/PixelExperience/wiki/main/_data/devices/${deviceCodeName}.yml`;

const URL_TEMPLATE_TWO = (deviceCodeName) =>
  `https://raw.githubusercontent.com/LineageOS/lineage_wiki/main/_data/devices/${deviceCodeName}.yml`;

function parseYAML(text) {
  try {
    return text && YAML.parse(text);
  } catch (err) {
    return null;
  }
}

async function deviceInfoAPI(codename) {
  try {
    const response = await got(URL_TEMPLATE(codename)).catch((err) => err);
    const responseTwo = await got(URL_TEMPLATE_TWO(codename)).catch(
      (err) => err,
    );
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
  const devices = await db("devices").where({ released_on: null });
  const mapper = async (device) => {
    const { dataSourceOne, dataSourceTwo } = await deviceInfoAPI(
      device.codename,
    );
    const releaseDate =
      (dataSourceOne && dataSourceOne.release) ||
      (dataSourceTwo && dataSourceTwo.release);

    if (!releaseDate) return;

    const dateData = getReleasedOn(releaseDate);

    if (dateData) {
      const _date = dateData;
      await db("devices")
        .update({
          released_on: _date,
        })
        .where({
          id: device.id,
        });
    }
  };

  await conch(devices, mapper, { limit: 20 });
}

if (fileURLToPath(import.meta.url) === process.argv[1])
  main().then(() => process.exit(0));
