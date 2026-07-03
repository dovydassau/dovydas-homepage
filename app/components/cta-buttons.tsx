import Link from 'next/link'

function ArrowDownIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7 10.5L2.5 6H5.25V3.5H8.75V6H11.5L7 10.5Z"
        fill="currentColor"
      />
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.5 7H10.5M10.5 7L7.5 4M10.5 7L7.5 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function CtaButtons() {
  return (
    <div className="flex w-full flex-col gap-2.5 min-[480px]:flex-row min-[480px]:flex-wrap min-[480px]:items-center sm:gap-3">
      <Link
        href="/resume"
        className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full bg-[var(--foreground)] px-5 py-2.5 text-[14px] font-medium text-[var(--background)] transition-opacity hover:opacity-85 min-[480px]:min-h-0 min-[480px]:flex-none"
      >
        resume
        <ArrowDownIcon />
      </Link>
      <Link
        href="/contact"
        className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full bg-[var(--surface-muted)] px-5 py-2.5 text-[14px] font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--surface-hover)] min-[480px]:min-h-0 min-[480px]:flex-none"
      >
        contact
        <ArrowRightIcon />
      </Link>
    </div>
  )
}
