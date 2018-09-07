import * as colorsObj from './colors'

const colors = Object.keys(colorsObj)
export const getColor = function (color) {
  if (!color) return ''
  return colors.indexOf(color) !== -1 ? colorsObj[color] : color
}
