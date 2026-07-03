import type { Metadata } from 'next'
import { PageShell } from 'app/components/page-shell'

export const metadata: Metadata = {
  title: 'Resume',
  description: 'Resume and experience of dovydas saudys.',
}

export default function ResumePage() {
  return (
    <PageShell>
      <h1 className="text-[clamp(1.75rem,6vw,3rem)] font-medium leading-tight tracking-[-0.03em] text-[var(--foreground)]">
        Resume
      </h1>
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[var(--foreground-muted)] sm:mt-4 sm:text-base">
        Experience, skills, and selected credits. Downloadable PDF coming soon.
      </p>

      <div className="mt-8 space-y-4 sm:mt-10">
        {['Experience', 'Skills', 'Education'].map((section) => (
          <div
            key={section}
            className="rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-5 sm:rounded-2xl sm:p-6"
          >
            <h2 className="text-[15px] font-medium text-[var(--foreground)]">
              {section}
            </h2>
            <p className="mt-2 text-[14px] text-[var(--foreground-muted)]">
              Content placeholder — details to be added.
            </p>
          </div>
        ))}
      </div>
    </PageShell>
  )
}
