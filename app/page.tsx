import { CtaButtons } from 'app/components/cta-buttons'
import { HeroHeadline } from 'app/components/hero-headline'
import { PageShell } from 'app/components/page-shell'
import { toEmbedUrl } from 'app/lib/to-embed-url'

const REEL_VIDEO_URL = 'https://www.youtube.com/watch?v=efYb6sOnJ74'

export default function Page() {
  const reelEmbedUrl = toEmbedUrl(REEL_VIDEO_URL)

  return (
    <PageShell>
      <HeroHeadline />

      <div className="mt-6 sm:mt-8">
        <CtaButtons />
      </div>

      <div
        className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-xl border border-[var(--border)] bg-black sm:mt-12 sm:rounded-2xl lg:mt-16 lg:rounded-3xl"
        aria-label="Video reel"
      >
        {reelEmbedUrl && (
          <iframe
            src={reelEmbedUrl}
            title="Video reel"
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        )}
      </div>
    </PageShell>
  )
}
