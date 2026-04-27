import { useState, useEffect, useMemo, type ComponentType } from 'react'

type CreativeEntry = {
  component: ComponentType
  width: number
  height: number
  label: string
  dir: string
  file: string
}

type CreativeModule = {
  default: ComponentType
  meta: { width: number; height: number; label?: string }
}

const modules = import.meta.glob<CreativeModule>('./*/*.tsx', { eager: true })

function useCreativeEntries(): { creatives: CreativeEntry[]; groups: string[]; getGroup: (name: string) => CreativeEntry[] } {
  return useMemo(() => {
    const entries: CreativeEntry[] = Object.entries(modules)
      .filter(([, mod]) => mod.default && mod.meta)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([path, mod]) => ({
        component: mod.default,
        width: mod.meta.width,
        height: mod.meta.height,
        label: mod.meta.label ?? path.split('/').pop()?.replace('.tsx', '') ?? '',
        dir: path.split('/').at(-2) ?? '',
        file: path.split('/').pop()?.replace('.tsx', '') ?? '',
      }))

    const groups = [...new Set(entries.map((e) => e.dir))]
    const getGroup = (name: string) => entries.filter((e) => e.dir === name)

    return { creatives: entries, groups, getGroup }
  }, [])
}

function CreativeExport({ index, group }: { index: number; group?: string }) {
  const { creatives, getGroup } = useCreativeEntries()
  const filtered = group ? getGroup(group) : creatives
  const entry = filtered[index]
  if (!entry) return <div>Creative not found</div>
  const Component = entry.component
  return (
    <div data-export style={{ width: entry.width, height: entry.height }}>
      <Component />
    </div>
  )
}

const THUMB_H = 80

function CreativeGallery({ group: activeGroupFromParam }: { group?: string }) {
  const { creatives, groups, getGroup } = useCreativeEntries()
  const [activeGroup, setActiveGroup] = useState(activeGroupFromParam ?? groups[0] ?? '')
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    if (activeGroupFromParam) setActiveGroup(activeGroupFromParam)
  }, [activeGroupFromParam])

  useEffect(() => setSelected(0), [activeGroup])

  const [scale, setScale] = useState(1)
  const groupCreatives = getGroup(activeGroup)
  const current = groupCreatives[selected]

  useEffect(() => {
    const update = () => {
      if (!current) return
      const padding = 80
      const bottomSpace = THUMB_H + 100
      const availableW = window.innerWidth - padding
      const availableH = window.innerHeight - bottomSpace - padding
      setScale(Math.min(1, availableW / current.width, availableH / current.height))
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [current])

  if (creatives.length === 0) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
        No creatives found.
      </div>
    )
  }

  const C = current?.component

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', display: 'flex', flexDirection: 'column' }}>
      {/* Header: group tabs + info */}
      <div style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto' }}>
          {groups.length > 1 && groups.map((g) => (
            <button
              key={g}
              onClick={() => setActiveGroup(g)}
              style={{
                padding: '6px 16px', borderRadius: '999px', border: 'none',
                background: g === activeGroup ? '#333' : '#e5e5e5',
                color: g === activeGroup ? '#fff' : '#666',
                fontSize: '13px', cursor: 'pointer', whiteSpace: 'nowrap',
              }}
            >
              {g} ({getGroup(g).length})
            </button>
          ))}
        </div>
        {current && (
          <div data-image-count={groupCreatives.length} style={{ color: '#999', fontSize: '12px', fontFamily: 'monospace' }}>
            {current.label} — {current.width}×{current.height}
          </div>
        )}
      </div>

      {/* Main preview */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {C && current && (
          <div style={{
            width: current.width * scale,
            height: current.height * scale,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          }}>
            <div style={{
              width: current.width,
              height: current.height,
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
            }}>
              <C />
            </div>
          </div>
        )}
      </div>

      {/* Thumbnail strip */}
      <div style={{
        padding: '16px 24px',
        borderTop: '1px solid #e5e5e5',
        background: '#fff',
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
      }}>
        {groupCreatives.map((entry, i) => {
          const thumbScale = THUMB_H / entry.height
          const thumbW = entry.width * thumbScale
          const isActive = selected === i
          return (
            <button
              key={i}
              onClick={() => setSelected(i)}
              style={{
                flexShrink: 0,
                width: thumbW,
                height: THUMB_H,
                overflow: 'hidden',
                borderRadius: '6px',
                border: isActive ? '2px solid #333' : '2px solid transparent',
                padding: 0,
                cursor: 'pointer',
                background: 'none',
                opacity: isActive ? 1 : 0.6,
                transition: 'opacity 0.15s, border-color 0.15s',
              }}
            >
              <div style={{
                width: entry.width,
                height: entry.height,
                transform: `scale(${thumbScale})`,
                transformOrigin: 'top left',
                pointerEvents: 'none',
              }}>
                <entry.component />
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function App() {
  const params = new URLSearchParams(window.location.search)
  const group = params.get('group') ?? undefined
  const exportIndex = params.get('export')

  if (exportIndex !== null) {
    return <CreativeExport index={Number(exportIndex)} group={group} />
  }
  return <CreativeGallery group={group} />
}
