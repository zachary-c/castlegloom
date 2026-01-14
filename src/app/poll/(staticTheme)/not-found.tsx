import React from 'react'
import Link from 'next/link'
import { apiClient } from '$/lib/client';
import { poll_404 } from '$/lib/queries';
import { PollQuestion_t } from '$/types/documents';
import PollQuestion from 'R/src/components/poll/frontdoor/PollQuestion';

export default async function Page() {
	const data: PollQuestion_t = await apiClient.fetch(poll_404)

	return <>
		<h1 className={`poll__page-title`}>{data.title}</h1>
		<PollQuestion question={data} date={data.date} />
		<span className={`poll__date`}>{data.date}</span>
		<Link className={`button poll__btn`} href={`/poll`}>Home</Link>
	</>

}

