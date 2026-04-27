import type { ReactNode } from 'react'

type PageProps = {
  children: ReactNode
  className?: string
}

export function Page({ children, className = '' }: PageProps) {
  const isExport = new URLSearchParams(window.location.search).has('export')
  return (
    <div
      className={`w-[794px] h-[1123px] bg-white overflow-hidden relative ${isExport ? '' : 'shadow-2xl'} ${className}`}
    >
      {children}
    </div>
  )
}
