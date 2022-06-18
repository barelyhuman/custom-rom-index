import { Input } from 'components'

import { getReleasedOn } from 'lib/date-utils'
import { useRef } from 'react'

const STATUS_COLOR_ENUM = {
  active: 'text-success',
  discontinued: 'text-error',
  unknown: 'text-warn'
}

export function DevicesListTable ({ list, searchTerm, sortOrder, ...props }) {
  const sortDropRef = useRef()

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
                className='select'
                name='sort'
                onChange={() => sortDropRef.current.submit()}
              >
                <option value='releasedOn:desc'>Released On: Desc</option>
                <option value='releasedOn:asc'>Released On: Asc</option>
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
                {list.map((deviceItem) => {
                  return (
                    <tr
                      key={deviceItem.id}
                      className=' border-2 border-black mt-1'
                    >
                      <td>{deviceItem.codename}</td>
                      <td>{deviceItem.deviceName}</td>
                      <td>{deviceItem.rom.name}</td>
                      <td>
                        {deviceItem.rom.androidVersion
                          ? deviceItem.rom.androidVersion.join(',')
                          : 'N/A'}
                      </td>
                      <td>
                        <span
                          className={`${
                            STATUS_COLOR_ENUM[deviceItem.rom.status]
                          }`}
                        >
                          {deviceItem.rom.status}
                        </span>
                      </td>
                      <td>{getReleasedOn(deviceItem)}</td>
                      <td>
                        {deviceItem.rom.links.map((link, index) => (
                          <a key={index} href={link}>
                            <i className='material-icons'>launch</i>
                          </a>
                        ))}
                      </td>
                    </tr>
                  )
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
  )
}
