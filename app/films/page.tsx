import type { Metadata } from 'next'
import { SectionPlaceholder } from 'app/components/section-placeholder'

export const metadata: Metadata = {
  title: 'Films',
  description: 'Film and video work by dovydas saudys.',
}

export default function FilmsPage() {
  return (
    <SectionPlaceholder
      title="Films"
      description="Selected film and video projects. Full reel and case studies coming soon."
      itemLabel="film"
    />
  )
}
