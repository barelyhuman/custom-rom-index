import { totalDevices, totalRoms } from 'lib/analytical-utils'

export function TotalDeviceROMsCount () {
  return (
    <>
      <div className='flex mx-1 flex-col items-center justify-center border border-gray-100 rounded-lg p-5 shadow'>
        <p className='mb-8 text-gray-600 title-font'>Total Unique Devices</p>
        <h2 className='mb-8 text-xl font-black tracking-tighter text-black md:text-5xl title-font'>
          {totalDevices()}
        </h2>
      </div>
      <div className='flex mx-1 flex-col items-center justify-center border border-gray-100 rounded-lg p-5 shadow'>
        <p className='mb-8 text-gray-600 title-font'>Total Devices + ROMs</p>
        <h2 className='mb-8 text-xl font-black tracking-tighter text-black md:text-5xl title-font'>
          {totalRoms()}
        </h2>
      </div>
    </>
  )
}
