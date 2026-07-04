import type { Metadata } from 'next'
import { PageShell } from 'app/components/page-shell'
import { ContactForm } from './contact-form'

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
        For collaborations, commissions, or general inquiries — send a message
        and I&apos;ll get back to you.
      </p>

      <div className="mt-8 max-w-lg sm:mt-10">
        <ContactForm />
      </div>
    </PageShell>
  )
}
