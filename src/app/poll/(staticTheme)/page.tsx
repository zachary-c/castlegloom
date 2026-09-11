import React from 'react'
import { apiClient } from '$/lib/client'
import { poll_latest, poll_latest_surrounding, poll_latest_surrounding_user_response } from '$/lib/queries'
import { PollQuestion_t } from '$/types/documents'
import { notFound } from 'next/navigation'
import PollQuestion from '_components/poll/frontdoor/PollQuestion'
import '_components/spooktober/styles/daynav.scss'
import Link from 'next/link'
import { padToTwo } from 'R/util'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { poll_cookie_user_id } from '@/api/poll/login/cookie'
import StandaloneInput from 'R/src/components/poll/frontdoor/StandaloneInput'

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

type latestData = { today: PollQuestion_t, previous: { _id: string } }

async function fetchLatestData(userID: undefined | string): Promise<latestData> {
  let params = { userId: "" }
  let query = poll_latest_surrounding

  if (userID) {
    params["userId"] = userID
    query = poll_latest_surrounding_user_response
  }

  return await apiClient.fetch(query, params, { cache: 'no-store' })
}

export default async function Page() {
  // get these so we can check if the user is signed in and show them the dashboard button if so
  const cookieJar = cookies()
  const userid = cookieJar.get(poll_cookie_user_id)

  const data = await fetchLatestData(userid?.value)

  const datetime = new Date(data.today.date)
  const y = new Date(datetime.getTime() - (1000 * 60 * 60 * 24) + (1000 * 60 * 60 * 3));
  const yString = `${y.getUTCFullYear()}-${padToTwo(y.getUTCMonth() + 1)}-${padToTwo(y.getUTCDate())}`

  if (!data.today) {
    notFound()
  }

  return <>
    <h1 className={`poll__page-title`}>{data.today.title}</h1>
    {userid ?
      <StandaloneInput question={data.today} userid={userid.value} />
      :
      <PollQuestion question={data.today} date={data.today.date} />
    }
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
      {!userid ?
        <>
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
        </> :
        <Link className='button poll__btn cta' href="/poll/dashboard">
          <span>
            Dashboard
          </span>
        </Link>
      }
    </div>
  </>

}
