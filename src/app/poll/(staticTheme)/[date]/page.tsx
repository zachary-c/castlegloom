import React from 'react'
import { apiClient } from '$/lib/client'
import { poll_by_date, poll_date_surrounding, poll_date_surrounding_user_response } from '$/lib/queries'
import { PollQuestion_t } from '$/types/documents'
import { notFound } from 'next/navigation'
import PollQuestion from 'R/src/components/poll/frontdoor/PollQuestion'
import '_components/spooktober/styles/daynav.scss'
import Link from 'next/link'
import { padToTwo, SIX_HOURS_OF_MILLISECONDS } from 'R/util'
import { Metadata } from 'next'
import PollQuestionInput from 'R/src/components/poll/frontdoor/PollQuestionInput'
import StandaloneInput from 'R/src/components/poll/frontdoor/StandaloneInput'
import { cookies } from 'next/headers'
import { poll_cookie_user_id } from '@/api/poll/login/cookie'

export async function generateMetadata({ params }: { params: { date: string } }): Promise<Metadata> {
  const data: PollQuestion_t = await apiClient.fetch(
    poll_by_date, { date: params.date }, { cache: 'no-store' })
  if (!data) notFound()

  const desc = data.questionText ?? (data.prompt?.promptType === "plainText" ? data.prompt.plaintextQuestionPrompt : data.prompt?.richTextAsPlaintext)
  return {
    title: `${data.title} | Castle Gloom`,
    description: desc,
  }
}

export const revalidate = 60;

type DatePollData = { today: PollQuestion_t, yesterday: { _id: string }, tomorrow: { _id: string } }

async function fetchDateData(userID: undefined | string, date: string, yString: string, tString: string):
  Promise<DatePollData> {
  let params = { date: date, previous: yString, nextPoll: tString, userId: "" }
  let query = poll_date_surrounding

  if (userID) {
    params["userId"] = userID
    query = poll_date_surrounding_user_response
  }

  return await apiClient.fetch(query, params, { cache: 'no-store' })
}

export default async function Page({ params }: { params: { date: string } }) {
  const cookieJar = cookies()
  const userid = cookieJar.get(poll_cookie_user_id)

  if (!params.date.match(/202[0-9]-[01][0-9]-[0-3][0-9]/g)) {
    notFound()
  }
  const datetime = new Date(params.date);
  const y = new Date(datetime.getTime() - (1000 * 60 * 60 * 24));
  const t = new Date(datetime.getTime() + (1000 * 60 * 60 * 24));
  const yString = `${y.getUTCFullYear()}-${padToTwo(y.getUTCMonth() + 1)}-${padToTwo(y.getUTCDate())}`
  const tString = `${t.getUTCFullYear()}-${padToTwo(t.getUTCMonth() + 1)}-${padToTwo(t.getUTCDate())}`

  const data = await fetchDateData(userid?.value, params.date, yString, tString)

  if (!data.today) {
    notFound()
  }

  return <>
    <h1 className={`poll__page-title`}>{data.today.title}</h1>
    {userid ?
      <StandaloneInput question={data.today} userid={userid.value} />
      :
      <PollQuestion question={data.today} date={params.date} />
    }
    <span className={`poll__date`}>{params.date}</span>
    <div className='daynav__container'>
      {data.yesterday &&
        <div className='daynav__button'>
          <Link className={`button poll__btn`} href={`/poll/${yString}`}>Previous</Link>
        </div>
      }
      {data.tomorrow && t.getTime() < Date.now() - SIX_HOURS_OF_MILLISECONDS &&
        <div className='daynav__button'>
          <Link className={`button poll__btn`} href={`/poll/${tString}`}>Next</Link>
        </div>
      }
    </div>
    <Link className={`button poll__btn`} href={`/poll`}>Home</Link>
  </>
}
