import React from 'react'
import Link from 'next/link'
import { apiClient } from '$/lib/client';
import { poll_404, poll_404_user_response } from '$/lib/queries';
import { PollQuestion_t } from '$/types/documents';
import PollQuestion from 'R/src/components/poll/frontdoor/PollQuestion';
import { cookies } from 'next/headers';
import { poll_cookie_user_id } from '@/api/poll/login/cookie';
import StandaloneInput from 'R/src/components/poll/frontdoor/StandaloneInput';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "404 Poll Not Found | Castle Gloom"
};

export default async function Page() {
  const cookieJar = cookies()

  const userid = cookieJar.get(poll_cookie_user_id)
  const data: PollQuestion_t = await apiClient.fetch(poll_404)
  let data_user_response: PollQuestion_t
  if (userid) {
    data_user_response = await apiClient.fetch(poll_404_user_response, { userId: userid.value })
  } else {
    data_user_response = await apiClient.fetch(poll_404)
  }

  return <>
    <h1 className={`poll__page-title`}>{data.title}</h1>
    <StandaloneInput question={data_user_response} userid={userid} />
    <span className={`poll__date`}>{data.date}</span>
    <Link className={`button poll__btn`} href={`/poll`}>Home</Link>
  </>

}

