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

export default function Page() {
  return (
    <section className="w-full px-6 pb-16 pt-4 lg:px-10 lg:pb-24 lg:pt-8">
      <div className="mx-auto max-w-[1400px]">
        <h1 className="title max-w-3xl text-[clamp(2.25rem,5vw,4.5rem)] font-medium leading-[1.08] tracking-[-0.03em] text-[var(--foreground)]">
          dovydas is a videographer based in Berlin
        </h1>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/resume"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--foreground)] px-5 py-2.5 text-[14px] font-medium text-[var(--background)] transition-opacity hover:opacity-85"
          >
            resume
            <ArrowDownIcon />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--surface-muted)] px-5 py-2.5 text-[14px] font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--surface-hover)]"
          >
            contact
            <ArrowRightIcon />
          </Link>
        </div>

        <div
          className="relative mt-12 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] lg:mt-16 lg:rounded-3xl"
          aria-label="Video reel placeholder"
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-[var(--foreground-muted)]">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--background)]/60 backdrop-blur-sm">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                aria-hidden="true"
              >
                <path d="M6 4.5L13.5 9L6 13.5V4.5Z" fill="currentColor" />
              </svg>
            </div>
            <p className="text-[13px] tracking-wide">video reel</p>
          </div>
        </div>
      </div>
    </section>
  )
}
