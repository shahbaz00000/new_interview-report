import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SendVerification = () => {

  const [user, setUser] = useState({ email: "" ,otp:""});
  const [sentOtp,setSentOtp] = useState(false);
  const [error, setError] = useState(null);

  const userEmail = useRef();
  const otpRef = useRef();

  const navigate = useNavigate();

  // hanlde send opt verifications
  const handleSendOtp = async (e) => {
    e.preventDefault();

    const email = userEmail.current.value;

    try {
        const res = await fetch(
            "http://localhost:3000/api/auth/send-otp",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            }
        );
        const data = await res.json();
        if (res.status === 200) {
          console.log("OTP sent successfully:", data);
            setUser({ email: data.email, otp: data.otp });
            setSentOtp(true)
        } else {
            setError(data.errorMessage || "Something went wrong");
        }
    } catch (error) {
        console.error(error);
        setError(error.message || "Server error");
    }
};

// handle OTP verification
    const handleVerification = async(e) => {
        e.preventDefault();
        const otp = otpRef.current.value;

        try {
            const res = await fetch(
                "http://localhost:3000/api/auth/verify-otp",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email: user.email, otp }),
                }
            );
            const data = await res.json();
            if (res.status === 200) {
                console.log("OTP verified successfully:", data);
                navigate("/interview-reports");
            } else{
                setError(data.errorMessage || "Something went wrong");
            }

        }catch (error){
            console.error(error);
            setError(error.message || "Server error");
        }
    }


    return (
      <main className="min-h-screen bg-[#f3f5f0] text-[#17231f]">
        <section className="relative overflow-hidden bg-[#173d35] px-6 py-8 text-[#f5f7ef] sm:px-10 lg:px-16">
          <div className="absolute -right-24 -top-32 h-80 w-80 rounded-full border border-[#d6e8bd]/20 shadow-[0_0_0_35px_rgba(214,232,189,0.05),0_0_0_70px_rgba(214,232,189,0.04)]" />
          <div className="relative mx-auto flex max-w-6xl items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#b4d273] font-bold text-[#173d35]">IR</div>
              <span className="font-semibold tracking-tight">Interview Reports</span>
            </div>
            <span className="hidden text-xs font-bold uppercase tracking-[0.16em] text-[#c9d6c6] sm:block">Secure workspace</span>
          </div>
          <div className="relative mx-auto grid max-w-6xl gap-10 py-16 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:py-28">
            <div>
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-[#b4d273]">AI interview intelligence</p>
              <h1 className="max-w-3xl font-sans text-4xl font-bold leading-[1.03] tracking-tight sm:text-6xl lg:text-7xl">From conversation to confident decision.</h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-[#c9d6c6]">Capture every signal, uncover the themes, and turn interviews into reports your team can act on.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-xl border border-[#d6e8bd]/20 bg-[#f5f7ef]/[0.06] p-4"><p className="text-2xl font-bold text-[#b4d273]">01</p><p className="mt-2 text-sm text-[#d9e3d6]">Upload your interview notes</p></div>
              <div className="rounded-xl border border-[#d6e8bd]/20 bg-[#f5f7ef]/[0.06] p-4"><p className="text-2xl font-bold text-[#b4d273]">02</p><p className="mt-2 text-sm text-[#d9e3d6]">Find patterns with AI</p></div>
              <div className="rounded-xl border border-[#d6e8bd]/20 bg-[#f5f7ef]/[0.06] p-4"><p className="text-2xl font-bold text-[#b4d273]">03</p><p className="mt-2 text-sm text-[#d9e3d6]">Share a clear report</p></div>
            </div>
          </div>
        </section>
        {!sentOtp && (
        <section className="mx-auto flex max-w-6xl justify-center px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
          <div className="w-full max-w-lg rounded-2xl border border-[#d8dfd5] bg-white p-7 shadow-[0_18px_60px_rgba(32,58,43,0.08)] sm:p-10">
            <div className="mb-9 flex h-12 w-12 items-center justify-center rounded-full bg-[#e4efd0] text-xl text-[#557c4c]">@</div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#557c4c]">Create your account</p>
            <h2 className="font-sans text-3xl font-bold leading-tight tracking-tight sm:text-4xl">Your interview workspace is one step away.</h2>
            <p className="mt-4 leading-7 text-[#66736d]">Verify your work email to start turning conversations into structured, insightful reports.</p>
            <form className="mt-9 flex flex-col gap-3" onSubmit={handleSendOtp}>
              <label className="text-sm font-semibold text-[#33423b]" htmlFor="verification-email">Work email address</label>
              <input className="rounded-lg border border-[#cbd5c9] bg-[#f8faf5] px-4 py-3.5 text-[#17231f] outline-none transition placeholder:text-[#91a098] focus:border-[#557c4c] focus:ring-4 focus:ring-[#557c4c]/15" id="verification-email" type="email" placeholder="you@company.com" ref={userEmail} autoComplete="email" required />
              <button className="mt-4 flex items-center justify-between rounded-lg bg-[#173d35] px-5 py-4 font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#28574a]" type="submit">Send verification email <span aria-hidden="true">-&gt;</span></button>
            </form>
            <p className="mt-6 text-xs leading-5 text-[#84918a]">By continuing, you agree to keep interview data confidential and secure.</p>
          </div>
        </section>
        )}
        {sentOtp && (
          <main className="min-h-screen bg-[#f3f5f0] px-6 py-8 text-[#17231f] sm:px-10 lg:px-16">
            <header className="mx-auto flex max-w-6xl items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#173d35] font-bold text-[#b4d273]">IR</div>
                    <span className="font-semibold tracking-tight">Interview Reports</span>
                </div>
                <span className="hidden text-xs font-bold uppercase tracking-[0.16em] text-[#557c4c] sm:block">Secure workspace</span>
            </header>

            <section className="mx-auto flex max-w-6xl justify-center py-16 sm:py-24">
                <div className="w-full max-w-lg rounded-2xl border border-[#d8dfd5] bg-white p-7 shadow-[0_18px_60px_rgba(32,58,43,0.08)] sm:p-10">
                    <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-[#e4efd0] text-xl text-[#557c4c]">✓</div>
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#557c4c]">Email verification</p>
                    <h1 className="font-sans text-3xl font-bold leading-tight tracking-tight sm:text-4xl">Confirm your workspace</h1>
                    <p className="mt-4 leading-7 text-[#66736d]">Enter the one-time code sent to your email to continue building interview reports.</p>

                    <form className="mt-9 flex flex-col gap-3" onSubmit={handleVerification}>
                        <label className="text-sm font-semibold text-[#33423b]" htmlFor="otp">Verification code</label>
                        <input className="rounded-lg border border-[#cbd5c9] bg-[#f8faf5] px-4 py-4 text-center text-2xl font-bold tracking-[0.45em] text-[#17231f] outline-none transition placeholder:text-sm placeholder:font-normal placeholder:tracking-normal placeholder:text-[#91a098] focus:border-[#557c4c] focus:ring-4 focus:ring-[#557c4c]/15" id="otp" type="text" inputMode="numeric" maxLength="6" placeholder="Enter 6-digit code" ref={otpRef} required />
                        {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">{error}</p>}
                        <button className="mt-4 flex items-center justify-between rounded-lg bg-[#173d35] px-5 py-4 font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#28574a]" type="submit">Verify code <span aria-hidden="true">-&gt;</span></button>
                    </form>
                    <p className="mt-6 text-center text-xs text-[#84918a]">Your code expires shortly. Check your spam folder if you do not see it.</p>
                </div>
            </section>
        </main>
        )}
      </main>
    )
  }

  export default SendVerification
