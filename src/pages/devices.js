import { getDevices } from '../../lib/sdk.js';
import DevicesListTable from '../../containers/devices-list.js';
import { Header } from '../../components/header.js';

export const render = ({
  deviceList,
  searchTerm,
  sort,
  status,
  limit,
  currPage,
  maxPage,
}) => {
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
        statusFilter={status}
        limitFilter={limit}
        maxPage={maxPage}
        currPage={currPage}
      />
    </>
  );
};

export const onServer = async (ctx, params) => {
  const query = new URL(ctx.request.url).searchParams;

  const defaultLimit = 15;
  const order = {
    release: 'desc',
  };
  const limit = query.get('limit') || defaultLimit;

  switch (query.get('sort')) {
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

  const { deviceList, count } = await getDevices({
    page: query.get('page') || 0,
    limit,
    status: query.get('status') || 'all',
    searchTerm: query.get('q') || '',
    order,
  });

  const originalStatus = query.get('status');
  const originalPage = query.get('page');

  return {
    props: {
      deviceList,
      searchTerm: query.get('q') || '',
      sort: query.get('sort') || 'releasedOn:desc',
      status: originalStatus && originalStatus !== 'all' ? +originalStatus : '',
      limit,
      currPage: originalPage ? +originalPage : 0,
      maxPage: Math.floor(count / limit),
    },
  };
};
