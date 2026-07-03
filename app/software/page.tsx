import type { Metadata } from 'next'
import { SectionPlaceholder } from 'app/components/section-placeholder'

export const metadata: Metadata = {
  title: 'Software',
  description: 'Software projects by dovydas saudys.',
}

export default function SoftwarePage() {
  return (
    <SectionPlaceholder
      title="Software"
      description="Tools, experiments, and software side projects. More details coming soon."
      itemLabel="project"
    />
  )
}
