import { IG_SQUARE } from '../presets'

export const meta = IG_SQUARE

export default function ExampleIgSquare() {
  return (
    <div
      className="flex flex-col items-center justify-center bg-slate-900 font-geist"
      style={{ width: meta.width, height: meta.height }}
    >
      <div className="text-8xl mb-6">🚀</div>
      <h1 className="text-5xl font-bold text-white tracking-tight text-center px-16">
        Coming Soon
      </h1>
      <p className="mt-4 text-xl text-slate-400 font-geist">
        New product launch
      </p>
    </div>
  )
}
