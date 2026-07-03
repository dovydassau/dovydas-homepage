function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="page-shell py-8 sm:py-10">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 border-t border-[var(--border)] pt-8 md:flex-row md:items-center md:justify-between">
        <p className="text-[13px] text-[var(--foreground-muted)]">
          © {new Date().getFullYear()} dovydas saudys
        </p>
        <ul className="flex flex-col gap-2 text-[13px] text-[var(--foreground-muted)] sm:flex-row sm:gap-6">
          <li>
            <a
              className="flex items-center transition-colors hover:text-[var(--foreground)]"
              rel="noopener noreferrer"
              target="_blank"
              href="/rss"
            >
              <ArrowIcon />
              <span className="ml-2">rss</span>
            </a>
          </li>
          <li>
            <a
              className="flex items-center transition-colors hover:text-[var(--foreground)]"
              rel="noopener noreferrer"
              target="_blank"
              href="https://github.com"
            >
              <ArrowIcon />
              <span className="ml-2">github</span>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
