import { Button, Footer, Header, Input, Note } from "components";
import { ActiveDeviceROMsCount } from "containers";
import { SubmitNewRomForm } from "containers/submit-new-rom-form";
import { totalActiveRoms } from "lib/analytical-utils";
import Link from "next/link";

function Home() {
  return (
    <>
      <Header />
      <section className="text-blueGray-700 ">
        <div className="container flex flex-col items-center px-5 py-16 mx-auto md:flex-row lg:px-28">
          <div className="flex flex-col items-start mb-16 text-left lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 md:mb-0">
            <h2 className="mb-8 text-xs font-semibold tracking-widest text-black uppercase title-font">
              {" "}
              The easiest way to find a rom for your device.{" "}
            </h2>
            <h1 className="mb-8 text-2xl font-black tracking-tighter text-black md:text-5xl title-font">
              {" "}
              Custom Rom Index
            </h1>
            <p className="mb-8 text-base leading-relaxed text-left text-blueGray-600 ">
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
            <div className="flex flex-col justify-center lg:flex-row">
              <Link href="/devices">
                <Button>Devices</Button>
              </Link>
              <Link href="/submit-rom">
                <Button secondary>Submit ROM</Button>
              </Link>
            </div>
          </div>
          {/* TODO: enable this after implementing the ability to raise pull requests */}
          {/* <SubmitNewRomForm /> */}
          <div className="flex items-center">
            <ActiveDeviceROMsCount />
          </div>
        </div>
      </section>
      <section className="mx-auto">
        <div className="container px-5 mx-auto md:px-32"></div>
      </section>
      <Footer />
    </>
  );
}

export default Home;
