import { useState, useEffect, useMemo, type ComponentType } from 'react'
import { BrowserRouter, Routes, Route, useParams, useNavigate } from 'react-router-dom'

const SLIDE_W = 1280
const SLIDE_H = 720

type SlideEntry = { component: ComponentType; dir: string; file: string }

const modules = import.meta.glob<{ default: ComponentType }>('./*/*.tsx', { eager: true })

function useSlideEntries(): SlideEntry[] {
  return useMemo(() => {
    return Object.entries(modules)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([path, mod]) => ({
        component: mod.default,
        dir: path.split('/').at(-2) ?? '',
        file: path.split('/').pop()?.replace('.tsx', '') ?? '',
      }))
  }, [])
}

function useDecks(entries: SlideEntry[]) {
  return useMemo(() => {
    const names = [...new Set(entries.map((e) => e.dir))]
    return {
      decks: names,
      getDeck: (name: string) => entries.filter((e) => e.dir === name),
    }
  }, [entries])
}

function DeckExport() {
  const { deck } = useParams<{ deck: string }>()
  const entries = useSlideEntries()
  const { getDeck } = useDecks(entries)
  const slides = deck ? getDeck(deck) : []

  if (!deck || slides.length === 0) return <div>Deck not found</div>

  return (
    <>
      <style>{`
        @page { size: ${SLIDE_W}px ${SLIDE_H}px; margin: 0; }
        @media print { body { margin: 0; } }
      `}</style>
      <div>
        {slides.map((entry, i) => {
          const C = entry.component
          return (
            <div key={i} data-slide={i} style={{ width: SLIDE_W, height: SLIDE_H, pageBreakAfter: 'always' }}>
              <C />
            </div>
          )
        })}
      </div>
    </>
  )
}

function Presenter() {
  const { deck: activeDeck } = useParams<{ deck: string }>()
  const navigate = useNavigate()
  const entries = useSlideEntries()
  const { decks, getDeck } = useDecks(entries)
  const slides = activeDeck ? getDeck(activeDeck) : []
  const [current, setCurrent] = useState(0)
  const [scale, setScale] = useState(1)

  useEffect(() => setCurrent(0), [activeDeck])

  useEffect(() => {
    const update = () => {
      const padding = 64
      const availableW = window.innerWidth - padding
      const availableH = window.innerHeight - 160 - padding
      setScale(Math.min(1, availableW / SLIDE_W, availableH / SLIDE_H))
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        setCurrent((c) => Math.min(slides.length - 1, c + 1))
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setCurrent((c) => Math.max(0, c - 1))
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [slides.length])

  if (decks.length === 0) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
        No slides found.
      </div>
    )
  }

  const entry = slides[current]
  const C = entry?.component

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {/* Deck tabs */}
      <div style={{ width: SLIDE_W * scale, marginBottom: '16px' }}>
        <div style={{
          display: 'flex', gap: '2px',
          background: '#e8e8e8', borderRadius: '10px', padding: '3px',
          overflowX: 'auto', scrollbarWidth: 'none',
        }}>
          {decks.map((name) => {
            const active = activeDeck === name
            return (
              <button
                key={name}
                onClick={() => navigate(`/${name}`)}
                style={{
                  padding: '7px 14px', fontSize: '13px', fontWeight: 500,
                  whiteSpace: 'nowrap',
                  color: active ? '#111' : '#888',
                  background: active ? '#fff' : 'transparent',
                  border: 'none', borderRadius: '8px', cursor: 'pointer',
                  transition: 'all 0.15s',
                  boxShadow: active ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                  display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0,
                }}
              >
                <span>{name}</span>
                <span style={{
                  fontSize: '11px', color: active ? '#999' : '#bbb',
                  background: active ? '#f0f0f0' : 'transparent',
                  borderRadius: '4px', padding: '1px 6px',
                }}>
                  {getDeck(name).length}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Slide */}
      <div style={{ width: SLIDE_W * scale, height: SLIDE_H * scale, boxShadow: '0 8px 32px rgba(0,0,0,0.15)', background: '#fff' }}>
        {C ? (
          <div style={{ width: SLIDE_W, height: SLIDE_H, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
            <C />
          </div>
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc', fontSize: `${14 * scale}px` }}>
            Select a deck
          </div>
        )}
      </div>

      {/* Controls */}
      <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '24px', visibility: C ? 'visible' : 'hidden' }}>
        <button
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={current === 0}
          style={{
            padding: '8px 24px', background: current === 0 ? '#ddd' : '#222', color: '#fff',
            border: 'none', borderRadius: '8px', cursor: current === 0 ? 'default' : 'pointer', fontSize: '14px',
          }}
        >
          &larr; Prev
        </button>
        <span style={{ color: '#666', fontSize: '16px' }}>{current + 1} / {slides.length}</span>
        <button
          onClick={() => setCurrent((c) => Math.min(slides.length - 1, c + 1))}
          disabled={current === slides.length - 1}
          style={{
            padding: '8px 24px', background: current === slides.length - 1 ? '#ddd' : '#222', color: '#fff',
            border: 'none', borderRadius: '8px', cursor: current === slides.length - 1 ? 'default' : 'pointer', fontSize: '14px',
          }}
        >
          Next &rarr;
        </button>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Presenter />} />
        <Route path="/:deck" element={<Presenter />} />
        <Route path="/:deck/export" element={<DeckExport />} />
      </Routes>
    </BrowserRouter>
  )
}
