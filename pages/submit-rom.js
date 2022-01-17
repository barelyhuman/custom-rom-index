import { Button, Header } from 'components'

function SubmitRom ({ ...props }) {
  return (
    <>
      <Header />
      <div>
        <div>
          <h1>Want to add a new rom to the list?</h1>
          <p>
            If you wish to add a rom to the list for whatever reason, follow the
            below steps
          </p>
          <ol>
            <li>
              Visit
              <a
                href='https://github.com/barelyhuman/custom-rom-index'
                className=' hover:text-black'
              >
                {' '}
                https://github.com/barelyhuman/custom-rom-index
              </a>{' '}
              or click on <strong>Submit ROM</strong> below
            </li>
            <li>Fork the repository</li>
            <li>
              Modify <code>scripts/sync-manual-devices.js</code> to add your rom
              with the needed data
            </li>
            <li>Raise a new Pull Request</li>
            <li>Done!</li>
          </ol>
          <p>
            Your <strong>ROM</strong> will be added as soon as we're done
            reviewing the addition
          </p>
          <div>
            <a href='https://github.com/barelyhuman/custom-rom-index/'>
              <Button marginY-50 primary>
                Submit ROM
              </Button>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default SubmitRom
