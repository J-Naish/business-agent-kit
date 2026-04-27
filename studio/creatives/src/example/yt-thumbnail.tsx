import { YT_THUMBNAIL } from '../presets'

export const meta = YT_THUMBNAIL

export default function ExampleYtThumbnail() {
  return (
    <div
      className="flex items-center justify-center bg-linear-to-r from-red-600 to-orange-500 font-geist relative"
      style={{ width: meta.width, height: meta.height }}
    >
      <div className="text-center">
        <h1 className="text-7xl font-black text-white drop-shadow-lg tracking-tighter">
          TOP 5 TIPS
        </h1>
        <p className="mt-2 text-3xl font-bold text-yellow-200 font-geist">
          What beginners should know
        </p>
      </div>
      <div className="absolute bottom-6 right-8 bg-black/60 text-white text-sm px-3 py-1 rounded">
        10:24
      </div>
    </div>
  )
}
