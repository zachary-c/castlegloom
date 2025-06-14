import "_components/poll/styles/pollLogin.scss"

export default function LoginConfirm({ params } : { params : { email : string }}) {
    return <div className="login__confirm">
        <h1>Your login link is on the way!</h1>
        <p>If registered with our systems, an email will be sent to <b>{decodeURIComponent(params.email)}</b> with a login link in the next few minutes.</p>
        <p>If you do not receive an email, please confirm you entered the correct address and <a href="/poll/login">try again</a>. If the issue persists, please send us an email at <a href="mailto:314oracle@gmail.com">314oracle@gmail.com</a>.</p>
    </div>
}