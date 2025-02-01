"use client"
import { emailRegex } from "@/poll/pollUtil"
import Link from "next/link"
import { useRouter } from "next/navigation"
import "R/src/components/poll-dash/styles/pollLogin.scss"
import { useEffect, useState } from "react"

export default function Signup() {
    const [signupMessage, setSignupMessage] = useState("")
    const [signupEmailInput, setSignupEmailInput] = useState("")
    const [submittingSignup, setSubmittingSignup] = useState(true)

    const router = useRouter();

    useEffect(() => setSignupMessage(''), [signupEmailInput])

    async function submitSignup() {
        const regex = new RegExp(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi)
        if (!regex.test(signupEmailInput.trim())) {
            setSignupMessage("Invalid email address.")
            return;
        }
        setSubmittingSignup(true)
        const response = await fetch(`/api/poll/signup?email=${encodeURIComponent(signupEmailInput)}`, { method: "POST" })
        if (response.ok) {
            router.push(`/poll/login/signup-confirm/${signupEmailInput}`)
        } else {
            setSubmittingSignup(false)
            setSignupMessage("Sorry, something went wrong. Please try again later.")
        }
    }

    return (
        <div className="login__body">
            <h2>Sign Up</h2>
            <div className="login__body__input-section signup">
                <div className="login__body__input-section__inline-label">
                    <label>Email:</label>
                    <input value={signupEmailInput} onChange={(e) => setSignupEmailInput(e.target.value)} placeholder="john@castlegloom.com"/>
                </div>
                <button onClick={submitSignup} className={`poll__btn outline submit ${submittingSignup ? 'submitting' : ''}`}>{submittingSignup ? 'Submitting...' : "Sign Up"}</button>
{/*                 <Link href="/poll" className="poll__btn outline">Home</Link>
 */}                {signupMessage.length > 0 &&
                    <span className="login__body__input-section__message">{signupMessage}</span>
                }
            </div>
        </div>
    )
}