import { options } from 'db/options'
import { useRef } from 'preact/hooks'

const STATUS_COLOR = {
  [options.STATUS.active.value]: 'status-active',
  [options.STATUS.discontinued.value]: 'status-discontinued',
  [options.STATUS.unknown.value]: 'status-unknown',
}

function parseUrl(text) {
  // TODO: Remove once URL's are fixed
  // E.g. https://https//forum.xda-developers.com/t/rom-official-11-0-dot-os-v5-0-poco-x3-surya-karna-18-04-2021.4227955/
  text = text.replace('https://https', 'https')

  const url = new URL(text)
  return url.hostname
}

export function DevicesListTable({
  list,
  searchTerm,
  sortOrder,
  statusFilter,
  limitFilter,
  maxPage,
  currPage,
  ...props
}) {
  const sortDropRef = useRef()

  const pageLimits = [15, 25, 50, 100]

  const hasFilters =
    (searchTerm && searchTerm.length > 0) ||
    (sortOrder && sortOrder !== 'releasedOn:desc') ||
    (statusFilter && statusFilter !== 'all') ||
    (limitFilter && `${limitFilter}` !== '15') ||
    Number(currPage) > 0

  const onNextPage = () => {
    const _pageNum = parseInt(currPage, 10) + 1
    if (_pageNum > maxPage) return
    const url = new URL(window.location.href)
    url.searchParams.set('page', _pageNum)
    window.location.href = url.toString()
  }
  const onPrevPage = () => {
    const _pageNum = parseInt(currPage, 10) - 1
    if (_pageNum < 0) return
    const url = new URL(window.location.href)
    url.searchParams.set('page', _pageNum)
    window.location.href = url.toString()
  }

  return (
    <div className="devices-table-shell my-10 space-y-8">
      <form ref={sortDropRef} className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
          {/* Search */}
          <div className="flex-1">
            <label htmlFor="search" className="sr-only">
              Search device or rom name
            </label>

            <input
              id="search"
              name="q"
              type="search"
              placeholder="Search device or rom..."
              defaultValue={searchTerm}
              className="control-input px-3 h-10 w-full text-sm"
            />
            <p className="text-xs text-dim mt-1 mb-0">
              Tip: search by model name, codename, or ROM name.
            </p>
          </div>

          <div className="sm:flex-1" />

          {/* Pagination */}
          <div className="flex items-center justify-center sm:justify-start space-x-3">
            <button type="button" onClick={onPrevPage} className="page-btn">
              <span className="sr-only">Previous page</span>{' '}
              <span aria-hidden="true">&larr;</span>
            </button>

            <span className="text-xs text-center tabular-nums">
              Page
              <br />
              {currPage * 1 + 1} of {maxPage * 1 + 1}
            </span>

            <button type="button" onClick={onNextPage} className="page-btn">
              <span className="sr-only">Next page</span>{' '}
              <span aria-hidden="true">&rarr;</span>
            </button>
          </div>

          <button
            type="submit"
            className="button primary h-10 min-h-0 py-2 px-4"
          >
            Apply filters
          </button>

          {hasFilters ? (
            <a href="/devices" className="text-sm">
              Clear filters
            </a>
          ) : null}
        </div>

        <div className="flex items-center flex-wrap gap-3 sm:gap-6">
          {/* Sort by released */}
          <div className="flex flex-col shrink-0">
            <label htmlFor="released" className="text-xs mb-px">
              Released
            </label>

            <div className="relative flex items-center shrink-0">
              <select
                id="sort"
                name="sort"
                defaultValue={sortOrder}
                onChange={() => sortDropRef.current.submit()}
                className="control-select w-full cursor-pointer appearance-none py-2 pl-3 pr-10 text-sm transition"
              >
                <option value="releasedOn:desc">Most recent</option>
                <option value="releasedOn:asc">Oldest</option>
              </select>

              <div className="pointer-events-none absolute flex items-center justify-center right-0 z-10 mx-1.5 text-dim">
                <i className="material-icons-round">expand_more</i>
              </div>
            </div>
          </div>

          {/* Status filter */}
          <div className="flex flex-col shrink-0">
            <label htmlFor="status" className="text-xs mb-px">
              Status
            </label>

            <div className="relative flex items-center shrink-0">
              <select
                id="status"
                name="status"
                defaultValue={statusFilter}
                onChange={() => sortDropRef.current.submit()}
                className="control-select w-full cursor-pointer appearance-none py-2 pl-3 pr-10 text-sm transition"
              >
                <option value="all">All</option>

                {Object.keys(options.STATUS).map(x => (
                  <option key={x} value={options.STATUS[x].value}>
                    {options.STATUS[x].label}
                  </option>
                ))}
              </select>

              <div className="pointer-events-none absolute flex items-center justify-center right-0 z-10 mx-1.5 text-dim">
                <i className="material-icons-round">expand_more</i>
              </div>
            </div>
          </div>

          {/* Page limit */}
          <div className="flex flex-col shrink-0">
            <label htmlFor="limit" className="text-xs mb-px">
              Items per page
            </label>

            <div className="relative flex items-center shrink-0">
              <select
                id="limit"
                name="limit"
                defaultValue={limitFilter}
                onChange={() => sortDropRef.current.submit()}
                className="control-select w-full cursor-pointer appearance-none py-2 pl-3 pr-10 text-sm transition"
              >
                {pageLimits.map(x => (
                  <option value={x} key={x}>
                    {x} items
                  </option>
                ))}
              </select>

              <div className="pointer-events-none absolute flex items-center justify-center right-0 z-10 mx-1.5 text-dim">
                <i className="material-icons-round">expand_more</i>
              </div>
            </div>
          </div>
        </div>
      </form>

      {list.length === 0 ? (
        <div className="empty-state">
          <p className="m-0 font-medium">No ROM listings found.</p>
          <p className="mt-1 mb-0 text-dim text-sm">
            Try a broader search, switch status to All, or clear filters.
          </p>
          <a href="/devices" className="inline-block mt-3 text-sm">
            Reset and browse all devices
          </a>
        </div>
      ) : null}

      {list.length > 0 ? (
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-max border-collapse">
            <thead>
              <tr>
                <th className="text-left w-56">Device</th>
                <th className="text-left">ROM</th>
                <th className="text-left">Version</th>
                <th className="text-left">Status</th>
                <th className="text-left">Released</th>
                <th className="text-left w-56">Links</th>
              </tr>
            </thead>

            <tbody>
              {list.map(item => (
                <tr key={item.mapping_id}>
                  <td>
                    <span className="text-sm font-medium">{item.basename}</span>{' '}
                    <span className="text-sm text-dim">({item.codename})</span>
                  </td>
                  <td>
                    <span className="text-sm">{item.name}</span>
                  </td>
                  <td>
                    {item.android_version ? (
                      <span className="text-sm">
                        Android{' '}
                        {item.android_version.includes('.')
                          ? item.android_version
                          : `${item.android_version}.0`}
                      </span>
                    ) : (
                      <span className="text-sm text-dim">N/A</span>
                    )}
                  </td>
                  <td>
                    <span
                      className={`status-label ${STATUS_COLOR[item.status]}`}
                    >
                      {item.status_label}
                    </span>
                  </td>
                  <td>
                    {item.released_on_formatted ? (
                      <span className="text-sm">
                        {item.released_on_formatted}
                      </span>
                    ) : (
                      <span className="text-sm text-dim">N/A</span>
                    )}
                  </td>
                  <td>
                    <ul className="m-0 p-0 list-none space-y-1">
                      {item.links.map(
                        (link, index) =>
                          link && (
                            <li key={index}>
                              <a
                                href={link}
                                title={link}
                                className="table-link text-sm truncate inline-flex items-center"
                              >
                                {parseUrl(link)}
                                <span aria-hidden="true" className="ml-1">
                                  ↗
                                </span>
                              </a>
                            </li>
                          )
                      )}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      <div className="flex items-center justify-center space-x-3 pt-2">
        <button type="button" onClick={onPrevPage} className="page-btn">
          <span className="sr-only">Previous page</span>
          <span aria-hidden="true">&larr;</span>
        </button>

        <span className="text-xs text-center tabular-nums">
          Page
          <br />
          {currPage * 1 + 1} of {maxPage * 1 + 1}
        </span>

        <button type="button" onClick={onNextPage} className="page-btn">
          <span className="sr-only">Next page</span>
          <span aria-hidden="true">&rarr;</span>
        </button>
      </div>

      <style jsx>{`
        .control-input,
        .control-select {
          background: var(--surface);
          border: 1px solid var(--overlay);
          color: var(--text);
          border-radius: 4px;
        }

        .control-input:focus,
        .control-select:focus {
          outline: 2px solid var(--bright);
          outline-offset: 1px;
        }

        .page-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2rem;
          height: 2rem;
          border: 1px solid var(--overlay);
          background: transparent;
          color: var(--dim);
          border-radius: 4px;
          cursor: pointer;
          font-size: 1rem;
        }

        .page-btn:hover {
          color: var(--bright);
          border-color: var(--bright);
        }

        table th,
        table td {
          padding: 0.6rem 0.75rem;
          border-bottom: 1px solid var(--overlay);
          vertical-align: top;
        }

        table th {
          font-size: 11px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--dim);
        }

        tbody tr:hover {
          background: var(--surface);
        }

        .status-label {
          font-size: 13px;
        }

        .status-active {
          color: var(--success);
        }

        .status-discontinued {
          color: var(--error);
        }

        .status-unknown {
          color: var(--warn);
        }

        .table-link {
          color: var(--dim);
          text-decoration: none;
          max-width: 210px;
        }

        .table-link:hover {
          color: var(--bright);
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .empty-state {
          padding: 20px 0;
          border-top: 1px solid var(--overlay);
        }

        .tabular-nums {
          font-variant-numeric: tabular-nums;
        }
      `}</style>
    </div>
  )
}
