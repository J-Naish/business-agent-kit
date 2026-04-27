import { Slide } from '../Slide'

const phases = [
  { phase: 'Phase 1', period: 'May', title: 'Requirements & Planning', color: 'bg-blue-500', w: 'w-[20%]' },
  { phase: 'Phase 2', period: 'Jun-Jul', title: 'Design & Implementation', color: 'bg-emerald-500', w: 'w-[40%]' },
  { phase: 'Phase 3', period: 'Aug', title: 'Testing & Launch', color: 'bg-amber-500', w: 'w-[20%]' },
]

export default function Schedule() {
  return (
    <Slide className="flex flex-col justify-center px-24 bg-white font-geist">
      <p className="text-sm font-semibold text-blue-600 mb-3 tracking-wider font-geist">SCHEDULE</p>
      <h2 className="text-3xl font-bold text-gray-900 mb-10">Schedule</h2>
      <div className="space-y-6">
        {phases.map((p) => (
          <div key={p.phase} className="flex items-center gap-6">
            <div className={`${p.color} text-white text-sm font-bold rounded-lg px-4 py-2 w-24 text-center font-geist`}>
              {p.phase}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-lg font-semibold text-gray-900">{p.title}</span>
                <span className="text-sm text-gray-400">{p.period}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full">
                <div className={`h-2 ${p.color} rounded-full ${p.w}`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Slide>
  )
}
