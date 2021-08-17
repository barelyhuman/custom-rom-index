import { releaseDateFormatter } from 'lib/date-utils'

const { topDevicesInROMCount } = require('lib/analytical-utils')

export function TopDevicesRomCount () {
  const deviceData = topDevicesInROMCount()
  return (
    <div className='flex flex-col items-center justify-center p-5'>
      <h2 className='mb-4 text-xl font-bold text-gray-700 title-font'>
        Top Devices by ROM Count
      </h2>
      <ol className='list-decimal my-4 list-inside w-full text-gray-600'>
        {deviceData.map((item, index) => {
          return (
            <li
              key={index}
              className='flex justify-between p-2 text-xs border m-1 md:border-0 md:text-base rounded-sm hover:bg-gray-100 hover:cursor-default'
            >
              <div className='w-1/3 text-left'>{item.name}</div>
              <div className='w-1/3 text-left'>
                Released: {releaseDateFormatter(item.releasedOn)}
              </div>
              <div className='w-1/3 text-right font-bold'>
                {item.count} ROM(s)
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
