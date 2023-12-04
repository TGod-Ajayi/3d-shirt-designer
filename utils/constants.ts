export const EditorTabs = [
  {
    name: 'colorpicker',
    icon: '/assets/swatch.png',
  },
  {
    name: 'filepicker',
    icon: '/assets/file.png',
  },
  // {
  //   name: 'aipicker',
  //   icon: '/assets/ai.png',
  // },
];

export const FilterTabs = [
  {
    name: 'logoShirt',
    icon: '/assets/logo-tshirt.png',
  },
  {
    name: 'stylishShirt',
    icon: '/assets/stylish-tshirt.png',
  },
];

export const DecalTypes = {
  logo: {
    stateProperty: 'logoDecal',
    filterTab: 'logoShirt',
  },
  full: {
    stateProperty: 'fullDecal',
    filterTab: 'stylishShirt',
  },
};
