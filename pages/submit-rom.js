import { Button, Header } from 'components'

function SubmitRom ({ ...props }) {
  return (
    <>
      <Header />
      <div className='container items-center mx-auto'>
        <div className='p-5 overflow-y-auto whitespace-nowrap'>
          <h1 class='mx-auto mb-12 text-2xl font-semibold leading-none tracking-tighter text-black lg:text-3xl title-font'>
            Want to add a new rom to the list?
          </h1>

          <p class='mx-auto text-base font-medium leading-relaxed text-gray-700 '>
            If you wish to add a rom to the list for whatever reason, follow the
            below steps
          </p>
          <ol class='list-decimal mt-4 list-inside mx-auto text-base font-medium leading-relaxed text-gray-700 '>
            <li>
              Visit
              <a
                href='https://github.com/barelyhuman/custom-rom-index'
                className='text-gray-500 hover:text-black'
              >
                {' '}
                https://github.com/barelyhuman/custom-rom-index
              </a>{' '}
              or click on <strong>Submit ROM</strong> below
            </li>
            <li>Fork the repository</li>
            <li>
              Modify <code className='bg-gray-100 p-1 rounded-sm'>db.js</code>{' '}
              to add your rom with the needed data
            </li>
            <li>Raise a new Pull Request</li>
            <li>Done!</li>
          </ol>
          <p class='mx-auto mt-2 text-base font-medium leading-relaxed text-gray-700 '>
            Your <strong>ROM</strong> will be added as soon as we're done
            reviewing the addition
          </p>
          <div className='mt-8'>
            <a href='https://github.com/barelyhuman/custom-rom-index/'>
              <Button>Submit ROM</Button>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default SubmitRom
