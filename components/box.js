import { h } from 'preact'
import { modsToStyle } from '../lib/mods-to-style'

const Box = function ({ elm = 'div', children, ...props }) {
  const { style, sanitizedProps } = modsToStyle(props, '') // pass dimension as an empty string so it used the actual numbers

  return h(
    elm,
    {
      style,
      ...sanitizedProps,
    },
    children
  )
}

export default Box
