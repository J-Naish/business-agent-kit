import type { ComponentType } from 'react'

export type CompositionEntry = {
  id: string
  component: ComponentType
  durationInFrames: number
  fps: number
  width: number
  height: number
  defaultProps?: Record<string, unknown>
}
