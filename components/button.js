export function Button({ children, secondary, ...props }) {
  const sharedClasses =
    "px-16 py-2 my-2 mr-2 border-2 border-black text-base transition duration-500 ease-in-out transform  rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2";

  const classList = `${sharedClasses} ${
    secondary
      ? "text-black bg-transparent hover:border-transparent"
      : "text-white bg-black hover:bg-transparent hover:text-black hover:border-black"
  }`;

  return (
    <>
      <button className={classList} {...props}>
        {children}
      </button>
    </>
  );
}
