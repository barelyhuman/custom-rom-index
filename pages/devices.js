import { Header } from 'components';
import { DevicesListTable } from 'containers';

import { getDevices } from 'lib/sdk';

function Devices({ deviceList, searchTerm, sort, status, limit,currPage,maxPage, }) {
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
          maxPage={maxPage}
          currPage={currPage}
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

  const {deviceList,count} = await getDevices({
    page: query.page || 0,
    limit: query.limit || defaultLimit,
    status: query.status || 'all',
    order,
  });

  const limit = query.limit || defaultLimit

  return {
    props: {
      deviceList,
      searchTerm: query.q || '',
      sort: query.sort || 'releasedOn:desc',
      status: query.status || 'all',
      limit,
      currPage: query.page || 0 ,
      maxPage: Math.floor(count/limit),
    },
  };
}
