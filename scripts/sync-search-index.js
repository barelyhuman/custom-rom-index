const {conch} = require("@barelyreaper/conch");
const { db } = require("../db/db");

async function main() {
  await db("roms_search_index").del();
  const romData = await db("roms_devices_mapping")
    .leftJoin("roms", "roms_devices_mapping.rom_id", "roms.id")
    .leftJoin("devices", "roms_devices_mapping.device_id", "devices.id")
    .select(
      "roms_devices_mapping.*",
      "roms.name as rom_name",
      "devices.basename as device_name",
      "devices.codename as device_codename",
    );

  await conch(romData, async (row) => {
    const execChain = await db("roms_search_index").insert({
      rom_mapping_id: row.id,
      keywords: [row.rom_name, row.device_name, row.device_codename].join(", "),
    });
  }, { limit: 20 });
}

exports.syncSearchIndex = main

if (require.main === module) main().then(() => process.exit(0));
