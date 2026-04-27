import { OGP } from '../presets'

export const meta = OGP

export default function SampleOgp() {
  return (
    <div
      className="flex items-center justify-center bg-linear-to-br from-blue-600 to-purple-700"
      style={{ width: meta.width, height: meta.height }}
    >
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold tracking-tight font-geist">Sample Project</h1>
        <p className="mt-4 text-2xl opacity-80 font-geist">Image export demo</p>
      </div>
    </div>
  )
}
