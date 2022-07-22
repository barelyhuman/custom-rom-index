import { Header } from 'components';
import { DevicesListTable } from 'containers';

import { getDevices } from 'lib/sdk';

function Devices({ deviceList, searchTerm, sort, status, limit }) {
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
      {
        <DevicesListTable
          list={deviceList}
          searchTerm={searchTerm}
          sortOrder={sort}
          statusFilter={status}
          limitFilter={limit}
        />
      }
    </>
  );
}

export default Devices;

export async function getServerSideProps({ query }) {
  const defaultLimit = 15;
  const order = {
    release: 'desc',
  };

  switch (query.sort) {
    case 'releasedOn:asc': {
      order.release = 'asc';
      break;
    }
    case 'releasedOn:desc': {
      order.release = 'desc';
      break;
    }
    default: {
      order.release = 'desc';
      break;
    }
  }

  const deviceList = await getDevices({
    page: query.page || 0,
    limit: query.limit || defaultLimit,
    status: query.status || 'all',
    order,
  });

  return {
    props: {
      deviceList,
      searchTerm: query.q || '',
      sort: query.sort || 'releasedOn:desc',
      status: query.status || 'all',
      limit: query.limit || defaultLimit,
    },
  };
}
