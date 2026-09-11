import React from 'react'
import { useState } from 'react';
import { useRef } from 'react'
import ShowInterviewReportCard from '../../components/ShowInterviewReportCard'

const InterviewReportHome = () => {

    const [interviewReport, setInterviewReport] = useState("")
    const [error, setError] = useState(null)

    const selfDescriptionRef = useRef();
    const jobDescriptionRef = useRef();
    const resumeRef = useRef();


    const handleGenerateReport = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("selfDescription", selfDescriptionRef.current.value);
        formData.append("jobDescription", jobDescriptionRef.current.value);
        formData.append("resume", resumeRef.current.files[0]);
        try {
            const res = await fetch("https://new-interview-report-1-bac.onrender.com/api/ai/generate-interview-report", {
                method: "POST",
                body: formData
            });
            const data = await res.json();
            if (res.status === 200) {
                setInterviewReport(data.report)
                setError(null)
            } else {
                setError(data.message || "Unable to generate the report.")
            }
        } catch (error) {
            setError(error.message)
        }
    };
    return (
        <main className="min-h-screen bg-[#f3f5f0] px-6 py-8 text-[#17231f] sm:px-10 lg:px-16 lg:py-10">
            <section className="mx-auto max-w-3xl">
                <div className="mb-6 max-w-2xl">
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#557c4c]">AI interview intelligence</p>
                    <h1 className="font-sans text-3xl font-bold leading-tight tracking-tight sm:text-4xl">Generate your interview report</h1>
                    <p className="mt-2 text-sm leading-6 text-[#66736d]">Share your background, the role you are targeting, and your resume to create a focused report.</p>
                </div>

                <form className="border-t-2 border-[#173d35] bg-white p-5 shadow-[0_24px_70px_rgba(23,61,53,0.10)] sm:p-6" onSubmit={handleGenerateReport}>
                    <div className="space-y-5">
                        <label className="block" htmlFor="selfDescription">
                            <span className="mb-2 block text-sm font-bold">Self description</span>
                            <textarea className="min-h-24 w-full resize-y border border-[#dce3da] bg-[#f8faf6] px-4 py-2 leading-6 outline-none transition placeholder:text-[#9aa89d] focus:border-[#557c4c] focus:ring-2 focus:ring-[#b4d273]/50" id="selfDescription" placeholder="Describe yourself..." ref={selfDescriptionRef} required></textarea>
                        </label>
                        <label className="block" htmlFor="jobDescription">
                            <span className="mb-2 block text-sm font-bold">Job description</span>
                            <textarea className="min-h-24 w-full resize-y border border-[#dce3da] bg-[#f8faf6] px-4 py-2 leading-6 outline-none transition placeholder:text-[#9aa89d] focus:border-[#557c4c] focus:ring-2 focus:ring-[#b4d273]/50" id="jobDescription" placeholder="Describe the job..." ref={jobDescriptionRef} required></textarea>
                        </label>
                        <label className="block" htmlFor="resume">
                            <span className="mb-2 block text-sm font-bold">Resume upload</span>
                            <input className="block w-full border border-dashed border-[#aebdaf] bg-[#f8faf6] px-4 py-3 text-sm text-[#66736d] file:mr-4 file:border-0 file:bg-[#173d35] file:px-4 file:py-1.5 file:font-semibold file:text-white file:transition hover:file:bg-[#28574a]" type="file" id="resume" accept=".pdf,.doc,.docx" ref={resumeRef} required />
                        </label>
                    </div>
                    {error && <p className="mt-4 border-l-2 border-red-500 bg-red-50 px-4 py-2 text-sm text-red-700" role="alert">{error}</p>}
                    <button className="mt-5 w-full bg-[#173d35] px-5 py-3 font-bold text-white shadow-lg shadow-[#173d35]/15 transition hover:-translate-y-0.5 hover:bg-[#28574a] focus:outline-none focus:ring-2 focus:ring-[#b4d273] focus:ring-offset-2" type="submit">Generate interview report <span aria-hidden="true">-&gt;</span></button>
                </form>
                <div className='mt-8 px-5'>
                <ShowInterviewReportCard report={interviewReport} />
                </div>
            </section>
        </main>
    )
}

export default InterviewReportHome
