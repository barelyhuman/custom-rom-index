import { Header } from 'components'
import { DevicesListTable } from 'containers'

function Devices () {
  return (
    <>
      <Header />
      <div className='container items-center mx-auto'>
        <div className='p-1 px-5 overflow-y-auto whitespace-nowrap scroll-hidden flex justify-between'>
          <h1 className='text-lg font-semibold text-gray-600 uppercase title-font'>
            Devices
          </h1>
          <a
            href='https://github.com/barelyhuman/custom-rom-index/'
            className='text-gray-400 hover:text-black'
          >
            <p className='text-xs'>Help us add more devices</p>
          </a>
        </div>
      </div>
      <DevicesListTable />
    </>
  )
}

export default Devices
