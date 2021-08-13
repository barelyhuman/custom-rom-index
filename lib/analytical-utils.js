import { devices, STATUS_ENUM } from 'db'

export function totalActiveRoms () {
  return devices.reduce((acc, item) => {
    if (item.rom.status === STATUS_ENUM.active) {
      return acc + 1
    }
    return acc
  }, 0)
}
