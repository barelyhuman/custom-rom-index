import Link from 'next/link';

export function Header() {
  return (
    <>
      <div>
        <div>
          <div>
            <div className='flex justify-between align-center'>
              <a className='no-underline' href='/'>
                <div>
                  <div />
                  <h2>cri</h2>
                </div>
              </a>
              <ul className='list-none'>
                <li className='inline-block ml-4'>
                  <Link href='/devices'>
                    <a className='no-underline'>ROM Index</a>
                  </Link>
                </li>
                <li className='inline-block ml-4'>
                  <Link href='/submit-rom'>
                    <a className='no-underline'>Submit ROM</a>
                  </Link>
                </li>
                <li className='inline-block ml-4'>
                  <Link href='mailto:ahoy@barelyhuman.dev'>
                    <a className='no-underline'>Contact</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
