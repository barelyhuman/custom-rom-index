export function Note({ children, ...props }) {
  return (
    <>
      <p className="mb-8 border border-gray-300 px-4 py-2 rounded-md text-base leading-relaxed text-left font-normal">
        <strong>Note: </strong>
        {children}
      </p>
    </>
  );
}
