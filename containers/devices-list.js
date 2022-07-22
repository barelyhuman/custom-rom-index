import { Input } from 'components';
import { options } from 'db/options';

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
  ...props
}) {
  const sortDropRef = useRef();

  const pageLimits = [15, 25, 50, 100];

  return (
    <>
      <div>
        <div>
          <div>
            <form>
              <Input
                name='q'
                marginY-50
                placeholder='Search (eg: device:pixel, codename:bramble, rom:calyx, version:11)'
                defaultValue={searchTerm}
              />
              <button type='submit' className='invisible' />
            </form>
          </div>
          <div className='w-full flex justify-end'>
            <form ref={sortDropRef}>
              <input type='submit' className='invisible w-0 h-0' />
              <select
                defaultValue={sortOrder}
                className='m-1 select rounded-md'
                name='sort'
                onChange={() => sortDropRef.current.submit()}
              >
                <option value='releasedOn:desc'>Released On: Desc</option>
                <option value='releasedOn:asc'>Released On: Asc</option>
              </select>
              <select
                defaultValue={statusFilter}
                className='m-1 select rounded-md'
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
                className='m-1 select rounded-md'
                name='limit'
                onChange={() => sortDropRef.current.submit()}
              >
                {pageLimits.map(x => (
                  <option value={x} key={x}>
                    Per Page: {x}
                  </option>
                ))}
              </select>
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
                  <th>Released On</th>
                  <th>Links</th>
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
                      <td>{deviceItem.basename}</td>
                      <td>{deviceItem.name}</td>
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
