import { Slide } from '../Slide'

const points = [
  { label: 'Responsive Design', desc: 'Deliver a consistent experience across desktop, tablet, and mobile.' },
  { label: 'Next.js + Vercel', desc: 'Use a fast, SEO-friendly framework and hosting workflow.' },
  { label: 'CMS Implementation', desc: 'Enable the internal team to update content without engineering support.' },
  { label: 'Analytics Setup', desc: 'Build a measurement loop with GA4 and GTM.' },
]

export default function Solution() {
  return (
    <Slide className="flex flex-col justify-center px-24 bg-white font-geist">
      <p className="text-sm font-semibold text-blue-600 mb-3 tracking-wider font-geist">SOLUTION</p>
      <h2 className="text-3xl font-bold text-gray-900 mb-10">Proposal</h2>
      <div className="space-y-5">
        {points.map((p, i) => (
          <div key={p.label} className="flex items-start gap-5">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center text-lg font-bold font-geist shrink-0">
              {i + 1}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">{p.label}</h3>
              <p className="text-sm text-gray-500 mt-0.5">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </Slide>
  )
}
