import React from 'react'

import Signup from '_components/poll/dash/Signup';

export default async function Page() {

	return <>
		<h1 className={`poll__page-title`}>Sign Up</h1>
		<div className='login__page'>
			<Signup />
		</div>
	</>

}

// homepage has meme of the day
// gallery page has all the memes -- links to memes or grid? unclear
