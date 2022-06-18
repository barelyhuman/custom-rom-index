import { totalDevices, totalRoms } from 'lib/analytical-utils';

export function TotalDeviceROMsCount() {
  return (
    <>
      <div>
        <p>Total Unique Devices</p>
        <h2>{totalDevices()}</h2>
      </div>
      <div>
        <p>Total Devices + ROMs</p>
        <h2>{totalRoms()}</h2>
      </div>
    </>
  );
}
