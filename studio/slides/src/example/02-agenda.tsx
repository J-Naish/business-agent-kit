import { Slide } from '../Slide'

const items = [
  { num: '01', label: 'Project Overview' },
  { num: '02', label: 'Current Challenges' },
  { num: '03', label: 'Proposal' },
  { num: '04', label: 'Schedule' },
  { num: '05', label: 'Estimate' },
]

export default function Agenda() {
  return (
    <Slide className="flex items-center px-24 bg-white font-geist">
      <div>
        <p className="text-sm font-semibold text-blue-600 mb-3 tracking-wider font-geist">AGENDA</p>
        <h2 className="text-3xl font-bold text-gray-900 mb-10">Agenda</h2>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.num} className="flex items-baseline gap-4">
              <span className="text-2xl font-bold text-blue-600 font-geist">{item.num}</span>
              <span className="text-xl text-gray-700">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  )
}
