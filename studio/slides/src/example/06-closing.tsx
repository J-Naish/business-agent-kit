import { Slide } from '../Slide'

export default function Closing() {
  return (
    <Slide className="flex flex-col items-center justify-center bg-slate-900 font-geist">
      <h2 className="text-4xl font-bold text-white mb-4">Thank you</h2>
      <p className="text-lg text-slate-400 font-geist">
        Please reach out with any questions.
      </p>
      <div className="mt-12 text-sm text-slate-500">
        info@example.com
      </div>
    </Slide>
  )
}
