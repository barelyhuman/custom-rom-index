const db = [];

export const STATUS_ENUM = {
  active: "active",
  discontinued: "discontinued",
};

const addDevice = (deviceDetails) => {
  db.push({
    ...deviceDetails,
    id: db.length,
  });
};

addDevice({
  deviceName: "Pixel 4a (5G) ",
  codename: "bramble",
  rom: {
    name: "CalyxOS",
    androidVersion: [11],
    status: "active",
    links: ["https://calyxos.org/get/"],
  },
});

addDevice({
  deviceName: "Pixel 5 ",
  codename: "redfin",
  rom: {
    name: "CalyxOS",
    androidVersion: [11],
    status: "active",
    links: ["https://calyxos.org/get/"],
  },
});

addDevice({
  deviceName: "Pixel 4a ",
  codename: "sunfish",
  rom: {
    name: "CalyxOS",
    androidVersion: [11],
    status: "active",
    links: ["https://calyxos.org/get/"],
  },
});

addDevice({
  deviceName: "Pixel 4 XL ",
  codename: "coral",
  rom: {
    name: "CalyxOS",
    androidVersion: [11],
    status: "active",
    links: ["https://calyxos.org/get/"],
  },
});

addDevice({
  deviceName: "Pixel 4 ",
  codename: "flame",
  rom: {
    name: "CalyxOS",
    androidVersion: [11],
    status: "active",
    links: ["https://calyxos.org/get/"],
  },
});

addDevice({
  deviceName: "Pixel 3a XL ",
  codename: "bonito",
  rom: {
    name: "CalyxOS",
    androidVersion: [11],
    status: "active",
    links: ["https://calyxos.org/get/"],
  },
});

addDevice({
  deviceName: "Pixel 3a ",
  codename: "sargo",
  rom: {
    name: "CalyxOS",
    androidVersion: [11],
    status: "active",
    links: ["https://calyxos.org/get/"],
  },
});

addDevice({
  deviceName: "Pixel 3 XL ",
  codename: "crosshatch",
  rom: {
    name: "CalyxOS",
    androidVersion: [11],
    status: "active",
    links: ["https://calyxos.org/get/"],
  },
});

addDevice({
  deviceName: "Pixel 3 ",
  codename: "blueline",
  rom: {
    name: "CalyxOS",
    androidVersion: [11],
    status: "active",
    links: ["https://calyxos.org/get/"],
  },
});

addDevice({
  deviceName: "Pixel 2 XL ",
  codename: "taimen",
  rom: {
    name: "CalyxOS",
    androidVersion: [11],
    status: "active",
    links: ["https://calyxos.org/get/"],
  },
});

addDevice({
  deviceName: "Pixel 2 ",
  codename: "walleye",
  rom: {
    name: "CalyxOS",
    androidVersion: [11],
    status: "active",
    links: ["https://calyxos.org/get/"],
  },
});

addDevice({
  deviceName: "Xiaomi Mi A2 ",
  codename: "jasmine_sprout",
  rom: {
    name: "CalyxOS",
    androidVersion: [11],
    status: "active",
    links: ["https://calyxos.org/get/"],
  },
});

addDevice({
  deviceName: "Asus Zenfone Max M1 ",
  codename: "X00P",
  rom: {
    name: "Pixel Experience",
    androidVersion: [11, 10],
    status: "discontinued",
    links: ["https://download.pixelexperience.org/X00P"],
  },
});

addDevice({
  deviceName: "Asus Zenfone Max M2",
  codename: "X01AD",
  rom: {
    name: "Pixel Experience",
    androidVersion: [11],
    status: "active",
    links: ["https://download.pixelexperience.org/X01AD"],
  },
});
addDevice({
  deviceName: "Asus Zenfone Max M2",
  codename: "X01AD",
  rom: {
    name: "Pixel Experience",
    androidVersion: [10],
    status: "discontinued",
    links: ["https://download.pixelexperience.org/X01AD"],
  },
});

addDevice({
  deviceName: "Asus Zenfone Max Pro M1",
  codename: "X00TD",
  rom: {
    name: "Pixel Experience",
    androidVersion: [11],
    status: "active",
    links: ["https://download.pixelexperience.org/X00TD"],
  },
});
addDevice({
  deviceName: "Asus Zenfone Max Pro M1",
  codename: "X00TD",
  rom: {
    name: "Pixel Experience",
    androidVersion: [10],
    status: "discontinued",
    links: ["https://download.pixelexperience.org/X00TD"],
  },
});

addDevice({
  deviceName: "Asus Zenfone Max Pro M2",
  codename: "X01BD",
  rom: {
    name: "Pixel Experience",
    androidVersion: [11],
    status: "active",
    links: ["https://download.pixelexperience.org/X01BD"],
  },
});
addDevice({
  deviceName: "Asus Zenfone Max Pro M2",
  codename: "X01BD",
  rom: {
    name: "Pixel Experience",
    androidVersion: [10],
    status: "discontinued",
    links: ["https://download.pixelexperience.org/X01BD"],
  },
});

export const devices = db.sort((x, y) =>
  x.deviceName > y.deviceName ? 1 : -1
);
