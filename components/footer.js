import { GithubIcon, TwitterIcon } from 'components'

export function Footer({ ...props }) {
  return (
    <footer className="footer-shell flex flex-col w-100 items-center justify-center">
      <div>
        <span>
          <a
            className="mx-2 my-1 social-link"
            href="https://twitter.com/barelyreaper"
          >
            <TwitterIcon />
          </a>
          <a
            className="mx-2 my-1 social-link"
            href="http://github.com/barelyhuman/custom-rom-index"
          >
            <GithubIcon />
          </a>
        </span>
      </div>
      <div>
        <div>
          <p>
            2021 - present &copy;{' '}
            <a href="https://reaper.is" className=" hover:text-black">
              Reaper
            </a>
          </p>
        </div>
      </div>

      <style jsx>{`
        .footer-shell {
          margin-top: 42px;
          border-top: 1px solid var(--overlay);
          padding-top: 20px;
          color: var(--dim);
        }

        .social-link {
          color: var(--dimmer);
        }

        .social-link:hover {
          color: var(--bright);
        }
      `}</style>
    </footer>
  )
}
