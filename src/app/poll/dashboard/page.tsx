import React from 'react'
import { apiClient } from '$/lib/client'
import { poll_question_list, user_dashboard_information } from '$/lib/queries'
import { theme } from '../pollUtil'
import { RecipientInfo } from '$/lib/queries'
import { cookies } from 'next/headers'
import { pollCookieName } from '@/api/poll/login/cookie'
import { redirect, RedirectType } from 'next/navigation'
import { PollQuestion_t, PollResponse_t } from '$/types/documents'
import { UserQuestionInfo } from 'R/src/components/poll-dash/types'
import PollEntry from 'R/src/components/poll-dash/PollEntry'
import 'R/src/components/poll-dash/styles/pollDashboard.scss'
import DashTabs from 'R/src/components/poll-dash/DashTabs'


export default async function Page() {
    //console.log('data', datetime)
    const cookieJar = cookies()

    const userid = cookieJar.get(pollCookieName)
    if (!userid) {
        redirect('/poll', RedirectType.replace)
    }
    console.log('userid', userid)
    const info : RecipientInfo | undefined = await apiClient.fetch(user_dashboard_information, { userid: userid.value })
    const questionData : PollQuestion_t[] = await apiClient.fetch(poll_question_list)
    const compared : UserQuestionInfo[] = questionData.map((q, i) => {
        return {
            ...q,
            userResponse: q.responses.find((r) => r.listOfResponders?.some((v) => v._ref === userid.value))?.responseSlug.current
        }
    })
    console.log(compared[2].responses)
    if (!info) {
        return <></>
    }

    return <>
        <h1 className={`pd__title ${theme}`}>Hello {info?.email}</h1>
        <DashTabs userQuestionData={compared} userData={info} />
    </>

}