"use client"
import { emailRegex } from "@/poll/pollUtil"
import Link from "next/link"
import { useRouter } from "next/navigation"
import "../styles/pollLogin.scss"
import "../styles/theme_october.scss"
import "../styles/theme_november.scss"
import "../styles/theme_december.scss"
import { useEffect, useState } from "react"

export default function Login() {
	const [emailInput, setEmailInput] = useState("")
	const [loginMessage, setLoginMessage] = useState("")
	const [submittingLogin, setSubmittingLogin] = useState(false)

	const router = useRouter();

	useEffect(() => setLoginMessage(''), [emailInput])

	async function submitLogin() {
		if (!emailRegex.test(emailInput.trim())) {
			setLoginMessage("Invalid email address.")
			return;
		}
		setSubmittingLogin(true)
		const response = await fetch(`/api/poll/send-login-email?email=${encodeURIComponent(emailInput.toLowerCase())}`, { method: "POST" })
		if (response.ok) {
			router.push(`/poll/login/login-confirm/${emailInput}`)
		} else {
			setSubmittingLogin(false)
			setLoginMessage("Sorry, something went wrong. Please try again later.")
		}
	}

	return (
		<div className="login__body">
			<h2>Login</h2>
			<div className="login__body__input-section login">
				<label>Enter your email address to receive a login link:</label>
				<input value={emailInput} onKeyDown={(e) => { if (e.key === 'Enter') submitLogin() }} onChange={(e) => setEmailInput(e.target.value)} />
				<button onClick={submitLogin} className={`poll__btn outline submit ${submittingLogin ? 'submitting' : ''}`}>{submittingLogin ? 'Submitting...' : "Submit"}</button>
				{loginMessage.length > 0 &&
					<span className="login__body__input-section__message">{loginMessage}</span>
				}
			</div>
			<h2 className="login__body__cta">Don&apos;t have an account? <Link href="/poll/signup">Sign up for polling!</Link></h2>
		</div>
	)
}
