export function Link({ href, children, ...props }) {
  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}
