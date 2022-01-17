import { GithubIcon, LinkedInIcon, TwitterIcon } from 'components'

export function Footer ({ ...props }) {
  return (
    <div>
      <footer>
        <div>
          <span>
            <a href='https://twitter.com/barelyreaper'>
              <TwitterIcon />
            </a>
            <a href='http://github.com/barelyhuman'>
              <GithubIcon />
            </a>

            <a href='https://www.linkedin.com/in/reaperim/'>
              <LinkedInIcon />
            </a>
          </span>
        </div>
        <div>
          <div>
            <p>
              2021 - present &copy;{' '}
              <a href='https://reaper.im' className=' hover:text-black'>
                Reaper
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
