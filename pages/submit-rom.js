import { Button, Header } from 'components'

function SubmitRom({ ...props }) {
  return (
    <>
      <Header />
      <div>
        <div>
          <h1>Contribute a missing ROM listing</h1>
          <p>
            Spotted a missing device or ROM? The fastest way is opening a GitHub
            issue with basic details. If you prefer, you can still submit a PR.
          </p>

          <h2>Quick contribution (recommended)</h2>
          <ol>
            <li>
              Open
              <a
                href="https://github.com/barelyhuman/custom-rom-index"
                className=" hover:text-black"
              >
                {' '}
                https://github.com/barelyhuman/custom-rom-index
              </a>
            </li>
            <li>
              Create a new issue with your device codename, ROM name, and links
            </li>
            <li>We review and add it to the index</li>
          </ol>

          <h2>Advanced contribution (PR)</h2>
          <ol>
            <li>Fork the repository</li>
            <li>
              Modify <code>scripts/sync-manual-devices.js</code> to add your ROM
              with the needed data
            </li>
            <li>Raise a new Pull Request</li>
          </ol>
          <p>Your listing will be added once we complete the review.</p>
          <div>
            <a href="https://github.com/barelyhuman/custom-rom-index/">
              <Button marginY-50 primary>
                Open GitHub Repository
              </Button>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default SubmitRom
