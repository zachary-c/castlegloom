import React from 'react'
import { apiClient } from '$/lib/client'
import { poll_latest, poll_latest_surrounding } from '$/lib/queries'
import { PollQuestion_t } from '$/types/documents'
import { notFound } from 'next/navigation'
import PollQuestion from '_components/poll/frontdoor/PollQuestion'
import '_components/spooktober/styles/daynav.scss'
import Link from 'next/link'
import { padToTwo } from 'R/util'
import { Metadata } from 'next'

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
	const data: PollQuestion_t = await apiClient.fetch(
		poll_latest, {}, { cache: 'no-store' })

	const desc = data.questionText ?? (data.prompt?.promptType === "plainText" ? data.prompt.plaintextQuestionPrompt : data.prompt?.richTextAsPlaintext)
	return {
		title: `${data.title} | Castle Gloom`,
		description: desc,
		authors: { name: "Castle Gloom Smithing" },
		applicationName: "Castle Gloom Census"

	}
}


export default async function Page() {

	const data: { today: PollQuestion_t, previous: { _id: string } }
		= await apiClient.fetch(
			poll_latest_surrounding,
			{},
			{ cache: 'no-store' }
		)
	const datetime = new Date(data.today.date)

	const y = new Date(datetime.getTime() - (1000 * 60 * 60 * 24) + (1000 * 60 * 60 * 3));
	const yString = `${y.getUTCFullYear()}-${padToTwo(y.getUTCMonth() + 1)}-${padToTwo(y.getUTCDate())}`
	//console.log('yesterday, datetime', y, datetime, yString),
	//console.log("components", y.getFullYear(), y.getMonth()+1, padToTwo(y.getUTCDate()))

	if (!data.today) {
		notFound()
	}

	return <>
		<h1 className={`poll__page-title`}>{data.today.title}</h1>
		<PollQuestion question={data.today} date={data.today.date} />
		<span className={`poll__date`}>{data.today.date}</span>
		<div className='daynav__container'>
		</div>
		<div className={`poll__page-footer`}>
			{data.previous &&
				<div className='daynav__button'>
					<Link className={`button poll__btn`} href={`/poll/${yString}`}>Previous</Link>
				</div>
			}
			<a className={`button poll__btn outline`} href='https://forms.gle/XJCmS9HtPZ3yTeUD6'>Suggest a Question</a>
			<Link className={`button poll__btn outline`} href='/poll/login'>
				<span>
					Log In
				</span>
			</Link>
			<Link className={`button poll__btn outline cta`} href='/poll/signup'>
				<span>
					Sign Up!
				</span>
			</Link>
		</div>
	</>

}
