const { totalActiveRoms } = require('lib/analytical-utils')

export function ActiveDeviceROMsCount () {
  return (
    <div>
      <p>
        <span>Actively</span> Developed ROMs
      </p>
      <h2>{totalActiveRoms()}</h2>
    </div>
  )
}
