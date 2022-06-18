const StormDB = require('stormdb');

/* eslint-disable */
const engine = new StormDB.localFileEngine('./db/devices.json');
/* eslint-enable */

const db = new StormDB(engine);

db.default({ devices: [] });

exports.db = db;

const addDevice = deviceDetails => {
  const devices = db.get('devices');

  db.get('devices')
    .push({
      ...deviceDetails,
      id: devices.value() ? devices.length().value() : 0,
    })
    .save();
};

exports.addDevice = addDevice;

exports.devices = db
  .get('devices')
  .sort((x, y) =>
    x.codename.toLowerCase() > y.codename.toLowerCase() ? 1 : -1
  )
  .value();
