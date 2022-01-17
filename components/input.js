import Box from './box'

export function Input ({ label, ...props }) {
  return <Box elm='input' className={`input ${props.className}`} {...props} />
}
