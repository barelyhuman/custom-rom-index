import Box from '../components/box.js'
import { Footer, Header } from '../components/index.js'
import { Link } from '../components/link.js'
import { totalActiveRoms, totalDevices } from '../lib/analytical-utils'

function Home({ totalDevicesCount, totalActiveRomsCount }) {
  return (
    <>
      <Header />
      <Box paddingY-100>
        <div className="search-hero">
          <h1>Find ROM support before you buy.</h1>
          <p className="sub">
            {totalDevicesCount} devices tracked &middot; {totalActiveRomsCount}{' '}
            active ROM listings &middot; community-updated
          </p>

          <form action="/devices" method="get" className="landing-search">
            <label htmlFor="home-search" className="sr-only">
              Search by phone model, codename, or ROM
            </label>
            <input
              id="home-search"
              type="search"
              name="q"
              placeholder="Search phone model, codename, or ROM..."
            />
            <button type="submit" className="search-btn">
              Search
            </button>
          </form>

          <p className="hint">
            Buying new? Try a broad model search. Already have a phone? Search
            by codename for faster results.
          </p>
        </div>
      </Box>

      <Box marginY-50>
        <h2>How it works</h2>
        <ol>
          <li>Search by model, codename, or ROM name.</li>
          <li>Filter by status, release date, and page size.</li>
          <li>Open source links and pick the right path for your device.</li>
        </ol>
      </Box>

      <Box marginY-50>
        <h2>Contribute data</h2>
        <p>
          Missing a device or ROM? Submit details in a few minutes and help
          others pick better devices.
        </p>
        <Link href="/submit-rom" marginT-12>
          Share a ROM listing
        </Link>
      </Box>

      <Box marginY-50>
        <h2>Support</h2>
        <p>
          This project is run by an indie developer. If it helps, consider
          supporting it on{' '}
          <a href="http://github.com/sponsors/barelyhuman">GitHub Sponsors</a>.
        </p>
      </Box>
      <Footer />

      <style jsx>{`
        .search-hero {
          max-width: 680px;
          padding: 24px 0 8px;
        }

        h1 {
          margin-bottom: 6px;
        }

        .sub {
          color: var(--dim);
          font-size: 14px;
          margin: 0 0 20px;
        }

        .landing-search {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .landing-search input {
          flex: 1;
          background: var(--surface);
          border: 1px solid var(--overlay);
          color: var(--text);
          border-radius: 4px;
          height: 40px;
          padding: 0 12px;
          font-size: 14px;
        }

        .landing-search input::placeholder {
          color: var(--dim);
        }

        .search-btn {
          height: 40px;
          padding: 0 16px;
          border: 1px solid var(--overlay);
          border-radius: 4px;
          background: transparent;
          color: var(--bright);
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          white-space: nowrap;
        }

        .search-btn:hover {
          border-color: var(--bright);
        }

        .hint {
          color: var(--dim);
          font-size: 13px;
          margin-top: 10px;
        }

        @media (max-width: 600px) {
          .landing-search {
            flex-direction: column;
            align-items: stretch;
          }
        }
      `}</style>
    </>
  )
}

export default Home

export async function getServerSideProps() {
  return {
    props: {
      totalDevicesCount: await totalDevices(),
      totalActiveRomsCount: await totalActiveRoms(),
    },
  }
}
