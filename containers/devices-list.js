import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronUpDownIcon,
  Input
} from 'components'
import devices from 'db/devices.json'
import { releaseDateFormatter } from 'lib/date-utils'
import { normaliseSearchableString } from 'lib/search-utils'
import { useCallback, useEffect, useState } from 'react'

const STATUS_COLOR_ENUM = {
  active: 'bg-green-600',
  discontinued: 'bg-red-600',
  unknown: 'bg-yellow-500'
}

function useDeviceList () {
  const [deviceList, setDeviceList] = useState(devices)
  const [sortDirections, setSortDirections] = useState({
    releasedOn: 0
  })

  const sortDevicesByRelease = useCallback(() => {
    const _byReleaseDate = devices
      .slice()
      .sort((x, y) =>
        _sortByReleaseDateAndDirection(x, y, sortDirections.releasedOn)
      )
    setDeviceList(_byReleaseDate)
  }, [sortDirections.releasedOn])

  useEffect(() => {
    if (sortDirections.releasedOn) {
      sortDevicesByRelease(sortDirections.releasedOn)
    }
  }, [sortDirections.releasedOn, sortDevicesByRelease])

  return {
    deviceList,
    setDeviceList,
    sortDirections,
    setSortDirections
  }
}

export function DevicesListTable ({ ...props }) {
  const [searchTerm, setSearchTerm] = useState()

  const { deviceList, setDeviceList, sortDirections, setSortDirections } =
    useDeviceList()

  useEffect(() => {
    onSearch()
  }, [searchTerm])

  function onSearch () {
    if (!searchTerm) {
      return setDeviceList(devices)
    }

    const _filteredDeviceList = devices.filter(filterDevices)
    setDeviceList(_filteredDeviceList)
  }

  function filterDevices (device) {
    const normalisedSearchTerm = searchTerm.toLowerCase()

    const deviceNamesToSearch = []
    const codeNamesToSearch = []
    const romNamesToSearch = []
    const versionsToSearch = []

    // TODO: split into readable logic for the filteration and matching
    // TODO: remove x number of loops and reduce to 2 loops max.

    searchTerm.split(',').forEach((item) => {
      const deviceSplit = item.split('device:')
      const codenameSplit = item.split('codename:')
      const romSplit = item.split('rom:')
      const versionSplit = item.split('version:')

      if (
        deviceSplit.length >= 2 &&
        normaliseSearchableString(deviceSplit[1])
      ) {
        const _term = normaliseSearchableString(deviceSplit[1])
        _term && deviceNamesToSearch.push(_term)
      }
      if (
        codenameSplit.length >= 2 &&
        normaliseSearchableString(codenameSplit[1])
      ) {
        const _term = normaliseSearchableString(codenameSplit[1])
        _term && codeNamesToSearch.push(_term)
      }
      if (romSplit.length >= 2 && normaliseSearchableString(romSplit[1])) {
        const _term = normaliseSearchableString(romSplit[1])
        _term && romNamesToSearch.push(_term)
      }

      if (
        versionSplit.length >= 2 &&
        normaliseSearchableString(versionSplit[1])
      ) {
        const _term = normaliseSearchableString(versionSplit[1])
        _term && versionsToSearch.push(_term)
      }
    })

    const matchState = []

    if (deviceNamesToSearch.length) {
      matchState.push(
        !!deviceNamesToSearch.filter((item) =>
          normaliseSearchableString(device.deviceName).includes(item)
        ).length
      )
    }

    if (codeNamesToSearch.length) {
      matchState.push(
        !!codeNamesToSearch.filter((item) =>
          normaliseSearchableString(device.codename)
            .toLowerCase()
            .includes(item)
        ).length
      )
    }
    if (romNamesToSearch.length) {
      matchState.push(
        !!romNamesToSearch.filter((item) =>
          normaliseSearchableString(device.rom.name)
            .toLowerCase()
            .includes(item)
        ).length
      )
    }

    if (versionsToSearch.length) {
      matchState.push(
        !!versionsToSearch.filter((item) => {
          return device.rom.androidVersion.indexOf(Number(item)) > -1
        }).length
      )
    }

    if (
      deviceNamesToSearch.length ||
      codeNamesToSearch.length ||
      romNamesToSearch.length ||
      versionsToSearch.length
    ) {
      return !(matchState.indexOf(false) > -1)
    }

    return (
      device.deviceName.toLowerCase().includes(normalisedSearchTerm) ||
      device.codename.toLowerCase().includes(normalisedSearchTerm) ||
      device.rom.name.toLowerCase().includes(normalisedSearchTerm)
    )
  }

  const toggleSortDirection = (key) => {
    const _sortDirections = Object.assign({}, sortDirections)
    _sortDirections[key] =
      _sortDirections[key] && _sortDirections[key] === 1 ? -1 : 1
    setSortDirections({
      ..._sortDirections
    })
  }

  const _renderSortDirection = useCallback(
    (key) => {
      if (!sortDirections[key]) {
        return <ChevronUpDownIcon />
      }
      return sortDirections[key] === 1 ? <ArrowDownIcon /> : <ArrowUpIcon />
    },
    [sortDirections]
  )

  return (
    <>
      <div className='container flex flex-col items-center px-5 mx-auto md:flex-row'>
        <div className='w-full'>
          <div className='pr-5 mx-auto'>
            <Input
              label='Search'
              placeholder=' eg: device:pixel, codename:bramble, rom:calyx, version:11'
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className='overflow-auto lg:overflow-visible '>
            <table className='table text-gray-400 border-separate space-y-6 text-sm w-full mx-auto'>
              <thead className='text-gray-500'>
                <tr className='border-2 border-black'>
                  <th className='p-3 text-left'>Codename</th>
                  <th className='p-3 text-left'>Device Name </th>
                  <th className='p-3 text-left'>Rom Name</th>
                  <th className='p-3 text-left'>Android Version(s)</th>
                  <th className='p-3 text-left'>Status</th>
                  <th
                    className='p-3 text-left'
                    onClick={() => toggleSortDirection('releasedOn')}
                  >
                    <div className='flex items-center'>
                      Released On
                      {_renderSortDirection('releasedOn')}
                    </div>
                  </th>
                  <th className='p-3 text-left'>Links</th>
                </tr>
              </thead>
              <tbody>
                {deviceList.map((deviceItem) => {
                  return (
                    <tr
                      key={deviceItem.id}
                      className='text-gray-600 border-2 border-black mt-1'
                    >
                      <td className='p-3 font-semibold'>
                        {deviceItem.codename}
                      </td>
                      <td className='p-3'>{deviceItem.deviceName}</td>
                      <td className='p-3 font-bold'>{deviceItem.rom.name}</td>
                      <td className='p-3'>
                        {deviceItem.rom.androidVersion.join(',')}
                      </td>
                      <td className='p-3'>
                        <span
                          className={`${
                            STATUS_COLOR_ENUM[deviceItem.rom.status]
                          } text-gray-50 rounded-md px-3 py-1`}
                        >
                          {deviceItem.rom.status}
                        </span>
                      </td>
                      <td className='p-3'>{_getReleasedOn(deviceItem)}</td>
                      <td className='p-3 '>
                        {deviceItem.rom.links.map((link, index) => (
                          <a
                            key={index}
                            href={link}
                            className='text-gray-400 hover:text-black mr-2'
                          >
                            <i className='material-icons-outlined text-base'>
                              launch
                            </i>
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
          .table {
            border-spacing: 0 15px;
          }

          i {
            font-size: 1rem !important;
          }

          .table tr {
            border-radius: 20px;
          }

          tr td:nth-child(n + 5),
          tr th:nth-child(n + 5) {
            border-radius: 0 0.625rem 0.625rem 0;
          }

          tr td:nth-child(1),
          tr th:nth-child(1) {
            border-radius: 0.625rem 0 0 0.625rem;
          }
        `}
      </style>
    </>
  )
}

const _getReleasedOn = (deviceItem) => {
  if (!deviceItem.releasedOn) {
    return 'N/A'
  }

  if (typeof deviceItem.releasedOn === 'string') {
    return releaseDateFormatter(String(deviceItem.releasedOn))
  }

  if (Array.isArray(deviceItem.releasedOn)) {
    const multiRelease = deviceItem.releasedOn.map((item) => {
      return Object.keys(item).map((key) => {
        return `${key}:${releaseDateFormatter(String(item[key]))}`
      })
    })

    return multiRelease.join(' | ')
  }

  if (typeof deviceItem.releasedOn === 'number') {
    return deviceItem.releasedOn
  }
}

const _sortByReleaseDateAndDirection = (item, itemTwo, direction = 1) => {
  if (!item.releasedOn) {
    return 1
  }
  if (!itemTwo.releasedOn) {
    return -1
  }

  let firstDateSplits
  let secondDateSplits

  if (Array.isArray(item.releasedOn)) {
    firstDateSplits = item.releasedOn[0][Object.keys(item.releasedOn[0])[0]]
  } else if (typeof item.releasedOn === 'string') {
    firstDateSplits = item.releasedOn.split('-')
  }

  if (Array.isArray(itemTwo.releasedOn)) {
    secondDateSplits =
      itemTwo.releasedOn[0][Object.keys(itemTwo.releasedOn[0])[0]]
  } else if (typeof itemTwo.releasedOn === 'string') {
    secondDateSplits = itemTwo.releasedOn.split('-')
  }

  if (typeof item.releasedOn === 'number') {
    firstDateSplits = [item]
  }

  if (typeof itemTwo.releasedOn === 'number') {
    secondDateSplits = [itemTwo]
  }

  const date = new Date(firstDateSplits[0], firstDateSplits[1] || 2, 1)

  const secondDate = new Date(secondDateSplits[0], secondDateSplits[1] || 2, 1)

  return direction < 0
    ? date.getTime() - secondDate.getTime()
    : secondDate.getTime() - date.getTime()
}
