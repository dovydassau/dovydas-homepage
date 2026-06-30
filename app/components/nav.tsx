import Link from 'next/link'

const menuItems = [
  { name: 'films', href: '/films' },
  { name: 'photo', href: '/photo' },
  { name: 'software', href: '/software' },
  { name: 'diary', href: '/diary' },
]

function Logo() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M3 3H9V9H3V3Z"
        fill="currentColor"
        fillOpacity="0.9"
      />
      <path
        d="M11 3H17V9H11V3Z"
        fill="currentColor"
        fillOpacity="0.55"
      />
      <path
        d="M3 11H9V17H3V11Z"
        fill="currentColor"
        fillOpacity="0.55"
      />
      <path
        d="M11 11H17V17H11V11Z"
        fill="currentColor"
        fillOpacity="0.35"
      />
    </svg>
  )
}

export function Navbar() {
  return (
    <header className="relative w-full px-6 py-5 lg:px-10 lg:py-6">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-[15px] font-medium tracking-tight text-[var(--foreground)] transition-opacity hover:opacity-70"
        >
          <Logo />
          <span>dovydas saudys</span>
        </Link>

        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 items-center text-[14px] text-[var(--foreground-muted)] md:flex"
          aria-label="Main"
        >
          {menuItems.map((item, index) => (
            <span key={item.name} className="flex items-center">
              <Link
                href={item.href}
                className="px-2 transition-colors hover:text-[var(--foreground)]"
              >
                {item.name}
              </Link>
              {index < menuItems.length - 1 && (
                <span className="select-none text-[var(--foreground-subtle)]">
                  |
                </span>
              )}
            </span>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden rounded-full px-4 py-2 text-[13px] font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--surface-muted)] sm:inline-flex"
          >
            contact
          </Link>
          <Link
            href="/resume"
            className="inline-flex rounded-full bg-[var(--foreground)] px-4 py-2 text-[13px] font-medium text-[var(--background)] transition-opacity hover:opacity-85"
          >
            resume
          </Link>
        </div>
      </div>

      <nav
        className="mx-auto mt-4 flex max-w-[1400px] flex-wrap items-center justify-center gap-x-1 gap-y-1 text-[14px] text-[var(--foreground-muted)] md:hidden"
        aria-label="Main mobile"
      >
        {menuItems.map((item, index) => (
          <span key={item.name} className="flex items-center">
            <Link
              href={item.href}
              className="px-1.5 transition-colors hover:text-[var(--foreground)]"
            >
              {item.name}
            </Link>
            {index < menuItems.length - 1 && (
              <span className="select-none text-[var(--foreground-subtle)]">
                |
              </span>
            )}
          </span>
        ))}
      </nav>
    </header>
  )
}
