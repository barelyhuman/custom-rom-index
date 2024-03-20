export function Header() {
  return (
    <>
      <header>
        <div class='flex justify-between align-center'>
          <a class='no-underline' href='/'>
            <div>
              <div />
              <h2>cri</h2>
            </div>
          </a>
          <ul class='list-none'>
            <li class='inline-block ml-4'>
              <a href='/devices' class='no-underline'>
                ROM Index
              </a>
            </li>
            <li class='inline-block ml-4'>
              <a href='/submit-rom' class='no-underline'>
                Submit ROM
              </a>
            </li>
            <li class='inline-block ml-4'>
              <a href='mailto:ahoy@barelyhuman.dev' class='no-underline'>
                Contact
              </a>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}
