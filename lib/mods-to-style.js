const mgnPattern = /(margin)[TBRLXY]*-/
const padPattern = /(padding)[TBRLXY]*-/
const XPattern = /X$/
const YPattern = /Y$/

const toDims = (value, unit) => {
  if (isNaN(value)) return value

  if (unit) return value + unit

  return +value
}

const normalizeModifer = prop => {
  let x = prop
  return (
    (x.endsWith('T') && (x += 'op')) ||
    (x.endsWith('L') && (x += 'eft')) ||
    (x.endsWith('B') && (x += 'ottom')) ||
    (x.endsWith('R') && (x += 'ight')) ||
    prop
  )
}

/**
 * @name modsToStyle
 * @description convert given modifiers object of the form
 * {margin-10:true} into a style object => {margin:10} with an appended dimensionUnit (eg: "px")
 * @param {Object} mods Object of spacing modifiers
 * @param {string} dimUnit Dimension to append to the style value `(default: "px")
 * @returns {Object} result
 */
export function modsToStyle(mods, dimUnit = 'px') {
  const style = {}

  // collection of props that do not have the above modifiers
  const sanitizedProps = { ...mods }

  for (const key of Object.keys(mods)) {
    if (!(mgnPattern.test(key) || padPattern.test(key))) continue

    // delete from the sanitize as it's a valid modifier
    delete sanitizedProps[key]

    const propSplits = key.split('-')

    // Change the accessor to it's style equivalent eg: marginR => marginRight
    const modifier = normalizeModifer(propSplits[0])

    propSplits[1] = propSplits[1] || 0

    // If not one of the above then check for accessor as X or Y , eg: marginX or marginY
    if (XPattern.test(modifier)) {
      const xProp = modifier.replace(XPattern, '')
      style[xProp + 'Left'] = toDims(propSplits[1], dimUnit)
      style[xProp + 'Right'] = toDims(propSplits[1], dimUnit)
    } else if (YPattern.test(modifier)) {
      const yProp = modifier.replace(YPattern, '')
      style[yProp + 'Top'] = toDims(propSplits[1], dimUnit)
      style[yProp + 'Bottom'] = toDims(propSplits[1], dimUnit)
    } else {
      style[modifier] = toDims(propSplits[1], dimUnit)
    }
  }

  return { style, sanitizedProps }
}
