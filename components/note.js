export function Note({ children, ...props }) {
  return (
    <>
      <p>
        <strong>Note: </strong>
        {children}
      </p>
    </>
  );
}
