export function Input ({ label, ...props }) {
  return (
    <div className='relative mt-4'>
      <label
        htmlFor={props.id}
        className='text-base leading-7 text-blueGray-500'
      >
        {label}
      </label>
      <input
        className='w-full px-4 py-2 mt-2 border-2 border-gray-300 text-base text-black transition duration-500 ease-in-out transform rounded-md bg-black-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2'
        {...props}
      />
    </div>
  )
}
