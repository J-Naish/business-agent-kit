import { Slide } from '../Slide'

export default function Cover() {
  return (
    <Slide className="flex flex-col items-center justify-center bg-slate-900 font-geist">
      <p className="text-sm font-semibold tracking-widest text-blue-400 mb-6">PROPOSAL</p>
      <h1 className="text-5xl font-bold tracking-tight text-white text-center leading-tight">
        Website Redesign
        <br />
        Proposal
      </h1>
      <p className="mt-8 text-lg text-slate-400 font-geist">
        April 2026 — Acme Studio
      </p>
    </Slide>
  )
}
