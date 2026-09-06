import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'

const OtpVerify = () => {
    const otpRef = useRef();

    const [error, setError] = useState(null);

    const handleVerification = async(e) => {
        e.preventDefault();
        const otp = otpRef.current.value;
        console.log("Entered OTP:", otp);
        try {
            const res = await fetch(
                "http://localhost:3000/api/auth/verify-otp",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ otp }),
                }
            );
            const data = await res.json();

            if (res.status === 200) {
                console.log("OTP verified successfully:", data);

            } else{
                setError(data.errorMessage || "Something went wrong");
            }

        }catch (error){
            console.error(error);
            setError(error.message || "Server error");
        }
    }
    return (
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
    )
}

export default OtpVerify
