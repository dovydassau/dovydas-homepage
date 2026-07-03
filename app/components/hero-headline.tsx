'use client'

import { useEffect, useRef, useState } from 'react'

const LINE_1 = 'dovydas is a videographer'
const LINE_2 = 'based in Berlin'
const MIN_FONT_SIZE = 18
const MAX_FONT_SIZE = 72

export function HeroHeadline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const line1Ref = useRef<HTMLSpanElement>(null)
  const line2Ref = useRef<HTMLSpanElement>(null)
  const [fontSize, setFontSize] = useState(MAX_FONT_SIZE)

  useEffect(() => {
    const container = containerRef.current
    const line1 = line1Ref.current
    const line2 = line2Ref.current

    if (!container || !line1 || !line2) {
      return
    }

    const fitText = () => {
      const maxWidth = container.clientWidth

      for (let size = MAX_FONT_SIZE; size >= MIN_FONT_SIZE; size -= 1) {
        line1.style.fontSize = `${size}px`
        line2.style.fontSize = `${size}px`

        if (line1.scrollWidth <= maxWidth && line2.scrollWidth <= maxWidth) {
          setFontSize(size)
          return
        }
      }

      setFontSize(MIN_FONT_SIZE)
    }

    fitText()

    const observer = new ResizeObserver(fitText)
    observer.observe(container)

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="w-full max-w-3xl">
      <h1 className="font-medium leading-[1.08] tracking-[-0.03em] text-[var(--foreground)]">
        <span
          ref={line1Ref}
          className="block whitespace-nowrap"
          style={{ fontSize }}
        >
          {LINE_1}
        </span>
        <span
          ref={line2Ref}
          className="block whitespace-nowrap"
          style={{ fontSize }}
        >
          {LINE_2}
        </span>
      </h1>
    </div>
  )
}
