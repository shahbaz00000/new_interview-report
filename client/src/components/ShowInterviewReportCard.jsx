import React from 'react'

const sectionStyles = 'border border-[#dce3da] bg-white shadow-[0_14px_40px_rgba(23,61,53,0.07)]'

const QuestionList = ({ title, questions, accent }) => (
  <section className={`${sectionStyles} overflow-hidden`}>
    <div className={`border-b px-5 py-4 sm:px-6 ${accent}`}>
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-lg font-bold text-[#173d35]">{title}</h3>
        <span className="bg-white/80 px-2.5 py-1 text-xs font-bold text-[#557c4c]">
          {questions.length} {questions.length === 1 ? 'question' : 'questions'}
        </span>
      </div>
    </div>
    <div className="space-y-4 p-4 sm:p-6">
      {questions.length > 0 ? questions.map((question, index) => (
        <article key={`${question.question}-${index}`} className="border border-[#e6ebe4] bg-[#fbfcfa] p-4 sm:p-5">
          <div className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center bg-[#173d35] text-xs font-bold text-white">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h4 className="pt-1 text-sm font-bold leading-6 text-[#17231f]">{question.question}</h4>
          </div>
          <div className="mt-4 border-l-2 border-[#b4d273] pl-4">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#557c4c]">What this tests</p>
            <p className="mt-1 text-sm leading-6 text-[#66736d]">{question.intention}</p>
          </div>
          <div className="mt-4 bg-[#173d35] p-4 text-sm leading-6 text-[#f3f5f0]">
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.14em] text-[#b4d273]">Suggested answer</p>
            <p>{question.answer}</p>
          </div>
        </article>
      )) : <p className="text-sm text-[#66736d]">No questions were generated for this section.</p>}
    </div>
  </section>
)

const ShowInterviewReportCard = ({ report }) => {
  const safeReport = report && typeof report === 'object' ? report : {}
  const technicalQuestions = safeReport.technicalQuestions || []
  const behavioralQuestions = safeReport.behavioralQuestions || []
  const skillGaps = safeReport.skillGaps || []
  const preparationPlan = safeReport.preparationPlan || []
  const score = Number(safeReport.score)
  const scoreValue = Number.isFinite(score) ? score : null
  const scoreLabel = scoreValue === null ? '--' : `${scoreValue}%`
  const scoreWidth = scoreValue === null ? 0 : Math.min(Math.max(scoreValue, 0), 100)

  return (
    <div className="overflow-hidden border border-[#cbd8c9] bg-[#f8faf6] shadow-[0_24px_70px_rgba(23,61,53,0.12)]">
      <header className="relative overflow-hidden bg-[#173d35] px-5 py-7 text-white sm:px-8 sm:py-9">
        <div className="absolute -right-12 -top-16 h-48 w-48 rounded-full border-[24px] border-[#557c4c]/40" aria-hidden="true" />
        <div className="relative flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#b4d273]">Interview intelligence</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Your interview report</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#dce8d8]">A focused view of your interview readiness, likely questions, skill gaps, and next steps.</p>
          </div>
          <div className="w-full max-w-xs bg-white/10 p-4 ring-1 ring-white/20 md:w-56">
            <div className="flex items-end justify-between gap-3">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#dce8d8]">Match score</span>
              <span className="text-3xl font-bold text-[#b4d273]">{scoreLabel}</span>
            </div>
            <div className="mt-3 h-2 bg-white/20">
              <div className="h-full bg-[#b4d273] transition-all" style={{ width: `${scoreWidth}%` }} />
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-2 border-b border-[#dce3da] bg-white sm:grid-cols-4">
        {[
          ['Technical', technicalQuestions.length],
          ['Behavioral', behavioralQuestions.length],
          ['Skill gaps', skillGaps.length],
          ['Plan days', preparationPlan.length],
        ].map(([label, value], index) => (
          <div key={label} className={`px-4 py-4 sm:px-6 ${index < 3 ? 'border-r border-[#dce3da]' : ''}`}>
            <p className="text-2xl font-bold text-[#173d35]">{value}</p>
            <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-[#7b897f]">{label}</p>
          </div>
        ))}
      </div>

      <div className="space-y-6 p-4 sm:p-7">
        <div className="grid gap-6 xl:grid-cols-2">
          <QuestionList title="Technical questions" questions={technicalQuestions} accent="bg-[#edf4e9]" />
          <QuestionList title="Behavioral questions" questions={behavioralQuestions} accent="bg-[#f1f2e8]" />
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <section className={sectionStyles}>
            <div className="border-b border-[#dce3da] bg-[#edf4e9] px-5 py-4 sm:px-6">
              <h3 className="text-lg font-bold text-[#173d35]">Skill gaps</h3>
              <p className="mt-1 text-sm text-[#66736d]">Prioritize these areas before your interview.</p>
            </div>
            <div className="space-y-3 p-4 sm:p-6">
              {skillGaps.length > 0 ? skillGaps.map((skill, index) => {
                const severity = String(skill.severity || 'low').toLowerCase()
                const severityStyles = severity === 'high'
                  ? 'bg-red-50 text-red-700 ring-red-200'
                  : severity === 'medium'
                    ? 'bg-amber-50 text-amber-700 ring-amber-200'
                    : 'bg-emerald-50 text-emerald-700 ring-emerald-200'
                return (
                  <div key={`${skill.skill}-${index}`} className="flex items-center justify-between gap-4 border border-[#e6ebe4] bg-[#fbfcfa] p-4">
                    <div>
                      <p className="font-bold text-[#17231f]">{skill.skill}</p>
                      <p className="mt-1 text-xs text-[#7b897f]">Focus area {index + 1}</p>
                    </div>
                    <span className={`shrink-0 px-3 py-1 text-xs font-bold capitalize ring-1 ${severityStyles}`}>{severity}</span>
                  </div>
                )
              }) : <p className="text-sm text-[#66736d]">No skill gaps were identified.</p>}
            </div>
          </section>

          <section className={sectionStyles}>
            <div className="border-b border-[#dce3da] bg-[#f1f2e8] px-5 py-4 sm:px-6">
              <h3 className="text-lg font-bold text-[#173d35]">Preparation plan</h3>
              <p className="mt-1 text-sm text-[#66736d]">A practical path to sharpen your readiness.</p>
            </div>
            <div className="space-y-4 p-4 sm:p-6">
              {preparationPlan.length > 0 ? preparationPlan.map((day, index) => (
                <div key={`${day.day}-${index}`} className="relative flex gap-4 border-l-2 border-[#b4d273] pl-5">
                  <span className="absolute -left-[13px] top-0 flex h-6 w-6 items-center justify-center bg-[#173d35] text-[10px] font-bold text-white ring-4 ring-[#f8faf6]">{day.day || index + 1}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="font-bold text-[#17231f]">Day {day.day || index + 1}</h4>
                      <span className="bg-[#edf4e9] px-3 py-1 text-xs font-bold text-[#557c4c]">{day.focus}</span>
                    </div>
                    {day.task?.length > 0 && (
                      <ul className="mt-3 space-y-2 text-sm leading-6 text-[#66736d]">
                        {day.task.map((task, taskIndex) => <li key={taskIndex} className="flex gap-2"><span className="text-[#557c4c]">-&gt;</span><span>{task}</span></li>)}
                      </ul>
                    )}
                  </div>
                </div>
              )) : <p className="text-sm text-[#66736d]">No preparation plan was generated.</p>}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default ShowInterviewReportCard
