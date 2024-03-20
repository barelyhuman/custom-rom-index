import Box from './box.js';

export function Input({ label, ...props }) {
  return <Box elm='input' className={`input ${props.className}`} {...props} />;
}
