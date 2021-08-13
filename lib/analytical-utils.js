import { devices, STATUS_ENUM } from 'db'

export function totalActiveRoms () {
  return devices.reduce((acc, item) => {
    if (item.rom.status === STATUS_ENUM.active) {
      return acc + 1
    }
    return acc
  }, 0)
}

export function topThreeInROMCount () {
  const groupedByCodename = devices.reduce((acc, deviceItem) => {
    (acc[deviceItem.codename] || (acc[deviceItem.codename] = [])).push(
      deviceItem
    )
    return acc
  }, {})

  const sortByHighestFirst = Object.keys(groupedByCodename).sort(
    (x, y) => groupedByCodename[y].length - groupedByCodename[x].length
  )

  return sortByHighestFirst.slice(0, 3).map((item) => {
    return {
      name: groupedByCodename[item][0].deviceName,
      count: groupedByCodename[item].length
    }
  })
}
