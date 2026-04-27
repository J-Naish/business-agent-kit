import type { ReactNode } from 'react'

type SlideProps = {
  children: ReactNode
  className?: string
}

export function Slide({ children, className = '' }: SlideProps) {
  return (
    <div
      className={`w-[1280px] h-[720px] overflow-hidden relative ${className}`}
    >
      {children}
    </div>
  )
}
