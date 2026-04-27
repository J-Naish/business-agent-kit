import { Slide } from '../Slide'

const problems = [
  { icon: '📱', title: 'Mobile Experience', desc: 'Most traffic comes from mobile, but the current site is not optimized for small screens.' },
  { icon: '🔍', title: 'SEO Visibility', desc: 'Search rankings for core keywords have been trending down.' },
  { icon: '⚡', title: 'Page Speed', desc: 'Pages often take more than three seconds to load, increasing drop-off.' },
]

export default function Problem() {
  return (
    <Slide className="flex flex-col justify-center px-24 bg-white font-geist">
      <p className="text-sm font-semibold text-blue-600 mb-3 tracking-wider font-geist">PROBLEM</p>
      <h2 className="text-3xl font-bold text-gray-900 mb-10">Current Challenges</h2>
      <div className="grid grid-cols-3 gap-6">
        {problems.map((p) => (
          <div key={p.title} className="bg-gray-50 rounded-2xl p-6">
            <div className="text-3xl mb-4">{p.icon}</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{p.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </Slide>
  )
}
