import { Header } from 'components'
import { DevicesListTable } from 'containers'
import devicesJSON from 'db/devices.json'
import { sortByDate } from 'lib/date-utils'
import { filterDevices } from 'lib/filter-devices'

const { devices } = devicesJSON

function Devices ({ deviceList, searchTerm, sort }) {
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
      <DevicesListTable
        list={deviceList}
        searchTerm={searchTerm}
        sortOrder={sort}
      />
    </>
  )
}

export default Devices

export async function getServerSideProps ({ query }) {
  let deviceList = devices

  if (query.sort) {
    switch (query.sort) {
      case 'releasedOn:asc': {
        deviceList = deviceList.sort((x, y) =>
          sortByDate(x.releasedOn, y.releasedOn, 1)
        )
        break
      }
      case 'releasedOn:desc': {
        deviceList = deviceList.sort((x, y) =>
          sortByDate(x.releasedOn, y.releasedOn, -1)
        )
        break
      }
      default: {
        deviceList = devices.slice()
        break
      }
    }
  }

  if (query.q) {
    deviceList = deviceList.filter((x) => filterDevices(x, query.q))
  }

  return {
    props: {
      deviceList,
      searchTerm: query.q || '',
      sort: query.sort || 'releasedOn:desc'
    }
  }
}
