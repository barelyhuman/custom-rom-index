import Box from './box.js';

export function Button({ children, primary, ...props }) {
  return (
    <>
      <Box elm='button' className={`${primary && 'primary'} button`} {...props}>
        {children}
      </Box>
    </>
  );
}
