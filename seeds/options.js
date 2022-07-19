const { options } = require('../db/options');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('options').del();
  const rows = [];
  Object.entries(options).forEach(([identifier, optionDef]) => {
    Object.entries(optionDef).forEach(([_, optValue]) => {
      rows.push({
        identifier,
        value: optValue.value,
        sequence: optValue.sequence,
        label: optValue.label,
      });
    });
  });

  await knex('options').insert(rows);
};
