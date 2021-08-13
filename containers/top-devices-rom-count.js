const { topThreeInROMCount } = require('lib/analytical-utils')

export function TopDevicesRomCount () {
  const deviceData = topThreeInROMCount()
  return (
    <div className='flex flex-col items-center justify-center border border-gray-100 rounded-lg p-5 shadow'>
      <h2 className='mb-4 text-xl font-bold text-gray-700 title-font'>
        Top Devices by ROM Count
      </h2>
      <ol className='list-decimal list-inside text-gray-600'>
        {deviceData.map((item, index) => {
          return (
            <li key={index}>
              {item.name} -{' '}
              <span className='font-bold'>{item.count} ROM(s)</span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
