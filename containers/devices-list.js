import { options } from 'db/options';
import { useRouter } from 'next/router';
import { useRef } from 'react';

const STATUS_COLOR_ENUM = {
  [options.STATUS.active.value]: 'bg-green-700/60 text-white',
  [options.STATUS.discontinued.value]: 'bg-red-700/60 text-white',
  [options.STATUS.unknown.value]: 'bg-yellow-700/60 text-white',
};

function parseUrl(text) {
  // TODO: Remove once URL's are fixed
  // E.g. https://https//forum.xda-developers.com/t/rom-official-11-0-dot-os-v5-0-poco-x3-surya-karna-18-04-2021.4227955/
  text = text.replace('https://https', 'https');

  const url = new URL(text);
  return url.hostname;
}

export function DevicesListTable({
  list,
  searchTerm,
  sortOrder,
  statusFilter,
  limitFilter,
  maxPage,
  currPage,
  ...props
}) {
  const sortDropRef = useRef();
  const router = useRouter();

  const pageLimits = [15, 25, 50, 100];

  const onNextPage = () => {
    const _pageNum = parseInt(currPage, 10) + 1;
    if (_pageNum > maxPage) return;

    router.query.page = _pageNum;
    router.push(router);
  };
  const onPrevPage = () => {
    const _pageNum = parseInt(currPage, 10) - 1;
    if (_pageNum < 0) return;

    router.query.page = _pageNum;
    router.push(router);
  };

  return (
    <div className='my-10 space-y-10'>
      <form ref={sortDropRef} className='space-y-6'>
        <div className='flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6'>
          {/* Search */}
          <div className='flex-1'>
            <label htmlFor='search' className='sr-only'>
              Search device or rom name
            </label>

            <input
              id='search'
              name='q'
              pattern='.{3,}'
              placeholder='Search device or rom...'
              defaultValue={searchTerm}
              className='px-3 h-9 w-full bg-surface text-sm text-text border-none rounded-md placeholder:text-sm placeholder:text-dim'
            />
          </div>

          <div className='sm:flex-1' />

          {/* Pagination */}
          <div className='flex items-center justify-center sm:justify-start space-x-3'>
            <button
              type='button'
              onClick={onPrevPage}
              className='flex items-center justify-center w-9 h-9 bg-surface border-none rounded-md cursor-pointer text-dim text-lg hover:bg-overlay hover:text-text'
            >
              <span className='sr-only'>Previous page</span>{' '}
              <span aria-hidden='true' className='mt-px'>
                &larr;
              </span>
            </button>

            <span className='text-xs text-center tabular-nums'>
              Page
              <br />
              {currPage * 1 + 1} of {maxPage * 1 + 1}
            </span>

            <button
              type='button'
              onClick={onNextPage}
              className='flex items-center justify-center w-9 h-9 bg-surface border-none rounded-md cursor-pointer text-dim text-lg hover:bg-overlay hover:text-text'
            >
              <span className='sr-only'>Next page</span>{' '}
              <span aria-hidden='true' className='mt-px'>
                &rarr;
              </span>
            </button>
          </div>
        </div>

        <div className='flex items-center flex-wrap gap-3 sm:gap-6'>
          {/* Sort by released */}
          <div className='flex flex-col shrink-0'>
            <label htmlFor='released' className='text-xs mb-px'>
              Released
            </label>

            <div className='relative flex items-center shrink-0'>
              <select
                id='sort'
                name='sort'
                defaultValue={sortOrder}
                onChange={() => sortDropRef.current.submit()}
                className='w-full cursor-pointer appearance-none rounded py-1 pl-2 pr-10 text-sm text-dim transition border-none bg-surface hover:bg-overlay hover:text-text'
              >
                {/* TODO: Maybe better names? */}
                <option value='releasedOn:desc'>Most recent</option>
                <option value='releasedOn:asc'>Oldest</option>
              </select>

              <div className='pointer-events-none absolute flex items-center justify-center right-0 z-10 mx-1.5 text-dim'>
                <i className='material-icons-round'>expand_more</i>
              </div>
            </div>
          </div>

          {/* Status filter */}
          <div className='flex flex-col shrink-0'>
            <label htmlFor='status' className='text-xs mb-px'>
              Status
            </label>

            <div className='relative flex items-center shrink-0'>
              <select
                id='status'
                name='status'
                defaultValue={statusFilter}
                onChange={() => sortDropRef.current.submit()}
                className='w-full cursor-pointer appearance-none rounded py-1 pl-2 pr-10 text-sm text-dim transition border-none bg-surface hover:bg-overlay hover:text-text'
              >
                <option value=''>All</option>

                {Object.keys(options.STATUS).map(x => (
                  <option key={x} value={options.STATUS[x].value}>
                    {options.STATUS[x].label}
                  </option>
                ))}
              </select>

              <div className='pointer-events-none absolute flex items-center justify-center right-0 z-10 mx-1.5 text-dim'>
                <i className='material-icons-round'>expand_more</i>
              </div>
            </div>
          </div>

          {/* Page limit */}
          <div className='flex flex-col shrink-0'>
            <label htmlFor='limit' className='text-xs mb-px'>
              Items per page
            </label>

            <div className='relative flex items-center shrink-0'>
              <select
                id='limit'
                name='limit'
                defaultValue={limitFilter}
                onChange={() => sortDropRef.current.submit()}
                className='w-full cursor-pointer appearance-none rounded py-1 pl-2 pr-10 text-sm text-dim transition border-none bg-surface hover:bg-overlay hover:text-text'
              >
                {pageLimits.map(x => (
                  <option value={x} key={x}>
                    {x} items
                  </option>
                ))}
              </select>

              <div className='pointer-events-none absolute flex items-center justify-center right-0 z-10 mx-1.5 text-dim'>
                <i className='material-icons-round'>expand_more</i>
              </div>
            </div>
          </div>
        </div>
        <button type='submit' className='invisible w-0 h-0 absolute' />
      </form>

      <div className='w-full overflow-x-scroll rounded-md'>
        <table className='w-full min-w-max border-collapse rounded-md overflow-y-hidden'>
          <thead className='bg-surface'>
            <tr>
              <th className='text-left w-48'>Device</th>
              <th className='text-left'>Rom</th>
              <th className='text-left'>Version</th>
              <th className='text-left'>Status</th>
              {/* TODO: Replace sort filter with clickable button */}
              <th className='text-left'>Released</th>
              {/* <th className='text-left'>
                <button className='-m-2 p-2 border-none bg-transparent text-text cursor-pointer hover:bg-overlay'>
                  Released&nbsp;&uarr;
                </button>
              </th> */}
              <th className='text-left'>Links</th>
            </tr>
          </thead>

          <tbody>
            {list.map(item => (
              <tr key={item.mapping_id} className='hover:bg-zinc-800/50'>
                <td>
                  <span className='text-sm'>{item.basename}</span>{' '}
                  <span className='text-sm text-dim'>({item.codename})</span>
                </td>
                <td>
                  <span className='text-sm inline-block'>{item.name}</span>
                </td>
                <td>
                  {item.android_version ? (
                    <span className='text-sm'>
                      Android{' '}
                      {item.android_version.includes('.')
                        ? item.android_version
                        : `${item.android_version}.0`}
                    </span>
                  ) : (
                    <span className='text-sm text-dim'>N/A</span>
                  )}
                </td>
                <td>
                  <span
                    className={`${
                      STATUS_COLOR_ENUM[item.status]
                    } text-xs font-medium px-1.5 py-0.5 rounded inline-block`}
                  >
                    {item.status_label}
                  </span>
                </td>
                <td>
                  {item.released_on_formatted ? (
                    <span className='text-sm'>
                      {item.released_on_formatted}
                    </span>
                  ) : (
                    <span className='text-sm text-dim'>N/A</span>
                  )}
                </td>
                <td>
                  <ul className='m-0 p-0 list-none'>
                    {item.links.map(
                      (link, index) =>
                        link && (
                          <li key={index}>
                            <a
                              href={link}
                              title={link}
                              className='text-sm truncate'
                            >
                              {parseUrl(link)}
                            </a>
                          </li>
                        )
                    )}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className='flex items-center justify-center space-x-3'>
        <button
          type='button'
          onClick={onPrevPage}
          className='flex items-center justify-center w-9 h-9 bg-surface border-none rounded-md cursor-pointer text-dim text-lg hover:bg-overlay hover:text-text'
        >
          <span className='sr-only'>Previous page</span>{' '}
          <span aria-hidden='true' className='mt-px'>
            &larr;
          </span>
        </button>

        <span className='text-xs text-center tabular-nums'>
          Page
          <br />
          {currPage * 1 + 1} of {maxPage * 1 + 1}
        </span>

        <button
          type='button'
          onClick={onNextPage}
          className='flex items-center justify-center w-9 h-9 bg-surface border-none rounded-md cursor-pointer text-dim text-lg hover:bg-overlay hover:text-text'
        >
          <span className='sr-only'>Next page</span>{' '}
          <span aria-hidden='true' className='mt-px'>
            &rarr;
          </span>
        </button>
      </div>

      <style jsx>{`
        table th,
        table td {
          padding: 0.5rem;
        }
        table th,
        table th > button {
          font-size: 14px;
          font-weight: 500;
        }
        .tabular-nums {
          font-variant-numeric: tabular-nums;
        }
      `}</style>
    </div>
  );
}
