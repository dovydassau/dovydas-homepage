import type { Metadata } from 'next'
import { SectionPlaceholder } from 'app/components/section-placeholder'

export const metadata: Metadata = {
  title: 'Photo',
  description: 'Photography by dovydas saudys.',
}

export default function PhotoPage() {
  return (
    <SectionPlaceholder
      title="Photo"
      description="Still photography and visual studies. Gallery coming soon."
      itemLabel="photo"
    />
  )
}
