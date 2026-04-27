import { X_POST } from '../presets'

export const meta = X_POST

export default function ExampleXPost() {
  return (
    <div
      className="flex items-center bg-white font-geist"
      style={{ width: meta.width, height: meta.height }}
    >
      <div className="flex-1 px-16">
        <p className="text-sm font-semibold text-blue-600 mb-3">Update</p>
        <h1 className="text-4xl font-bold text-gray-900 leading-tight tracking-tight">
          New blog
          <br />
          post is live
        </h1>
        <p className="mt-4 text-lg text-gray-500">
          Practical notes on current marketing strategy trends.
        </p>
      </div>
      <div className="w-[400px] h-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
        <span className="text-8xl">📝</span>
      </div>
    </div>
  )
}
