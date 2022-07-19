const { options } = require('../db/options');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('roms', function (table) {
      table.increments('id').unique().primary().notNullable();
      table.text('name').notNullable();
      table.text('android_version').nullable();
      table.text('base_link').nullable();
      table.timestamps(true, true);
    })
    .createTable('devices', function (table) {
      table.increments('id').unique().primary().notNullable();
      table.text('basename').notNullable();
      table.text('codename').unique().notNullable();
      table.date('released_on').nullable();

      table.timestamps(true, true);
    })
    .createTable('roms_devices_mapping', function (table) {
      table.increments('id').unique().primary().notNullable();
      table.integer('device_id').notNullable();
      table.integer('rom_id').notNullable();

      // referenced by db/options.js => value
      table
        .integer('status')
        .notNullable()
        .defaultTo(options.STATUS.unknown.value);

      table.foreign('device_id').references('devices.id');
      table.foreign('rom_id').references('roms.id');

      table.timestamps(true, true);
    })
    .createTable('links', function (table) {
      table.increments('id').unique().primary().notNullable();
      table.text('link').notNullable();
      table.integer('rom_id').nullable();
      table.integer('device_id').nullable();

      table.foreign('rom_id').references('roms.id');
      table.foreign('device_id').references('devices.id');

      table.timestamps(true, true);
    })
    .createTable('options', function (table) {
      table.increments('id').unique().primary().notNullable();
      table.text('identifier').notNullable();
      table.text('label').notNullable();
      table.integer('sequence').notNullable();
      table.integer('value').notNullable();
      table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable('options')
    .dropTableIfExists('links')
    .dropTableIfExists('roms_devices_mapping')
    .dropTableIfExists('devices')
    .dropTableIfExists('roms');
};
