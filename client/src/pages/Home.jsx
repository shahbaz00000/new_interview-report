import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <main className="min-h-screen bg-[#f3f5f0] text-[#17231f]">
      <nav className="border-b border-[#dce3da] bg-[#f8faf6]/90 px-6 py-5 sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link className="flex items-center gap-3" to="/">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#173d35] font-bold text-[#b4d273]">IR</span>
            <span className="font-semibold tracking-tight">Interview Reports</span>
          </Link>
          <Link className="hidden text-sm font-semibold text-[#557c4c] transition hover:text-[#173d35] sm:block" to="/send-verification">Get started <span aria-hidden="true">-&gt;</span></Link>
        </div>
      </nav>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 pb-20 pt-16 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-16 lg:pb-28 lg:pt-24">
        <div>
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-[#557c4c]">AI interview intelligence</p>
          <h1 className="max-w-3xl font-sans text-5xl font-bold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">Make every interview count.</h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[#66736d]">Turn raw interview conversations into clear themes, useful evidence, and reports your team can act on.</p>
          <Link className="mt-9 inline-flex items-center justify-between gap-12 rounded-lg bg-[#173d35] px-5 py-4 font-bold text-white shadow-lg shadow-[#173d35]/15 transition hover:-translate-y-1 hover:bg-[#28574a]" to="/send-verification">Create your first report <span aria-hidden="true">-&gt;</span></Link>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-[#173d35] p-5 text-[#f5f7ef] shadow-[0_24px_70px_rgba(23,61,53,0.18)] sm:p-7">
          <div className="absolute -bottom-28 -right-24 h-72 w-72 rounded-full border border-[#d6e8bd]/20 shadow-[0_0_0_30px_rgba(214,232,189,0.05),0_0_0_60px_rgba(214,232,189,0.04)]" />
          <div className="relative flex items-center justify-between border-b border-[#d6e8bd]/20 pb-5">
            <div><p className="text-xs uppercase tracking-[0.16em] text-[#b4d273]">Report preview</p><p className="mt-1 font-semibold">Customer discovery / Q3</p></div>
            <span className="rounded-full bg-[#b4d273]/15 px-3 py-1 text-xs font-semibold text-[#b4d273]">Analysing</span>
          </div>
          <div className="relative mt-7 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-[#f5f7ef]/[0.08] p-5 sm:col-span-2"><p className="text-xs text-[#c9d6c6]">Core theme</p><p className="mt-2 text-2xl font-semibold">Trust is built through transparency.</p><div className="mt-5 h-2 overflow-hidden rounded-full bg-[#f5f7ef]/10"><div className="h-full w-4/5 rounded-full bg-[#b4d273]" /></div><p className="mt-2 text-right text-xs text-[#c9d6c6]">82% confidence</p></div>
            <div className="rounded-xl bg-[#f5f7ef]/[0.08] p-5"><p className="text-xs text-[#c9d6c6]">Interviews</p><p className="mt-2 text-3xl font-bold text-[#b4d273]">24</p></div>
            <div className="rounded-xl bg-[#f5f7ef]/[0.08] p-5"><p className="text-xs text-[#c9d6c6]">Signals found</p><p className="mt-2 text-3xl font-bold text-[#b4d273]">137</p></div>
          </div>
        </div>
      </section>

      <section className="border-t border-[#dce3da] bg-white px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-xl"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#557c4c]">A clearer way to listen</p><h2 className="mt-3 font-sans text-3xl font-bold tracking-tight sm:text-4xl">Less sorting. More understanding.</h2></div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <article className="border-t-2 border-[#b4d273] pt-5"><p className="text-2xl font-bold text-[#557c4c]">01</p><h3 className="mt-4 text-lg font-bold">Bring conversations together</h3><p className="mt-2 leading-7 text-[#66736d]">Keep notes, transcripts, and context in one focused workspace.</p></article>
            <article className="border-t-2 border-[#b4d273] pt-5"><p className="text-2xl font-bold text-[#557c4c]">02</p><h3 className="mt-4 text-lg font-bold">Surface the real themes</h3><p className="mt-2 leading-7 text-[#66736d]">Let AI reveal repeated needs, friction, and meaningful signals.</p></article>
            <article className="border-t-2 border-[#b4d273] pt-5"><p className="text-2xl font-bold text-[#557c4c]">03</p><h3 className="mt-4 text-lg font-bold">Share decisions with confidence</h3><p className="mt-2 leading-7 text-[#66736d]">Create structured reports that turn research into momentum.</p></article>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home
