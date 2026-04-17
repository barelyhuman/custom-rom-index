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
          <p className="eyebrow">Custom ROM Index</p>
          <h1>Find ROM support before you buy.</h1>

          <form action="/devices" method="get" className="landing-search">
            <label htmlFor="home-search" className="sr-only">
              Search by phone model, codename, or ROM
            </label>
            <input
              id="home-search"
              type="search"
              name="q"
              placeholder="Search phone model, codename, or ROM"
            />
            <button type="submit">Search</button>
          </form>

          <div className="stats-row">
            <p>
              <strong>{totalDevicesCount}</strong> devices tracked
            </p>
            <p>
              <strong>{totalActiveRomsCount}</strong> active ROM listings
            </p>
            <p>Updated daily from community sources</p>
          </div>

          <p className="search-helper">
            Buying new? Start with broad search. Already have a phone? Search by
            codename for faster results.
          </p>

          <div className="quick-actions">
            <Link href="/devices" primary marginR-12 marginB-12>
              Compare ROM-ready phones
            </Link>
            <Link href="/devices" marginB-12>
              Find ROMs for my phone
            </Link>
          </div>
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
          max-width: 860px;
          margin: 0 auto;
          text-align: center;
        }

        .eyebrow {
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-size: 12px;
          color: var(--dim);
        }

        .landing-search {
          margin-top: 20px;
          display: flex;
          gap: 12px;
          align-items: center;
          justify-content: center;
        }

        .landing-search input {
          flex: 1;
          max-width: 620px;
          background: var(--surface);
          border: 1px solid var(--overlay);
          color: var(--text);
          border-radius: 999px;
          min-height: 52px;
          padding: 0 18px;
        }

        .landing-search button {
          min-height: 52px;
          padding: 0 20px;
          border: none;
          border-radius: 999px;
          color: white;
          background: var(--success);
          font-weight: 600;
          cursor: pointer;
        }

        .stats-row {
          margin-top: 16px;
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .stats-row p {
          margin: 0;
          font-size: 14px;
        }

        .search-helper {
          margin-top: 14px;
          color: var(--dim);
        }

        .quick-actions {
          margin-top: 22px;
        }

        @media (max-width: 900px) {
          .landing-search {
            flex-direction: column;
          }

          .landing-search input {
            width: 100%;
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
