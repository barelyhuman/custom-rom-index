import Box from './box.js'

export function Link({ children, primary, ...props }) {
  return (
    <>
      <Box elm="a" className={`${primary && 'primary'} button`} {...props}>
        {children}
      </Box>
    </>
  )
}
