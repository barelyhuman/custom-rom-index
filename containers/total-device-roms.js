const { totalRoms } = require('lib/analytical-utils')

export function TotalDeviceROMsCount () {
  return (
    <div className='flex flex-col items-center justify-center border border-gray-100 rounded-lg p-5 shadow'>
      <p className='mb-8 text-gray-600 title-font'>Total Devices + ROMs</p>
      <h2 className='mb-8 text-xl font-black tracking-tighter text-black md:text-5xl title-font'>
        {totalRoms()}
      </h2>
    </div>
  )
}
