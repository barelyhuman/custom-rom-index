import Link from 'next/link'

export function Header () {
  return (
    <>
      <div className='container items-center mx-auto'>
        <div className='text-blueGray-700 transition duration-500 ease-in-out transform bg-white'>
          <div className='p-5 overflow-y-auto whitespace-nowrap scroll-hidden'>
            <div className='flex justify-between'>
              <a href='/' className='py-1 mr-1 ppx-4 focus:outline-none'>
                <div className='inline-flex items-center'>
                  <div className='w-2 h-2 p-2 mr-2 rounded-sm bg-gradient-to-tr from-black to-black' />
                  <h2 className='block p-2 text-xl font-medium tracking-tighter text-black transition duration-500 ease-in-out transform cursor-pointer hover:text-blueGray-500 lg:text-x lg:mr-8'>
                    cri
                  </h2>
                </div>
              </a>
              <ul className='inline-flex items-center list-none'>
                <li>
                  <Link href='/devices'>
                    <a className='px-4 py-1 mr-1 text-base text-gray-600 transition duration-500 ease-in-out transform rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:text-black '>
                      ROM Index
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href='/submit-rom'>
                    <a className='px-4 py-1 mr-1 text-base text-gray-600 transition duration-500 ease-in-out transform rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:text-black '>
                      Submit ROM
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href='mailto:ahoy@barelyhuman.dev'>
                    <a className='px-4 py-1 mr-1 text-base text-gray-600 transition duration-500 ease-in-out transform rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:text-black '>
                      Contact
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
