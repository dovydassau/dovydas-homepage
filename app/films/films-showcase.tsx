'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Group, Panel, Separator } from 'react-resizable-panels'
import {
  films,
  formatFilmNumber,
  getFilmBySlug,
  isFilmInactive,
  toEmbedUrl,
  type Film,
  type FilmCategory,
} from './films-data'

function resolveInitialState(initialSlug?: string) {
  const film = initialSlug ? getFilmBySlug(initialSlug) : undefined

  if (film) {
    return {
      category: film.category,
      selectedId: film.id,
      mobileDetailId: initialSlug ? film.id : null,
    }
  }

  const firstFeatured = films.find((entry) => entry.category === 'featured')

  return {
    category: 'featured' as FilmCategory,
    selectedId: firstFeatured?.id ?? films[0]?.id ?? '',
    mobileDetailId: null,
  }
}

function FilmTag({ tag }: { tag: string }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--background)]/90 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--foreground-muted)] backdrop-blur-sm">
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
      {tag}
    </span>
  )
}

function FilmPreview({ film, index }: { film: Film; index: number }) {
  const embedUrl = film.videoUrl ? toEmbedUrl(film.videoUrl) : null

  if (embedUrl) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-[var(--border)] bg-black">
        {film.tag && (
          <div className="absolute right-3 top-3 z-10">
            <FilmTag tag={film.tag} />
          </div>
        )}
        <iframe
          key={embedUrl}
          src={embedUrl}
          title={film.title}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
    )
  }

  return (
    <div
      className="relative aspect-video w-full overflow-hidden rounded-2xl border border-[var(--border)]"
      style={{ backgroundImage: film.gradient }}
    >
      {film.tag && (
        <div className="absolute right-3 top-3 z-10">
          <FilmTag tag={film.tag} />
        </div>
      )}
      <div className="absolute inset-3 rounded-xl border border-dashed border-white/40" />
      <div className="absolute bottom-3 left-3 rounded-md bg-black/25 px-2 py-1 text-[11px] font-medium tracking-wide text-white/90 backdrop-blur-sm">
        preview / {formatFilmNumber(index)}
      </div>
    </div>
  )
}

function CreditRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-[var(--border)] py-2.5 text-[14px]">
      <span className="text-[var(--foreground-subtle)]">{label}</span>
      <span className="text-[var(--foreground)]">{value}</span>
    </div>
  )
}

function FilmDetail({ film, index }: { film: Film; index: number }) {
  return (
    <div>
      <FilmPreview film={film} index={index} />
      <div className="mt-4 flex flex-wrap items-center gap-2.5">
        <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-medium leading-tight tracking-[-0.02em] text-[var(--accent)]">
          {film.title}
        </h2>
        {film.tag && <FilmTag tag={film.tag} />}
      </div>
      <p className="mt-1 text-[14px] text-[var(--foreground-muted)]">
        {film.role} · {film.year}
      </p>

      {film.summary && (
        <p className="mt-4 text-[14px] leading-relaxed text-[var(--foreground-muted)]">
          {film.summary}
        </p>
      )}

      <div className="mt-5">
        {film.credits.map((credit) => (
          <CreditRow
            key={credit.label}
            label={credit.label}
            value={credit.value}
          />
        ))}
      </div>
    </div>
  )
}

function Chevron({ className = '' }: { className?: string }) {
  return (
    <svg
      width="8"
      height="14"
      viewBox="0 0 8 14"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M1 1L7 7L1 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const categories: { id: FilmCategory; label: string }[] = [
  { id: 'featured', label: 'Featured' },
  { id: 'assistant', label: 'Assistant' },
]

function CategoryToggle({
  value,
  onChange,
}: {
  value: FilmCategory
  onChange: (next: FilmCategory) => void
}) {
  return (
    <div className="inline-flex rounded-full bg-[var(--surface-muted)] p-0.5 text-[13px] font-medium">
      {categories.map((category) => {
        const isActive = value === category.id
        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onChange(category.id)}
            className={`rounded-full px-3.5 py-1.5 transition-colors ${
              isActive
                ? 'bg-[var(--background)] text-[var(--foreground)] shadow-sm'
                : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
            }`}
          >
            {category.label}
          </button>
        )
      })}
    </div>
  )
}

export function FilmsShowcase({ initialSlug }: { initialSlug?: string }) {
  const router = useRouter()
  const [initial] = useState(() => resolveInitialState(initialSlug))
  const [category, setCategory] = useState<FilmCategory>(initial.category)
  const [selectedId, setSelectedId] = useState(initial.selectedId)
  const [mobileDetailId, setMobileDetailId] = useState<string | null>(
    initial.mobileDetailId,
  )

  const visibleFilms = useMemo(
    () => films.filter((film) => film.category === category),
    [category],
  )

  function selectFilm(film: Film, options?: { openMobileDetail?: boolean }) {
    setCategory(film.category)
    setSelectedId(film.id)
    if (options?.openMobileDetail) {
      setMobileDetailId(film.id)
    }
    router.push(`/films/${film.id}`, { scroll: false })
  }

  function closeMobileDetail() {
    setMobileDetailId(null)
    router.push('/films', { scroll: false })
  }

  function handleCategoryChange(next: FilmCategory) {
    if (next === category) return

    const first = films.find((film) => film.category === next)
    setCategory(next)
    setMobileDetailId(null)

    if (first) {
      setSelectedId(first.id)
      router.push(`/films/${first.id}`, { scroll: false })
    } else {
      router.push('/films', { scroll: false })
    }
  }

  const selectedFilm = getFilmBySlug(selectedId)
  const selectedIndex = selectedFilm
    ? visibleFilms.findIndex((film) => film.id === selectedId)
    : 0

  const mobileFilm = mobileDetailId ? getFilmBySlug(mobileDetailId) : null
  const mobileIndex =
    mobileFilm && mobileFilm.category === category
      ? visibleFilms.findIndex((film) => film.id === mobileDetailId)
      : mobileFilm
        ? films
            .filter((film) => film.category === mobileFilm.category)
            .findIndex((film) => film.id === mobileDetailId)
        : -1
  const detailOpen = mobileFilm !== null

  return (
    <>
      {/* Desktop: click-to-select, resizable two-pane */}
      <div className="mt-2 hidden lg:block">
      <Group
        orientation="horizontal"
        id="films-panels"
        style={{ overflow: 'visible' }}
      >
        <Panel defaultSize="42%" minSize="28%" style={{ overflow: 'visible' }}>
          <div className="films-detail-scroll sticky top-24 max-h-[calc(100vh-8rem)] self-start overflow-y-auto pr-8">
            {selectedFilm && selectedIndex >= 0 && (
              <FilmDetail
                key={selectedFilm.id}
                film={selectedFilm}
                index={selectedIndex}
              />
            )}
          </div>
        </Panel>

        <Separator className="group relative mx-1 flex w-4 cursor-col-resize items-center justify-center">
          <span className="h-16 w-px bg-[var(--border)] transition-colors group-hover:bg-[var(--foreground-subtle)] group-active:bg-[var(--accent)]" />
          <span className="absolute flex h-8 w-4 items-center justify-center rounded-full opacity-0 transition-opacity group-hover:opacity-100 group-active:opacity-100">
            <span className="h-6 w-1 rounded-full bg-[var(--foreground-subtle)] group-active:bg-[var(--accent)]" />
          </span>
        </Separator>

        <Panel defaultSize="58%" minSize="35%" style={{ overflow: 'visible' }}>
          <div className="@container pl-2">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-[13px] text-[var(--foreground-muted)]">
                {visibleFilms.length}{' '}
                {category === 'featured'
                  ? 'featured films'
                  : 'assistant credits'}
              </span>
              <CategoryToggle value={category} onChange={handleCategoryChange} />
            </div>

            <div className="grid grid-cols-[minmax(0,1fr)_7rem_3rem] gap-x-4 border-b border-[var(--border)] pb-2 text-[13px] font-medium uppercase tracking-[0.08em] text-[var(--foreground-subtle)] @[600px]:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_7rem_3rem]">
              <span>Project</span>
              <span className="hidden @[600px]:block">Production</span>
              <span>Role</span>
              <span className="text-right">Year</span>
            </div>

            {visibleFilms.map((film, index) => {
              const isSelected = selectedId === film.id
              const isInactive = isFilmInactive(film)
              const rowColor = isInactive
                ? 'text-[var(--foreground-subtle)]'
                : isSelected
                  ? 'text-[var(--accent)]'
                  : 'text-[var(--foreground-muted)]'

              return (
                <button
                  key={film.id}
                  type="button"
                  disabled={isInactive}
                  onClick={() => !isInactive && selectFilm(film)}
                  className={`grid w-full grid-cols-[minmax(0,1fr)_7rem_3rem] items-center gap-x-4 border-b border-[var(--border)] py-2.5 text-left text-[16px] tracking-[-0.012em] transition-colors @[600px]:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_7rem_3rem] ${rowColor} ${
                    isInactive ? 'cursor-default' : 'hover:text-[var(--accent)]'
                  }`}
                >
                  <span className="min-w-0">
                    <span className="flex items-center gap-2">
                      <span
                        className={`tabular-nums transition-colors ${
                          isSelected
                            ? 'text-[var(--accent)]'
                            : 'text-[var(--foreground-subtle)]'
                        }`}
                      >
                        {formatFilmNumber(index)}
                      </span>
                      <span className="truncate">{film.title}</span>
                    </span>
                    {film.category === 'assistant' && (
                      <span className="mt-0.5 block truncate text-[13px] text-[var(--foreground-subtle)] @[600px]:hidden">
                        {film.production}
                      </span>
                    )}
                    {film.category === 'featured' && (film.type || film.tag) && (
                      <span className="mt-0.5 flex items-center gap-2 text-[13px] text-[var(--foreground-subtle)]">
                        {film.tag && <FilmTag tag={film.tag} />}
                        {film.type && <span className="truncate">{film.type}</span>}
                      </span>
                    )}
                  </span>
                  <span className="hidden min-w-0 truncate @[600px]:block">
                    {film.production}
                  </span>
                  <span className="truncate">{film.role}</span>
                  <span className="text-right tabular-nums">{film.year}</span>
                </button>
              )
            })}
          </div>
        </Panel>
      </Group>
      </div>

      {/* Mobile: iOS-style navigation stack */}
      <div className="relative mt-2 overflow-hidden lg:hidden">
        {/* List screen */}
        <div
          className={`transition-[transform,opacity] duration-300 ease-out ${
            detailOpen
              ? 'pointer-events-none absolute inset-0 -translate-x-1/4 opacity-0'
              : 'relative translate-x-0 opacity-100'
          }`}
        >
          <div className="mb-4 flex items-center justify-between">
            <span className="text-[13px] text-[var(--foreground-muted)]">
              {visibleFilms.length}{' '}
              {category === 'featured' ? 'films' : 'credits'}
            </span>
            <CategoryToggle value={category} onChange={handleCategoryChange} />
          </div>

          {visibleFilms.map((film, index) => {
            const isInactive = isFilmInactive(film)

            return (
            <button
              key={film.id}
              type="button"
              disabled={isInactive}
              onClick={() => !isInactive && selectFilm(film, { openMobileDetail: true })}
              className={`group flex w-full items-center gap-3 border-b border-[var(--border)] py-3 text-left transition-colors ${
                isInactive
                  ? 'cursor-default'
                  : 'active:bg-[var(--surface-muted)]'
              }`}
            >
              <div
                className={`aspect-video w-20 shrink-0 rounded-lg border border-[var(--border)] ${isInactive ? 'opacity-40' : ''}`}
                style={{ backgroundImage: film.gradient }}
              />
              <div className="min-w-0 flex-1">
                <div
                  className={`truncate text-[16px] tracking-[-0.012em] ${
                    isInactive
                      ? 'text-[var(--foreground-subtle)]'
                      : 'text-[var(--foreground)]'
                  }`}
                >
                  <span className="tabular-nums text-[var(--foreground-subtle)]">
                    {formatFilmNumber(index)}.
                  </span>{' '}
                  {film.title}
                </div>
                <div className="mt-0.5 flex items-center gap-2 text-[13px] text-[var(--foreground-muted)]">
                  {film.tag && <FilmTag tag={film.tag} />}
                  <span className="truncate">
                    {film.type ? `${film.type} · ` : ''}
                    {film.role} · {film.year}
                  </span>
                </div>
              </div>
              <Chevron className="shrink-0 text-[var(--foreground-subtle)] transition-transform group-active:translate-x-0.5" />
            </button>
            )
          })}
        </div>

        {/* Detail screen */}
        <div
          className={`transition-[transform,opacity] duration-300 ease-out ${
            detailOpen
              ? 'relative translate-x-0 opacity-100'
              : 'pointer-events-none absolute inset-0 translate-x-full opacity-0'
          }`}
        >
          <button
            type="button"
            onClick={closeMobileDetail}
            className="group -mx-4 mb-2 flex min-h-[60px] w-[calc(100%+2rem)] items-center gap-1.5 border-b border-[var(--border)] px-4 text-[17px] font-medium text-[var(--accent)] transition-colors active:bg-[var(--surface-muted)]"
          >
            <Chevron className="rotate-180 transition-transform group-hover:-translate-x-0.5 group-active:-translate-x-1" />
            Films
          </button>

          {mobileFilm && mobileIndex >= 0 && (
            <div key={mobileFilm.id} className="film-detail-enter pt-2">
              <FilmDetail film={mobileFilm} index={mobileIndex} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
