import "R/src/components/poll/styles/pollLogin.scss"

export default function LoginConfirm({ params } : { params : { email : string }}) {
    return <div className="login__confirm">
        <h1>Thanks for signing up!</h1>
        <p>Your email <b>{decodeURIComponent(params.email)}</b> should receive a signup confirmation in a few moments. Once confirmed, you can expect to receive a daily poll indefinitely. You can close this tab.</p>
    </div>
}