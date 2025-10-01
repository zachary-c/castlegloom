import React from 'react'
import '../../../../components/spooktober/styles/global.scss'
import '../../../../components/spooktober/styles/daynav.scss'
import Link from 'next/link'

export default async function NotFound() {

	return (
		<>
			<h1>404 Not Found</h1>
			<h2>Sorry, no spooky meme for this day.</h2>
			<div className='daynav__button'>
				<Link className="button" href='/'>Return Home</Link>
			</div>
		</>
	)
}
