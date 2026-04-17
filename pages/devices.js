import { Header } from 'components'
import { DevicesListTable } from 'containers'

import { getDevices } from '../lib/sdk.js'

function Devices({
  deviceList,
  searchTerm,
  sort,
  status,
  limit,
  currPage,
  maxPage,
}) {
  return (
    <>
      <Header />
      <div>
        <div>
          <h1>Browse devices by custom ROM support</h1>
          <p>
            Use search and filters to compare ROM health before buying, or find
            active builds for a device you already own.
          </p>
          <a href="https://github.com/barelyhuman/custom-rom-index/">
            <p>Contribute a missing device or ROM listing</p>
          </a>
        </div>
      </div>
      {
        <DevicesListTable
          list={deviceList}
          searchTerm={searchTerm}
          sortOrder={sort}
          statusFilter={status}
          limitFilter={limit}
          maxPage={maxPage}
          currPage={currPage}
        />
      }
    </>
  )
}

export default Devices

export async function getServerSideProps({ query }) {
  const defaultLimit = 15
  const order = {
    release: 'desc',
  }
  const limit = query.limit || defaultLimit

  switch (query.sort) {
    case 'releasedOn:asc': {
      order.release = 'asc'
      break
    }
    case 'releasedOn:desc': {
      order.release = 'desc'
      break
    }
    default: {
      order.release = 'desc'
      break
    }
  }

  const { deviceList, count } = await getDevices({
    page: query.page || 0,
    limit,
    status: query.status || 'all',
    searchTerm: query.q || '',
    order,
  })

  return {
    props: {
      deviceList,
      searchTerm: query.q || '',
      sort: query.sort || 'releasedOn:desc',
      status: query.status || 'all',
      limit,
      currPage: query.page || 0,
      maxPage: Math.floor(count / limit),
    },
  }
}
