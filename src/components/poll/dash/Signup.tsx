"use client"
import { useRouter } from "next/navigation"
import "../styles/pollLogin.scss"
import "../styles/theme_october.scss"
import "../styles/theme_november.scss"
import { useEffect, useState } from "react"

export default function Signup() {
	const [signupMessage, setSignupMessage] = useState("")
	const [signupEmailInput, setSignupEmailInput] = useState("")
	const [submittingSignup, setSubmittingSignup] = useState(false)

	const router = useRouter();

	useEffect(() => setSignupMessage(''), [signupEmailInput])

	async function submitSignup() {
		const regex = new RegExp(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi)
		if (!regex.test(signupEmailInput.trim())) {
			setSignupMessage("Invalid email address.")
			return;
		}
		setSubmittingSignup(true)
		const response = await fetch(`/api/poll/signup?email=${encodeURIComponent(signupEmailInput.toLowerCase())}`, { method: "POST" })
		if (response.ok) {
			router.push(`/poll/signup/signup-confirm/${signupEmailInput}`)
		} else {
			setSubmittingSignup(false)
			setSignupMessage("Sorry, something went wrong. Please try again later.")
		}
	}

	return (
		<div className="login__body">
			<h2>Sign Up</h2>
			<p>Castle Gloom will send you one poll (&quot;Census&quot;) question per day, ad infinitum, until the death of the author, robots take over, the author gets tired of the project or too busy to continue, or you edit your user preferences to opt out of future polls.</p>
			<div className="login__body__input-section signup">
				<div className="login__body__input-section__inline-label">
					<label>Email:</label>
					<input value={signupEmailInput} onKeyDown={(e) => { if (e.key === 'Enter') submitSignup() }} onChange={(e) => setSignupEmailInput(e.target.value)} placeholder="john@castlegloom.com" />
				</div>
				<button onClick={submitSignup} className={`poll__btn outline submit ${submittingSignup ? 'submitting' : ''}`}>{submittingSignup ? 'Submitting...' : "Sign Up"}</button>
				{signupMessage.length > 0 &&
					<span className="login__body__input-section__message">{signupMessage}</span>
				}
			</div>

		</div>
	)
}
