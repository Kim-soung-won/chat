export const darkenRgb = (rgbString: string, amount = 20) => {
  const rgbValues = rgbString.match(/\d+/g)?.map(Number)
  if (!rgbValues) return rgbString
  const [r, g, b] = rgbValues.map((val) => Math.max(0, val - amount))
  return `rgb(${r}, ${g}, ${b})`
}

export const lightenRgb = (rgbString: string, amount = 20) => {
  const rgbValues = rgbString.match(/\d+/g)?.map(Number)
  if (!rgbValues) return rgbString
  const [r, g, b] = rgbValues.map((val) => Math.min(255, val + amount))
  return `rgb(${r}, ${g}, ${b})`
}
