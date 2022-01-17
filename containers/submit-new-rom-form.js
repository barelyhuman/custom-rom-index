import { Button, Input } from 'components'

export function SubmitNewRomForm () {
  return (
    <>
      <div className='lg:w-5/6 lg:max-w-lg md:w-1/2'>
        <div>
          <div>
            <h2 className='mb-8 text-s font-bold tracking-wide text-black uppercase title-font'>
              Submit a new rom ?
            </h2>
            <Input label='Custom Rom Name' placeholder='Custom Rom Name' />
            <Input label='Device Code' placeholder='ex: `sargo` for Pixel 3a' />
            {/* TODO: Replace with spacer */}
            <div className='mt-2' />
            <Button>Submit</Button>
            <p>Thank you for the contribution!</p>
          </div>
        </div>
      </div>
    </>
  )
}
