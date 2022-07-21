import { Header } from 'components';
import { DevicesListTable } from 'containers';
import { getDevices } from 'lib/sdk';

function Devices({ deviceList, searchTerm, sort }) {
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
  );
}

export default Devices;

export async function getServerSideProps({ query }) {
  const deviceList = await getDevices();

  console.log({ deviceList });

  if (query.sort) {
    switch (query.sort) {
      case 'releasedOn:asc': {
        break;
      }
      case 'releasedOn:desc': {
        break;
      }
      default: {
        break;
      }
    }
  }

  // if (query.q) deviceList = deviceList.filter(x => filterDevices(x, query.q));

  return {
    props: {
      deviceList,
      searchTerm: query.q || '',
      sort: query.sort || 'releasedOn:desc',
    },
  };
}
