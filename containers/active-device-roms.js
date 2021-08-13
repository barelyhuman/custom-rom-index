const { totalActiveRoms } = require('lib/analytical-utils')

export function ActiveDeviceROMsCount () {
  return (
    <div className='flex flex-col items-center justify-center border border-gray-100 rounded-lg p-5 shadow'>
      <p className='mb-8 text-gray-600 title-font'>
        Current Active Devices + ROMs
      </p>
      <h2 className='mb-8 text-xl font-black tracking-tighter text-black md:text-5xl title-font'>
        {totalActiveRoms()}
      </h2>
    </div>
  )
}
