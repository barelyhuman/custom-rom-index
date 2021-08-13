const db = []

export const STATUS_ENUM = {
  active: 'active',
  discontinued: 'discontinued'
}

const addDevice = (deviceDetails) => {
  db.push({
    ...deviceDetails,
    id: db.length
  })
}

addDevice({
  deviceName: 'Pixel 4a (5G) ',
  codename: 'bramble',
  rom: {
    name: 'CalyxOS',
    androidVersion: [11],
    status: 'active',
    links: ['https://calyxos.org/get/']
  }
})

addDevice({
  deviceName: 'Pixel 5 ',
  codename: 'redfin',
  rom: {
    name: 'CalyxOS',
    androidVersion: [11],
    status: 'active',
    links: ['https://calyxos.org/get/']
  }
})

addDevice({
  deviceName: 'Pixel 4a ',
  codename: 'sunfish',
  rom: {
    name: 'CalyxOS',
    androidVersion: [11],
    status: 'active',
    links: ['https://calyxos.org/get/']
  }
})

addDevice({
  deviceName: 'Pixel 4 XL ',
  codename: 'coral',
  rom: {
    name: 'CalyxOS',
    androidVersion: [11],
    status: 'active',
    links: ['https://calyxos.org/get/']
  }
})

addDevice({
  deviceName: 'Pixel 4 ',
  codename: 'flame',
  rom: {
    name: 'CalyxOS',
    androidVersion: [11],
    status: 'active',
    links: ['https://calyxos.org/get/']
  }
})

addDevice({
  deviceName: 'Pixel 3a XL ',
  codename: 'bonito',
  rom: {
    name: 'CalyxOS',
    androidVersion: [11],
    status: 'active',
    links: ['https://calyxos.org/get/']
  }
})

addDevice({
  deviceName: 'Pixel 3a ',
  codename: 'sargo',
  rom: {
    name: 'CalyxOS',
    androidVersion: [11],
    status: 'active',
    links: ['https://calyxos.org/get/']
  }
})

addDevice({
  deviceName: 'Pixel 3 XL ',
  codename: 'crosshatch',
  rom: {
    name: 'CalyxOS',
    androidVersion: [11],
    status: 'active',
    links: ['https://calyxos.org/get/']
  }
})

addDevice({
  deviceName: 'Pixel 3 ',
  codename: 'blueline',
  rom: {
    name: 'CalyxOS',
    androidVersion: [11],
    status: 'active',
    links: ['https://calyxos.org/get/']
  }
})

addDevice({
  deviceName: 'Pixel 2 XL ',
  codename: 'taimen',
  rom: {
    name: 'CalyxOS',
    androidVersion: [11],
    status: 'active',
    links: ['https://calyxos.org/get/']
  }
})

addDevice({
  deviceName: 'Pixel 2 ',
  codename: 'walleye',
  rom: {
    name: 'CalyxOS',
    androidVersion: [11],
    status: 'active',
    links: ['https://calyxos.org/get/']
  }
})

addDevice({
  deviceName: 'Xiaomi Mi A2 ',
  codename: 'jasmine_sprout',
  rom: {
    name: 'CalyxOS',
    androidVersion: [11],
    status: 'active',
    links: ['https://calyxos.org/get/']
  }
})

addDevice({
  deviceName: 'Asus Zenfone Max M1 ',
  codename: 'X00P',
  rom: {
    name: 'Pixel Experience',
    androidVersion: [11, 10],
    status: 'discontinued',
    links: ['https://download.pixelexperience.org/X00P']
  }
})

addDevice({
  deviceName: 'Asus Zenfone Max M2',
  codename: 'X01AD',
  rom: {
    name: 'Pixel Experience',
    androidVersion: [11],
    status: 'active',
    links: ['https://download.pixelexperience.org/X01AD']
  }
})

addDevice({
  deviceName: 'Asus Zenfone Max M2',
  codename: 'X01AD',
  rom: {
    name: 'Pixel Experience',
    androidVersion: [10],
    status: 'discontinued',
    links: ['https://download.pixelexperience.org/X01AD']
  }
})

addDevice({
  deviceName: 'Asus Zenfone Max Pro M1',
  codename: 'X00TD',
  rom: {
    name: 'Pixel Experience',
    androidVersion: [11],
    status: 'active',
    links: ['https://download.pixelexperience.org/X00TD']
  }
})

addDevice({
  deviceName: 'Asus Zenfone Max Pro M1',
  codename: 'X00TD',
  rom: {
    name: 'Pixel Experience',
    androidVersion: [10],
    status: 'discontinued',
    links: ['https://download.pixelexperience.org/X00TD']
  }
})

addDevice({
  deviceName: 'Asus Zenfone Max Pro M2',
  codename: 'X01BD',
  rom: {
    name: 'Pixel Experience',
    androidVersion: [11],
    status: 'active',
    links: ['https://download.pixelexperience.org/X01BD']
  }
})

addDevice({
  deviceName: 'Asus Zenfone Max Pro M2',
  codename: 'X01BD',
  rom: {
    name: 'Pixel Experience',
    androidVersion: [10],
    status: 'discontinued',
    links: ['https://download.pixelexperience.org/X01BD']
  }
})

addDevice({
  deviceName: 'Mi 9T Pro',
  codename: 'raphael',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://evolution-x.org/device/raphael'],
    name: 'Evolution X'
  }
})

addDevice({
  deviceName: 'Zenfone Max Pro M1',
  codename: 'X00TD',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://evolution-x.org/device/X00TD'],
    name: 'Evolution X'
  }
})

addDevice({
  deviceName: 'Zenfone 5Z',
  codename: 'Z01R',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://evolution-x.org/device/Z01R'],
    name: 'Evolution X'
  }
})

addDevice({
  deviceName: 'G7 ThinQ',
  codename: 'judyln',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://evolution-x.org/device/judyln'],
    name: 'Evolution X'
  }
})

addDevice({
  deviceName: 'Moto G7 Plus',
  codename: 'lake',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://evolution-x.org/device/lake'],
    name: 'Evolution X'
  }
})

addDevice({
  deviceName: 'Moto G5S Plus',
  codename: 'sanders',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://evolution-x.org/device/sanders'],
    name: 'Evolution X'
  }
})

addDevice({
  deviceName: 'One Fusion+',
  codename: 'liber',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://evolution-x.org/device/liber'],
    name: 'Evolution X'
  }
})

addDevice({
  deviceName: 'OnePlus 7 Pro',
  codename: 'guacamole',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://evolution-x.org/device/guacamole'],
    name: 'Evolution X'
  }
})

addDevice({
  deviceName: 'OnePlus 7',
  codename: 'guacamoleb',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://evolution-x.org/device/guacamoleb'],
    name: 'Evolution X'
  }
})

addDevice({
  deviceName: 'OnePlus 8',
  codename: 'instantnoodle',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://evolution-x.org/device/instantnoodle'],
    name: 'Evolution X'
  }
})

addDevice({
  deviceName: 'OnePlus 8 Pro',
  codename: 'instantnoodlep',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://evolution-x.org/device/instantnoodlep'],
    name: 'Evolution X'
  }
})

addDevice({
  deviceName: 'OnePlus 8T',
  codename: 'kebab',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://evolution-x.org/device/kebab'],
    name: 'Evolution X'
  }
})

addDevice({
  deviceName: 'OnePlus 9',
  codename: 'lemonade',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://evolution-x.org/device/lemonade'],
    name: 'Evolution X'
  }
})

addDevice({
  deviceName: 'OnePlus 9 Pro',
  codename: 'lemonadep',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://evolution-x.org/device/lemonadep'],
    name: 'Evolution X'
  }
})

addDevice({
  deviceName: 'Realme 5 Pro',
  codename: 'RMX1971',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://evolution-x.org/device/RMX1971'],
    name: 'Evolution X'
  }
})

addDevice({
  deviceName: 'Realme 6',
  codename: 'RMX2001',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://evolution-x.org/device/RMX2001'],
    name: 'Evolution X'
  }
})

addDevice({
  deviceName: 'Realme 6 Pro',
  codename: 'RMX206X',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://evolution-x.org/device/RMX206X'],
    name: 'Evolution X'
  }
})

addDevice({
  deviceName: 'POCO F3',
  codename: 'alioth',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://evolution-x.org/device/alioth'],
    name: 'Evolution X'
  }
})

addDevice({
  deviceName: 'Mi 10T',
  codename: 'apollo',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://evolution-x.org/device/apollo'],
    name: 'Evolution X'
  }
})

addDevice({
  deviceName: 'Poco M3 / Redmi 9T / Redmi 9 Power / Redmi Note 9 4G',
  codename: 'juice',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://evolution-x.org/device/juice'],
    name: 'Evolution X'
  }
})

addDevice({
  deviceName: 'Redmi K30 / POCO X2',
  codename: 'phoenix',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://evolution-x.org/device/phoenix'],
    name: 'Evolution X'
  }
})

addDevice({
  deviceName: 'Redmi K30 Pro / POCO F2 Pro',
  codename: 'lmi',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://evolution-x.org/device/lmi'],
    name: 'Evolution X'
  }
})

addDevice({
  deviceName: 'Mi 10',
  codename: 'umi',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://evolution-x.org/device/umi'],
    name: 'Evolution X'
  }
})

addDevice({
  deviceName: 'Mi 10 Pro',
  codename: 'cmi',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://evolution-x.org/device/cmi'],
    name: 'Evolution X'
  }
})

addDevice({
  deviceName: 'Mi 9T',
  codename: 'davinci',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://evolution-x.org/device/davinci'],
    name: 'Evolution X'
  }
})

addDevice({
  deviceName: 'Mi 8',
  codename: 'dipper',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://evolution-x.org/device/dipper'],
    name: 'Evolution X'
  }
})

addDevice({
  deviceName: 'Redmi Note 8',
  codename: 'ginkgo',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://evolution-x.org/device/ginkgo'],
    name: 'Evolution X'
  }
})

addDevice({
  deviceName: 'Mi A3',
  codename: 'laurel_sprout',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://evolution-x.org/device/laurel_sprout'],
    name: 'Evolution X'
  }
})

addDevice({
  deviceName: 'Redmi Note 7',
  codename: 'lavender',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://evolution-x.org/device/lavender'],
    name: 'Evolution X'
  }
})

addDevice({
  deviceName: 'Redmi Note 9S, 9 Pro, 9 Pro Max / POCO M2 Pro',
  codename: 'miatoll',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://evolution-x.org/device/miatoll'],
    name: 'Evolution X'
  }
})

addDevice({
  deviceName: 'Mi 9 Lite',
  codename: 'pyxis',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://evolution-x.org/device/pyxis'],
    name: 'Evolution X'
  }
})

addDevice({
  deviceName: 'Mi Mix 2s',
  codename: 'polaris',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://evolution-x.org/device/polaris'],
    name: 'Evolution X'
  }
})

addDevice({
  deviceName: 'Poco X3',
  codename: 'surya',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://evolution-x.org/device/surya'],
    name: 'Evolution X'
  }
})

addDevice({
  deviceName: 'Mi A1',
  codename: 'tissot',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://evolution-x.org/device/tissot'],
    name: 'Evolution X'
  }
})

addDevice({
  deviceName: 'Redmi Note 6 Pro',
  codename: 'tulip',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://evolution-x.org/device/tulip'],
    name: 'Evolution X'
  }
})

addDevice({
  deviceName: 'Redmi Note 5/5 Plus',
  codename: 'vince',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://evolution-x.org/device/vince'],
    name: 'Evolution X'
  }
})

addDevice({
  deviceName: 'Redmi Note 7 Pro',
  codename: 'violet',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://evolution-x.org/device/violet'],
    name: 'Evolution X'
  }
})

addDevice({
  deviceName: 'Redmi Note 5',
  codename: 'whyred',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://evolution-x.org/device/whyred'],
    name: 'Evolution X'
  }
})

addDevice({
  deviceName: 'Asus ROG 2 ',
  codename: 'I001D',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://downloads.blissroms.org/'],
    name: 'BlissROMS'
  }
})

addDevice({
  deviceName: 'Asus ROG 3 ',
  codename: 'obiwan',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://downloads.blissroms.org/'],
    name: 'BlissROMS'
  }
})

addDevice({
  deviceName: 'Asus Zenfone 5Z ',
  codename: 'Z01R',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://downloads.blissroms.org/'],
    name: 'BlissROMS'
  }
})

addDevice({
  deviceName: 'Asus Zenfone 6 ',
  codename: 'I01WD',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://downloads.blissroms.org/'],
    name: 'BlissROMS'
  }
})

addDevice({
  deviceName: 'Google Pixel 3A ',
  codename: 'sargo',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://downloads.blissroms.org/'],
    name: 'BlissROMS'
  }
})

addDevice({
  deviceName: 'Google Pixel 3A XL ',
  codename: 'bonito',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://downloads.blissroms.org/'],
    name: 'BlissROMS'
  }
})

addDevice({
  deviceName: 'Google Pixel 4 XL ',
  codename: 'coral',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://downloads.blissroms.org/'],
    name: 'BlissROMS'
  }
})

addDevice({
  deviceName: 'Google Pixel 4A ',
  codename: 'sunfish',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://downloads.blissroms.org/'],
    name: 'BlissROMS'
  }
})

addDevice({
  deviceName: 'Motorola Moto G7 Play ',
  codename: 'channel',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://downloads.blissroms.org/'],
    name: 'BlissROMS'
  }
})

addDevice({
  deviceName: 'OnePlus 3/3T ',
  codename: 'oneplus3',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://downloads.blissroms.org/'],
    name: 'BlissROMS'
  }
})

addDevice({
  deviceName: 'OnePlus 6 ',
  codename: 'enchilada',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://downloads.blissroms.org/'],
    name: 'BlissROMS'
  }
})

addDevice({
  deviceName: 'OnePlus 6T ',
  codename: 'fajita',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://downloads.blissroms.org/'],
    name: 'BlissROMS'
  }
})

addDevice({
  deviceName: 'OnePlus 7 Pro ',
  codename: 'guacamole',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://downloads.blissroms.org/'],
    name: 'BlissROMS'
  }
})

addDevice({
  deviceName: 'Poco X3 NFC ',
  codename: 'surya',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://downloads.blissroms.org/'],
    name: 'BlissROMS'
  }
})

addDevice({
  deviceName: 'Realme 2 Pro ',
  codename: 'RMX1801',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://downloads.blissroms.org/'],
    name: 'BlissROMS'
  }
})

addDevice({
  deviceName: 'Realme 5 Pro ',
  codename: 'RMX1971',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://downloads.blissroms.org/'],
    name: 'BlissROMS'
  }
})

addDevice({
  deviceName: 'Realme XT ',
  codename: 'RMX1921',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://downloads.blissroms.org/'],
    name: 'BlissROMS'
  }
})

addDevice({
  deviceName: 'Samsung Galaxy Note 9 ',
  codename: 'crownlte',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://downloads.blissroms.org/'],
    name: 'BlissROMS'
  }
})

addDevice({
  deviceName: 'Samsung Galaxy S9 ',
  codename: 'starlte',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://downloads.blissroms.org/'],
    name: 'BlissROMS'
  }
})

addDevice({
  deviceName: 'Samsung Galaxy S9+ ',
  codename: 'star2lte',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://downloads.blissroms.org/'],
    name: 'BlissROMS'
  }
})

addDevice({
  deviceName: 'Xiaomi Mi 10T ',
  codename: 'apollo',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://downloads.blissroms.org/'],
    name: 'BlissROMS'
  }
})

addDevice({
  deviceName: 'Xiaomi Mi 9 Lite/Mi CC9 Meitu ',
  codename: 'pyxis',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://downloads.blissroms.org/'],
    name: 'BlissROMS'
  }
})

addDevice({
  deviceName: 'Xiaomi Mi 9T ',
  codename: 'davinci',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://downloads.blissroms.org/'],
    name: 'BlissROMS'
  }
})

addDevice({
  deviceName: 'Xiaomi POCO M3 / Redmi 9T / Redmi 9 Power / Redmi Note 9 4G ',
  codename: 'juice',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://downloads.blissroms.org/'],
    name: 'BlissROMS'
  }
})

addDevice({
  deviceName: 'Xiaomi Poco F1 ',
  codename: 'beryllium',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://downloads.blissroms.org/'],
    name: 'BlissROMS'
  }
})

addDevice({
  deviceName: 'Xiaomi Redmi K20 Pro / Mi 9T Pro ',
  codename: 'raphael',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://downloads.blissroms.org/'],
    name: 'BlissROMS'
  }
})

addDevice({
  deviceName: 'Xiaomi Redmi Note 5 Pro ',
  codename: 'whyred',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://downloads.blissroms.org/'],
    name: 'BlissROMS'
  }
})

addDevice({
  deviceName: 'Xiaomi Redmi Note 7 Pro ',
  codename: 'violet',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://downloads.blissroms.org/'],
    name: 'BlissROMS'
  }
})

addDevice({
  deviceName: 'Xiaomi Redmi Note 7/7S ',
  codename: 'lavender',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://downloads.blissroms.org/'],
    name: 'BlissROMS'
  }
})

addDevice({
  deviceName: 'Xiaomi Redmi Note 9S/9 Pro/Pro Max/POCO M2 Pro',
  codename: 'miatoll',
  rom: {
    status: 'active',
    androidVersion: [11],
    links: ['https://downloads.blissroms.org/'],
    name: 'BlissROMS'
  }
})

export const devices = db.sort((x, y) =>
  x.codename.toLowerCase() > y.codename.toLowerCase() ? 1 : -1
)
