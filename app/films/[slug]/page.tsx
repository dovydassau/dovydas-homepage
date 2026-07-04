import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PageShell } from 'app/components/page-shell'
import { FilmsShowcase } from '../films-showcase'
import { getFilmBySlug, getFilmSlugs } from '../films-data'

type FilmPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getFilmSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: FilmPageProps): Promise<Metadata> {
  const { slug } = await params
  const film = getFilmBySlug(slug)

  if (!film) {
    return { title: 'Film not found' }
  }

  const description = [film.role, film.type, film.year].filter(Boolean).join(' · ')

  return {
    title: film.title,
    description,
    openGraph: {
      title: film.title,
      description,
    },
  }
}

export default async function FilmPage({ params }: FilmPageProps) {
  const { slug } = await params
  const film = getFilmBySlug(slug)

  if (!film) {
    notFound()
  }

  return (
    <PageShell>
      <FilmsShowcase initialSlug={slug} />
    </PageShell>
  )
}
