"use client"
import "../styles/pollLogin.scss"
import { useEffect, useMemo, useState } from "react"
import "_components/poll/styles/authModal.scss"
import { emailRegex } from "@/poll/pollUtil"
import { getRandomTitle } from "./util"
import { SignupBody } from "@/api/poll/signup/route"

type SignupStatus = "need-title" | "ready" | "submitting"
type CompSwitch = "inputs" | "login-confirm" | "signup-details" | "signup-confirm"

export default function AuthModal({ modalOpen, setModalOpen }: { modalOpen: boolean, setModalOpen: (a: boolean) => void }) {
  const [prof, setProf] = useState("")
  const [qualif, setQualif] = useState("")
  const [compSwitch, setCompSwitch] = useState<CompSwitch>("inputs")
  const signupTitle = useMemo(() => {
    if (prof !== "" && qualif !== "") {
      return prof + " " + qualif
    }
    return "Mysterious Traveler"
  }, [prof, qualif])
  const [isPolledDaily, setIsPolledDaily] = useState(true)

  const [signupMessage, setSignupMessage] = useState("")
  const [signupEmailInput, setSignupEmailInput] = useState("")
  const [signupStatus, setSignupStatus] = useState<SignupStatus>("need-title")

  const [loginEmailInput, setLoginEmailInput] = useState("")
  const [loginMessage, setLoginMessage] = useState("")
  const [submittingLogin, setSubmittingLogin] = useState(false)


  useEffect(() => setLoginMessage(''), [loginEmailInput])
  useEffect(() => setSignupMessage(''), [signupEmailInput])

  async function submitLogin() {
    if (!emailRegex.test(loginEmailInput.trim())) {
      setLoginMessage("Invalid email address.")
      return;
    }
    setSubmittingLogin(true)
    const response = await fetch(`/api/poll/send-login-email?email=${encodeURIComponent(loginEmailInput.toLowerCase())}`, { method: "POST" })
    if (response.ok) {
      setCompSwitch("login-confirm")
    } else {
      setSubmittingLogin(false)
      setLoginMessage("Sorry, something went wrong. Please try again later.")
    }
  }

  async function submitSignup() {
    if (signupStatus !== "ready") return;
    setSignupStatus("submitting")
    const signupFields: SignupBody = {
      email: signupEmailInput,
      profession: prof,
      qualifier: qualif,
      isPolledDaily: isPolledDaily
    }
    const response = await fetch(`/api/poll/signup`, { method: "POST", body: JSON.stringify(signupFields) })
    if (response.ok) {
      setCompSwitch("signup-confirm")
    } else {
      setSignupStatus("need-title")
      setSignupMessage("Sorry, something went wrong. Please try again later.")
    }
  }
  function generateTitle() {
    if (signupStatus === "submitting") return
    const [profession, qualifier] = getRandomTitle(prof, qualif)
    setProf(profession)
    setQualif(qualifier)
    if (signupStatus === "need-title") {
      setSignupStatus("ready")
    }
  }
  function closeModal() {
    setCompSwitch("inputs")
    setModalOpen(false)
    setSignupStatus("need-title")
    setSignupEmailInput("")
    setLoginEmailInput("")
  }
  function moveToSignupDetails() {
    if (!emailRegex.test(signupEmailInput.trim())) {
      setSignupMessage("Invalid email address.")
      return;
    }
    setSignupMessage("")
    setCompSwitch("signup-details")
  }
  function moveToInitial() {
    setSignupMessage("")
    setCompSwitch("inputs")
    setQualif("")
    setProf("")
    setIsPolledDaily(true)
    setSignupStatus("need-title")
  }

  if (!modalOpen) return <></>

  let body = <></>
  switch (compSwitch) {
    case "login-confirm":
      body = <section className="am__confirm">
        <h2>Your login link is on the way!</h2>
        <p>An email will be sent to <b>{loginEmailInput}</b> with a login link in the next few minutes, assuming it is already registered within the castle walls.</p>
        <p>If you do not receive an email, please confirm you entered the correct address and <a href="/poll/login">try again</a>. If the issue persists, please send us an email at <a href="mailto:314oracle@gmail.com">314oracle@gmail.com</a>.</p>
      </section>
      break
    case "signup-confirm":
      body = <section className="am__confirm">
        <h2>Thanks for signing up!</h2>
        <p>Your email <b>{signupEmailInput}</b> should receive a signup confirmation in a few moments. Once confirmed, you&apos;ll be able to come finish answering this poll question, <b>{signupTitle}</b>!</p>
      </section>
      break;
    case "signup-details":
      body = <section className="am__input-section">
        <h2>Account Details</h2>
        <p className="am__text">In the court of Castle Gloom, you are known as the...</p>
        <span className="am__title">{signupTitle}</span>
        <button onClick={generateTitle} className={`am__btn generate`}>Generate Title</button>

        <section className="am__checkbox">
          <label htmlFor="poll-emails">Send Daily Poll Emails?</label>
          <input id="poll-emails" type="checkbox" checked={isPolledDaily} onChange={(e) => setIsPolledDaily(e.target.checked)} />
        </section>
        <p className="am__text note">Note: Daily emails will not begin until your email is confirmed, so as to avoid spam.</p>
        <section className="button-group justified">
          <button className="am__btn muted" onClick={moveToInitial}>Back</button>
          <button onClick={submitSignup} className={`am__btn submit ${signupStatus}`}>{signupStatus === "submitting" ? 'Submitting...' : "Submit"}</button>
        </section>
        {signupMessage.length > 0 &&
          <span className="login__body__input-section__message">{signupMessage}</span>
        }
      </section>
      break;
    case "inputs":
      body = <>
        <section className="am__input-section">
          <h2 className="left">Login...</h2>
          <div className="am__input-section__inline-label">
            <label>Email:</label>
            <input value={loginEmailInput} onKeyDown={(e) => { if (e.key === 'Enter') submitLogin() }} onChange={(e) => setLoginEmailInput(e.target.value)} placeholder="knight2@castlegloom.com" />
            <button onClick={submitLogin} className={`am__btn ${submittingLogin ? 'submitting' : ''}`}>{submittingLogin ? 'Submitting...' : "Submit"}</button>
          </div>
          {loginMessage.length > 0 &&
            <span className="login__body__input-section__message">{loginMessage}</span>
          }
        </section>
        <div className="am__divider" />
        <section className="am__input-section signup">
          <h2 className="left">...<span>or</span> Sign Up</h2>
          <div className="am__input-section__inline-label">
            <label>Email:</label>
            <input value={signupEmailInput} onKeyDown={(e) => { if (e.key === 'Enter') moveToSignupDetails() }} onChange={(e) => setSignupEmailInput(e.target.value)} placeholder="mysterious_newcomer@castlegloom.com" />
          </div>
          <section className="button-group">
            {signupMessage.length > 0 &&
              <span className="login__body__input-section__message">{signupMessage}</span>
            }
            <button onClick={moveToSignupDetails} className={`am__btn submit`}>Sign Up &gt;</button>
          </section>
        </section>
        <details>
          <summary>details, policies, and other considerations</summary>
          <p>Castle Gloom will send you one poll (&quot;Census&quot;) question per day, ad infinitum, until the death of the author, robots take over, the author gets tired of the project or too busy to continue, or you edit your user preferences to opt out of future polls.</p>
          <p>
            These polls will be delivered to your email; your email will also act as a login through &quot;magic links&quot;, clickable, and, due to this website&apos;s poor security, multi-use. Don&apos;t share your links, and don&apos;t take this too seriously, as the cybersecurity is laughable.
          </p>
        </details>
      </>
      break;
  }

  return <>
    <section className="am am__wrapper">
      {body}
      <button onClick={closeModal} className="am__close">X</button>
    </section>
    <div className="am__background-filter" onClick={closeModal} />
  </>

}
