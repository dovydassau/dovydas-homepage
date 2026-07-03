import type { Metadata } from 'next'
import { SectionPlaceholder } from 'app/components/section-placeholder'

export const metadata: Metadata = {
  title: 'Diary',
  description: 'Notes and diary entries by dovydas saudys.',
}

export default function DiaryPage() {
  return (
    <SectionPlaceholder
      title="Diary"
      description="Personal notes, behind-the-scenes, and occasional writing. Entries coming soon."
      itemLabel="entry"
    />
  )
}
