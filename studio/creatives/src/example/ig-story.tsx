import { IG_STORY } from '../presets'

export const meta = IG_STORY

export default function ExampleIgStory() {
  return (
    <div
      className="flex flex-col items-center justify-center bg-linear-to-b from-emerald-400 to-teal-600 font-geist relative"
      style={{ width: meta.width, height: meta.height }}
    >
      <div className="absolute top-0 left-0 right-0 h-1/3 bg-linear-to-b from-black/30 to-transparent" />
      <div className="text-center relative z-10">
        <p className="text-lg text-white/80 mb-4">Limited-time campaign</p>
        <h1 className="text-7xl font-black text-white leading-none mb-2">30%</h1>
        <p className="text-4xl font-bold text-white">OFF</p>
        <p className="mt-8 text-xl text-white/90">Save on your first order</p>
        <div className="mt-8 px-8 py-4 bg-white rounded-full text-teal-700 text-lg font-bold">
          Shop now
        </div>
      </div>
    </div>
  )
}
