type PageShellProps = {
  children: React.ReactNode
  className?: string
}

export function PageShell({ children, className = '' }: PageShellProps) {
  return (
    <section
      className={`page-shell w-full pb-12 pt-3 sm:pb-16 sm:pt-4 lg:pb-24 lg:pt-8 ${className}`}
    >
      <div className="mx-auto max-w-[1400px]">{children}</div>
    </section>
  )
}
