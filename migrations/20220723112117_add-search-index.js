/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.raw(
    `CREATE VIRTUAL TABLE roms_search_index USING fts4(rom_mapping_id,keywords)`
  )
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.raw(`DROP TABLE IF EXISTS roms_search_index`)
}
