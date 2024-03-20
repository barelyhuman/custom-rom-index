import Box from '../../components/box.js';
import { Footer, Header, Note } from '../../components/index.js';
import { Link } from '../../components/link.js';
import { Button } from '../../components/button.js';

import { totalActiveRoms, totalDevices } from '../../lib/analytical-utils.js';

export const render = ({ totalDevicesCount, totalActiveRomsCount }) => {
  return (
    <>
      <Header />
      <Box paddingY-100>
        <div class='text-left'>
          <div>
            <h2> The easiest way to find a rom for your phone. </h2>
            <h1> Custom Rom Index</h1>
            <p>
              If you've wasted hours looking on XDA for android phone's that
              have a custom rom? Well, here's the solution to it all.
            </p>
            <article>
              With about <h3 class='inline-block'>{totalDevicesCount}</h3>{' '}
              devices and <h3 class='inline-block'>{totalActiveRomsCount}</h3>{' '}
              ROM's syncing daily the <strong>Custom Rom Index</strong> has it
              all listed in a friendly and easy to use table.
            </article>
            <Note>
              It is community sourced so if a device is missing, consider
              submitting a request for the same.
            </Note>
            <Box marginT-50 class='flex flex-wrap'>
              <Link href='/devices'>
                <Button primary marginR-16 marginB-12>
                  Go To Index
                </Button>
              </Link>
              <Link href='/submit'>
                <Button marginB-12>Submit ROM</Button>
              </Link>
            </Box>
          </div>
        </div>
      </Box>
      <Box marginY-50>
        <h2>Support</h2>
        <p>
          This project is run by an indie developer and it would be really
          appreciated if you were to support / sponsor the project. You can get
          started by doing so on{' '}
          <a href='http://github.com/sponsors/barelyhuman'>github sponsors</a>
        </p>
      </Box>
      <Footer />
    </>
  );
};

export const onServer = async () => {
  return {
    props: {
      totalDevicesCount: await totalDevices(),
      totalActiveRomsCount: await totalActiveRoms(),
    },
  };
};
