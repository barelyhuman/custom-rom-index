import { getReleasedOn } from 'lib/date-utils'

const { topDevicesInROMCount } = require('lib/analytical-utils')

export function TopDevicesRomCount () {
  const deviceData = topDevicesInROMCount()
  return (
    <div>
      <h2>Top Devices by ROM Count</h2>
      <ol>
        {deviceData.map((item, index) => {
          return (
            <li
              key={index}
              className='flex justify-between p-2 border m-1 rounded-sm md:border-0  hover:bg-gray-100 hover:cursor-default'
            >
              <div className='w-1/3'>{item.name}</div>
              <div className='w-1/3'>Released: {getReleasedOn(item)}</div>
              <div className='w-1/3'>{item.count} ROM(s)</div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
