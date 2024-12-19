export function Header() {
  return (
    <>
      <div>
        <div>
          <div>
            <div className="flex justify-between align-center">
              <a className="no-underline" href="/">
                <div>
                  <div />
                  <h2>cri</h2>
                </div>
              </a>
              <ul className="list-none">
                <li className="inline-block ml-4">
                  <a href="/devices" className="no-underline">
                    ROM Index
                  </a>
                </li>
                <li className="inline-block ml-4">
                  <a href="/submit-rom" className="no-underline">
                    Submit ROM
                  </a>
                </li>
                <li className="inline-block ml-4">
                  <a
                    href="mailto:ahoy@barelyhuman.dev"
                    className="no-underline"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
