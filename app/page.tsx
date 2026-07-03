import { CtaButtons } from 'app/components/cta-buttons'
import { HeroHeadline } from 'app/components/hero-headline'
import { PageShell } from 'app/components/page-shell'

export default function Page() {
  return (
    <PageShell>
      <HeroHeadline />

      <div className="mt-6 sm:mt-8">
        <CtaButtons />
      </div>

      <div
        className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] sm:mt-12 sm:rounded-2xl lg:mt-16 lg:rounded-3xl"
        aria-label="Video reel placeholder"
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 text-[var(--foreground-muted)] sm:gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--background)]/60 backdrop-blur-sm sm:h-14 sm:w-14">
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
          <p className="text-[12px] tracking-wide sm:text-[13px]">video reel</p>
        </div>
      </div>
    </PageShell>
  )
}
