import { useState, useEffect, useMemo, type ComponentType } from 'react'

const PAGE_W = 794
const PAGE_H = 1123

type FormEntry = { component: ComponentType; dir: string; file: string }

const modules = import.meta.glob<{ default: ComponentType }>(['./*/*.tsx', '!./templates/*.tsx'], { eager: true })

function useFormEntries(): { entries: FormEntry[]; groups: string[]; getGroup: (name: string) => FormEntry[] } {
  return useMemo(() => {
    const entries: FormEntry[] = Object.entries(modules)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([path, mod]) => ({
        component: mod.default,
        dir: path.split('/').at(-2) ?? '',
        file: path.split('/').pop()?.replace('.tsx', '') ?? '',
      }))

    const groups = [...new Set(entries.map((e) => e.dir))]
    const getGroup = (name: string) => entries.filter((e) => e.dir === name)

    return { entries, groups, getGroup }
  }, [])
}

function FormsExport({ group }: { group?: string }) {
  const { entries, getGroup } = useFormEntries()
  const pages = group ? getGroup(group) : entries
  return (
    <div>
      {pages.map((entry, i) => {
        const C = entry.component
        return (
          <div key={i} style={{ pageBreakAfter: 'always' }}>
            <C />
          </div>
        )
      })}
    </div>
  )
}

function FormsPreview({ group }: { group?: string }) {
  const { entries, groups, getGroup } = useFormEntries()
  const pages = group ? getGroup(group) : entries
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const update = () => {
      const padding = 80
      const availableW = window.innerWidth - padding
      setScale(Math.min(1, availableW / PAGE_W))
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  if (entries.length === 0) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
        No pages found.
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', padding: '40px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>
      {groups.length > 1 && (
        <div style={{ display: 'flex', gap: '8px', marginBottom: '0', overflowX: 'auto', maxWidth: '90vw', padding: '0 16px' }}>
          <a
            href="/"
            style={{
              padding: '6px 16px', borderRadius: '999px', border: 'none',
              background: !group ? '#333' : '#e5e5e5',
              color: !group ? '#fff' : '#666',
              fontSize: '13px', cursor: 'pointer', whiteSpace: 'nowrap',
              textDecoration: 'none',
            }}
          >
            All ({entries.length})
          </a>
          {groups.map((g) => (
            <a
              key={g}
              href={`/?group=${g}`}
              style={{
                padding: '6px 16px', borderRadius: '999px', border: 'none',
                background: group === g ? '#333' : '#e5e5e5',
                color: group === g ? '#fff' : '#666',
                fontSize: '13px', cursor: 'pointer', whiteSpace: 'nowrap',
                textDecoration: 'none',
              }}
            >
              {g} ({getGroup(g).length})
            </a>
          ))}
        </div>
      )}

      <div style={{ color: '#999', fontSize: '13px' }}>
        {pages.length} page(s) — A4 ({PAGE_W}x{PAGE_H}px)
      </div>
      {pages.map((entry, i) => (
        <div key={i} style={{ width: PAGE_W * scale, height: PAGE_H * scale }}>
          <div
            style={{
              width: PAGE_W,
              height: PAGE_H,
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
            }}
          >
            <entry.component />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function App() {
  const params = new URLSearchParams(window.location.search)
  const group = params.get('group') ?? undefined
  const isExport = params.has('export')
  return isExport ? <FormsExport group={group} /> : <FormsPreview group={group} />
}
