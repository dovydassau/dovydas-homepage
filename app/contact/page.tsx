import type { Metadata } from 'next'
import { PageShell } from 'app/components/page-shell'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with dovydas saudys.',
}

export default function ContactPage() {
  return (
    <PageShell>
      <h1 className="text-[clamp(1.75rem,6vw,3rem)] font-medium leading-tight tracking-[-0.03em] text-[var(--foreground)]">
        Contact
      </h1>
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[var(--foreground-muted)] sm:mt-4 sm:text-base">
        For collaborations, commissions, or general inquiries — reach out below.
      </p>

      <div className="mt-8 max-w-lg space-y-4 sm:mt-10">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-5 sm:rounded-2xl sm:p-6">
          <p className="text-[13px] uppercase tracking-wide text-[var(--foreground-subtle)]">
            Email
          </p>
          <p className="mt-2 text-[15px] text-[var(--foreground-muted)]">
            hello@example.com
          </p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-5 sm:rounded-2xl sm:p-6">
          <p className="text-[13px] uppercase tracking-wide text-[var(--foreground-subtle)]">
            Location
          </p>
          <p className="mt-2 text-[15px] text-[var(--foreground-muted)]">
            Berlin, Germany
          </p>
        </div>
      </div>
    </PageShell>
  )
}
