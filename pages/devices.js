import { Header } from 'components'
import { DevicesListTable } from 'containers'

function Devices () {
  return (
    <>
      <Header />
      <div>
        <div>
          <h1>Devices</h1>
          <a href='https://github.com/barelyhuman/custom-rom-index/'>
            <p>Help us add more devices</p>
          </a>
        </div>
      </div>
      <DevicesListTable />
    </>
  )
}

export default Devices
