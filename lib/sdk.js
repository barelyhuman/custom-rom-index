const { options, findInOptions } = require("../db/options");
const { db } = require("../db/db");
const { getReleasedOn } = require("./date-utils");
const luxon = require("luxon");

async function upsertDevice(data) {
  let trx;
  try {
    const codename = data.codename;
    trx = await db.transaction();
    let deviceDetails = await trx("devices")
      .where({
        codename,
      })
      .first();

    const date = getReleasedOn(data.releasedOn);

    if (!deviceDetails) {
      deviceDetails = (
        await trx("devices")
          .insert({
            basename: data.deviceName,
            codename,
            released_on: date,
          })
          .returning("id")
      )[0];
    }

    const version = data.rom.androidVersion &&
        data.rom.androidVersion.length &&
        data.rom.androidVersion[0] !== "N/A"
      ? data.rom.androidVersion[0] || null
      : null;

    let romDetails = await trx("roms")
      .where({
        name: data.rom.name,
        android_version: version,
      })
      .first();

    if (!romDetails) {
      romDetails = (
        await trx("roms")
          .insert({
            name: data.rom.name,
            android_version: version,
          })
          .returning("id")
      )[0];
    }

    const hasMapping = await trx("roms_devices_mapping")
      .where({
        device_id: deviceDetails.id,
        rom_id: romDetails.id,
      })
      .first();

    if (!hasMapping) {
      await trx("roms_devices_mapping").insert({
        device_id: deviceDetails.id,
        rom_id: romDetails.id,
        status: (options.STATUS[data.rom.status.toLowerCase()] &&
          options.STATUS[data.rom.status.toLowerCase()].value) ||
          options.STATUS.unknown.value,
      });
    }
    await trx.commit();
  } catch (err) {
    console.error(err);
    trx && (await trx.rollback());
    throw err;
  }
}

const getDevices = async ({
  page = 0,
  limit = 10,
  order = {},
  searchTerm = "",
  status = "all",
} = {}) => {
  const queryChain = db("roms_devices_mapping")
    .leftJoin("devices", "roms_devices_mapping.device_id", "devices.id")
    .leftJoin("roms", "roms_devices_mapping.rom_id", "roms.id");

  if (searchTerm.length >= 3) {
    queryChain.andWhere(function () {
      this.whereRaw(
        "roms_devices_mapping.id in ?",
        db.raw(
          `(select CAST(rom_mapping_id as decimal) from roms_search_index where keywords Match '${searchTerm}')`,
        ),
      );
    });
  }

  if (order.release) queryChain.orderBy("devices.released_on", order.release);
  if (status !== "all") 
    queryChain.andWhere({ "roms_devices_mapping.status": status });
  

  const countData = await queryChain.clone().count("roms_devices_mapping.id");

  const data = await queryChain.clone().offset(page * limit)
    .limit(limit)
    .select([
      "devices.*",
      "roms_devices_mapping.id as mapping_id",
      "roms_devices_mapping.status",
      "roms.id as rom_id",
      "roms.id as rom_id",
      "roms.name as name",
      "roms.android_version as android_version",
      "roms.base_link as base_link",
    ]);

  const deviceList = data.map((x) => {
    const opt = findInOptions("STATUS", x.status);
    const releaseDate = x.released_on &&
      luxon.DateTime.fromMillis(x.released_on).toFormat("LLL, yyyy");
    return {
      ...x,
      released_on_formatted: releaseDate,
      status_label: opt && opt.label,
    };
  });

  return {
    deviceList,
    count: countData[0]["count(`roms_devices_mapping`.`id`)"],
  };
};

module.exports = { upsertDevice, getDevices };
