export function Header() {
  return (
    <>
      <header className="app-header">
        <div className="header-inner">
          <a className="brand-link" href="/">
            <span className="brand-text">Custom ROM Index</span>
          </a>

          <nav>
            <ul className="nav-list">
              <li>
                <a href="/devices" className="nav-link">
                  Browse
                </a>
              </li>
              <li>
                <a href="/submit-rom" className="nav-link">
                  Contribute
                </a>
              </li>
              <li>
                <a href="mailto:ahoy@barelyhuman.dev" className="nav-link">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <style jsx>{`
        .app-header {
          border-bottom: 1px solid var(--overlay);
          margin-bottom: 22px;
          padding: 12px 0 14px;
        }

        .header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }

        .brand-link {
          text-decoration: none;
        }

        .brand-text {
          color: var(--bright);
          font-weight: 600;
          font-size: 0.95rem;
          letter-spacing: -0.01em;
        }

        .nav-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .nav-link {
          text-decoration: none;
          color: var(--dim);
          font-size: 0.9rem;
        }

        .nav-link:hover {
          color: var(--bright);
          text-decoration: underline;
          text-underline-offset: 4px;
        }
      `}</style>
    </>
  )
}
