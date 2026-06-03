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
  error,
}) {
  return (
    <>
      <Header />
      {error ? (
        <section className="error-section">
          <p>{error}</p>
        </section>
      ) : (
        <section className="devices-hero">
          <div className="devices-hero-inner">
            <h1>Browse devices by custom ROM support</h1>
            <p>
              Use search and filters to compare ROM health before buying, or find
              active builds for a device you already own.
            </p>
            <a
              href="https://github.com/barelyhuman/custom-rom-index/"
              className="contribute-link"
            >
              Contribute a missing device or ROM listing
            </a>
          </div>
        </section>
      )}
      {!error && (
        <DevicesListTable
          list={deviceList}
          searchTerm={searchTerm}
          sortOrder={sort}
          statusFilter={status}
          limitFilter={limit}
          maxPage={maxPage}
          currPage={currPage}
        />
      )}

      <style jsx>{`
        .devices-hero {
          margin: 8px 0 20px;
        }

        .devices-hero-inner {
          padding: 0;
        }

        .contribute-link {
          display: inline-block;
          margin-top: 6px;
          font-size: 14px;
        }

        .error-section {
          margin: 20px 0;
          text-align: center;
        }

        .error-section p {
          font-size: 18px;
          color: #e74c3c;
        }
      `}</style>
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

  try {
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
  } catch (err) {
    console.error(err)
    return {
      props: {
        deviceList: [],
        searchTerm: query.q || '',
        sort: query.sort || 'releasedOn:desc',
        status: query.status || 'all',
        limit,
        currPage: query.page || 0,
        maxPage: 0,
        error: 'Oops! Something went wrong.',
      },
    }
  }
}
