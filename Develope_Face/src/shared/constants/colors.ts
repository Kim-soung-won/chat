// 달 아이콘을 위한 노란색 (약간 크림색 느낌)
export const moonColor = '#FFC107' // 노란색 (Amber 500)

// 태양 아이콘을 위한 밝은 주황색
export const sunColor = '#FF9800' // 주황색 (Orange 500)

export type ColorOption = {
  name: string
  label: string
  rgb: string
}

export const colorOptions: Array<ColorOption> = [
  // Reds & Pinks
  { name: 'custom-red-velvet', label: 'Red Velvet', rgb: 'rgb(183, 28, 28)' },
  { name: 'custom-crimson', label: 'Crimson', rgb: 'rgb(220, 20, 60)' },
  { name: 'custom-pink', label: 'Pink', rgb: 'rgb(233, 30, 99)' },
  { name: 'custom-salmon', label: 'Salmon', rgb: 'rgb(250, 128, 114)' },

  // Oranges & Yellows
  { name: 'custom-deep-orange', label: 'Deep Orange', rgb: 'rgb(255, 87, 34)' },
  { name: 'custom-coral', label: 'Coral', rgb: 'rgb(255, 127, 80)' },
  { name: 'custom-amber', label: 'Amber', rgb: 'rgb(255, 193, 7)' },
  { name: 'custom-gold', label: 'Gold', rgb: 'rgb(255, 215, 0)' },

  // Greens
  { name: 'custom-lime', label: 'Lime', rgb: 'rgb(205, 220, 57)' },
  {
    name: 'custom-light-green',
    label: 'Light Green',
    rgb: 'rgb(139, 195, 74)',
  },
  {
    name: 'custom-forest-green',
    label: 'Forest Green',
    rgb: 'rgb(34, 139, 34)',
  },
  { name: 'custom-mint-green', label: 'Mint Green', rgb: 'rgb(102, 204, 170)' },
  { name: 'custom-teal', label: 'Teal', rgb: 'rgb(0, 150, 136)' },
  { name: 'custom-olive', label: 'Olive', rgb: 'rgb(128, 128, 0)' },

  // Blues
  { name: 'custom-cyan', label: 'Cyan', rgb: 'rgb(0, 188, 212)' },
  { name: 'custom-sky-blue', label: 'Sky Blue', rgb: 'rgb(135, 206, 235)' },
  { name: 'custom-light-blue', label: 'Light Blue', rgb: 'rgb(3, 169, 244)' },
  { name: 'custom-steel-blue', label: 'Steel Blue', rgb: 'rgb(70, 130, 180)' },
  { name: 'custom-indigo', label: 'Indigo', rgb: 'rgb(63, 81, 181)' },
  { name: 'custom-navy', label: 'Navy', rgb: 'rgb(0, 0, 128)' },

  // Purples
  {
    name: 'custom-deep-purple',
    label: 'Deep Purple',
    rgb: 'rgb(103, 58, 183)',
  },
  { name: 'custom-lavender', label: 'Lavender', rgb: 'rgb(204, 153, 255)' },
  { name: 'custom-violet', label: 'Violet', rgb: 'rgb(238, 130, 238)' },
  { name: 'custom-magenta', label: 'Magenta', rgb: 'rgb(255, 0, 255)' },

  // Browns
  { name: 'custom-brown', label: 'Brown', rgb: 'rgb(121, 85, 72)' },
  { name: 'custom-sienna', label: 'Sienna', rgb: 'rgb(160, 82, 45)' },
  { name: 'custom-chocolate', label: 'Chocolate', rgb: 'rgb(210, 105, 30)' },

  // Greys & Neutrals
  { name: 'custom-blue-grey', label: 'Blue Grey', rgb: 'rgb(96, 125, 139)' },
  { name: 'custom-slate-gray', label: 'Slate Gray', rgb: 'rgb(112, 128, 144)' },
  { name: 'custom-silver', label: 'Silver', rgb: 'rgb(192, 192, 192)' },
  { name: 'custom-beige', label: 'Beige', rgb: 'rgb(245, 245, 220)' },
  { name: 'custom-white', label: 'White', rgb: 'rgb(255, 255, 255)' },
  { name: 'custom-black', label: 'Black', rgb: 'rgb(0, 0, 0)' },
]
