import React from 'react'
import "_components/poll/styles/pollLogin.scss"

export default async function Page() {

	return <>
		<div className='login__confirm'>
			<h1>Invalid Response</h1>
			<p>Sorry, but the response you&apos;ve selected is invalid. The question may have changed, or you may be doing something you aren&apos;t supposed to do. Please check your email for a correction, if one exists.</p>
		</div>
	</>

}
