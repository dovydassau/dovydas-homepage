import { PageShell } from './page-shell'

type SectionPlaceholderProps = {
  title: string
  description: string
  itemLabel: string
}

export function SectionPlaceholder({
  title,
  description,
  itemLabel,
}: SectionPlaceholderProps) {
  return (
    <PageShell>
      <h1 className="text-[clamp(1.75rem,6vw,3rem)] font-medium leading-tight tracking-[-0.03em] text-[var(--foreground)]">
        {title}
      </h1>
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[var(--foreground-muted)] sm:mt-4 sm:text-base">
        {description}
      </p>

      <div className="mt-8 grid grid-cols-1 gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={index}
            className="flex aspect-[4/3] items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] text-[13px] tracking-wide text-[var(--foreground-muted)] sm:rounded-2xl"
          >
            {itemLabel} {index + 1}
          </div>
        ))}
      </div>
    </PageShell>
  )
}
