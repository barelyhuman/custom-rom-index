import { GithubIcon, TwitterIcon } from 'components';

export function Footer({ ...props }) {
  return (
    <footer className='flex flex-col w-100 items-center justify-center'>
      <div>
        <span>
          <a className='mx-1 my-1' href='https://twitter.com/barelyreaper'>
            <TwitterIcon />
          </a>
          <a
            className='mx-1 my-1'
            href='http://github.com/barelyhuman/custom-rom-index'
          >
            <GithubIcon />
          </a>
        </span>
      </div>
      <div>
        <div>
          <p>
            2021 - present &copy;{' '}
            <a href='https://reaper.is' className=' hover:text-black'>
              Reaper
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
