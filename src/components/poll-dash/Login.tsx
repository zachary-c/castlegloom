"use client"
import { emailRegex } from "@/poll/pollUtil"
import { useRouter } from "next/navigation"
import "R/src/components/poll-dash/styles/pollLogin.scss"
import { useEffect, useState } from "react"

export default function Login() {
    const [emailInput, setEmailInput] = useState("")
    const [loginMessage, setLoginMessage] = useState("")
    const [signupMessage, setSignupMessage] = useState("")
    const [signupEmailInput, setSignupEmailInput] = useState("")
    const [showSignup, setShowSignup] = useState(false)
    const [submittingLogin, setSubmittingLogin] = useState(false)
    const [submittingSignup, setSubmittingSignup] = useState(false)
    const router = useRouter();

    useEffect(() => setLoginMessage(''), [emailInput])
    useEffect(() => setSignupMessage(''), [signupEmailInput])

    async function submitLogin() {
        if (!emailRegex.test(emailInput.trim())) {
            setLoginMessage("Invalid email address.")
            return;
        }
        setSubmittingLogin(true)
        const response = await fetch(`/api/poll/send-login-email?email=${encodeURIComponent(emailInput)}`, { method: "POST" })
        if (response.ok) {
            router.push(`/poll/login/login-confirm/${emailInput}`)
        } else {
            setSubmittingLogin(false)
            setLoginMessage("Sorry, something went wrong. Please try again later.")
        }
    }
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
            setLoginMessage("Sorry, something went wrong. Please try again later.")
        }
    }

    return (
        <div className="login__body">
            <h2>Login</h2>
            <div className="login__body__input-section login">
                <label>Enter your email address to receive a login link:</label>
                <input value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />
                <button onClick={submitLogin} className={`${submittingLogin ? 'submitting' : ''}`}>{submittingLogin ? 'Submitting...' : "Submit"}</button>
                {loginMessage.length > 0 &&
                    <span className="login__body__input-section__message">{loginMessage}</span>
                }
            </div>
            <div className="login__body__divider">
                <span className="spacer"></span>
                <span>or</span>
                <span className="spacer"></span>
            </div>
            <div className={`login__body--collapsible-header${showSignup ? ' open' : ''}`} onClick={() => setShowSignup(!showSignup)}>
                <h2>Don&apos;t have an account? Sign up for polling!</h2>
                <span>{"<"}</span>
            </div>
            {showSignup && 
                <div className="login__body__input-section signup">
                    <div className="login__body__input-section__inline-label">
                        <label>Email:</label>
                        <input value={signupEmailInput} onChange={(e) => setSignupEmailInput(e.target.value)} placeholder="john@castlegloom.com"/>
                    </div>
                    <button onClick={submitSignup} className={`${submittingSignup ? 'submitting' : ''}`}>{submittingSignup ? 'Submitting...' : "Sign Up"}</button>
                    {signupMessage.length > 0 &&
                        <span className="login__body__input-section__message">{signupMessage}</span>
                    }
                </div>
            }
        </div>
    )
}