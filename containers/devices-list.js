import { Input } from 'components';
import { options } from 'db/options';
import { useRouter } from 'next/router';
import { Router } from 'next/router';

import { useRef } from 'react';

const STATUS_COLOR_ENUM = {
  [options.STATUS.active.value]: 'text-success',
  [options.STATUS.discontinued.value]: 'text-error',
  [options.STATUS.unknown.value]: 'text-warn',
};

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
    <>
      <div>
        <div>
          <div className='w-full flex'>
            <form ref={sortDropRef} className='w-full flex'>

            {/* search */}
            <div className='flex w-full flex-2'>
                <Input
                  name='q'
                  marginY-50
                  placeholder='Search (min. 3 characters)'
                  pattern='.{3,}'
                  defaultValue={searchTerm}
                />
                <button type='submit' className='invisible' />
              </div>

              {/* filters */}
              <div className='flex items-center flex-1'>
                <input type='submit' className='invisible w-0 h-0' />
                <select
                  defaultValue={sortOrder}
                  className='m-1 select rounded-md hover:bg-zinc-700 hover:cursor-pointer'
                  name='sort'
                  onChange={() => sortDropRef.current.submit()}
                >
                  <option value='releasedOn:desc'>Released On: Desc</option>
                  <option value='releasedOn:asc'>Released On: Asc</option>
                </select>
                <select
                  defaultValue={statusFilter}
                  className='m-1 select rounded-md hover:bg-zinc-700 hover:cursor-pointer'
                  name='status'
                  onChange={() => sortDropRef.current.submit()}
                >
                  <option value=''>Status: All</option>
                  {Object.keys(options.STATUS).map(x => (
                    <option key={x} value={options.STATUS[x].value}>
                      Status: {options.STATUS[x].label}
                    </option>
                  ))}
                </select>
                <select
                  defaultValue={limitFilter}
                  className='m-1 select rounded-md hover:bg-zinc-700 hover:cursor-pointer'
                  name='limit'
                  onChange={() => sortDropRef.current.submit()}
                >
                  {pageLimits.map(x => (
                    <option value={x} key={x}>
                      Per Page: {x}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* pagination handles */}
              <div className='flex items-center flex-1'>
                <button
                  type='button'
                  onClick={onPrevPage}
                  className='mx-2 bg-zinc-800 hover:cursor-pointer hover:bg-zinc-700 border-0 rounded-md font-bold text-white py-2 px-3'
                >
                  <span className='h-4 w-4'> &larr; </span>
                </button>
                <span className='text-center w-[100px]'>
                  Page {currPage} of {maxPage}
                </span>
                <button
                  type='button'
                  onClick={onNextPage}
                  className='mx-2 bg-zinc-800 hover:cursor-pointer hover:bg-zinc-700 border-0 rounded-md font-bold text-white py-2 px-3'
                >
                  <span className='h-4 w-4'> &rarr; </span>
                </button>
              </div>
            </form>
          </div>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Codename</th>
                  <th>Device Name </th>
                  <th>Rom Name</th>
                  <th>Android Version(s)</th>
                  <th>Status</th>
                  <th className='pr-0 pl-1'>Released On</th>
                  <th className='pr-0 pl-1'>Links</th>
                </tr>
              </thead>
              <tbody>
                {list.map(deviceItem => {
                  return (
                    <tr
                      key={deviceItem.mapping_id}
                      className=' border-2 border-black mt-1'
                    >
                      <td>{deviceItem.codename}</td>
                      <td className='w-[250px]'>{deviceItem.basename}</td>
                      <td className='w-[250px]'>{deviceItem.name}</td>
                      <td>{deviceItem.android_version || 'N/A'}</td>
                      <td>
                        <span
                          className={`${STATUS_COLOR_ENUM[deviceItem.status]}`}
                        >
                          {deviceItem.status_label}
                        </span>
                      </td>
                      <td>{deviceItem.released_on_formatted}</td>
                      {/* <td>
                        {deviceItem.rom.links.map((link, index) => (
                          <a key={index} href={link}>
                            <i className='material-icons'>launch</i>
                          </a>
                        ))}
                      </td> */}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          i {
            font-size: 1rem !important;
          }
        `}
      </style>
    </>
  );
}
