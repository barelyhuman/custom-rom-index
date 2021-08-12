import { GithubIcon, LinkedInIcon, TwitterIcon } from "components";

export function Footer({ ...props }) {
  return (
    <div className="container mt-10 items-center mx-auto">
      <footer className="text-blueGray-700 transition duration-500 ease-in-out transform bg-white rounded-lg ">
        <div className="flex flex-col flex-wrap justify-center md:flex-row">
          <span className="inline-flex justify-center w-full mx-auto mt-2 mr-2 sm:ml-auto sm:mt-0">
            <a
              className="ml-3 text-gray-500 hover:text-black"
              href="https://twitter.com/barelyreaper"
            >
              <TwitterIcon />
            </a>
            <a
              className="ml-3 text-gray-500 hover:text-black"
              href="http://github.com/barelyhuman"
            >
              <GithubIcon />
            </a>

            <a
              className="ml-3 text-gray-500 hover:text-black"
              href="https://www.linkedin.com/in/reaperim/"
            >
              <LinkedInIcon />
            </a>
          </span>
        </div>
        <div className="w-full px-8 mt-4 rounded-b-lg bg-blueGray-50">
          <div className="container inline-flex flex-col flex-wrap items-center px-5 py-4 mx-auto sm:flex-row">
            <p className="mx-auto text-sm text-center text-black sm:text-left ">
              2021 - present &copy;{" "}
              <a
                href="https://reaper.im"
                className="text-gray-500 hover:text-black"
              >
                Reaper
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
