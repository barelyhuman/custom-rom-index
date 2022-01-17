import { Button, Header, Note } from 'components'
import Box from 'components/box'
import Link from 'next/link'
import React from 'react'

function Home () {
  return (
    <>
      <Header />
      <Box paddingY-100>
        <div className='text-left'>
          <div>
            <h2> The easiest way to find a rom for your device. </h2>
            <h1> Custom Rom Index</h1>
            <p>
              As an enthusiast, I’ve wasted hours together to find a working ROM
              for my devices and also, sometimes I feel like it’s better to
              spend on devices that already have a great collection of roms.
              Which is why this website was created so you don’t have to waste
              time like I did.
            </p>
            <Note>
              It is community sourced so if a device is missing, consider
              submitting a request for the same.
            </Note>
            <Box marginT-50 className='flex flex-wrap'>
              <Link href='/devices'>
                <Button primary marginR-16 marginB-12>
                  Go To Index
                </Button>
              </Link>
              <Link href='/submit-rom'>
                <Button marginB-12>Submit ROM</Button>
              </Link>
            </Box>
          </div>
        </div>
      </Box>
    </>
  )
}

export default Home
