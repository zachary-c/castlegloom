import React from 'react'
import { apiClient } from '$/lib/client'
import { Concrete, poll_question_list, user_dashboard_information } from '$/lib/queries'
import { theme } from '../pollUtil'
import { UserRecord } from '$/lib/queries'
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

    const info : UserRecord | undefined = await apiClient.fetch(user_dashboard_information, { userId: userid.value })
    const questionData : PollQuestion_t[] = await apiClient.fetch(poll_question_list, {userId: userid.value })
    

    if (!info) {
        return <></>
    }
    const defined_info : Concrete<UserRecord> = {
        _id: info._id,
        name: info.name ?? '',
        isPolledDaily: info.isPolledDaily ?? false,
        title: {
            profession: info.title?.profession ?? '',
            qualifier: info.title?.qualifier ?? ''
        },
        email: info.email ?? ''
    }

    return <>
        <DashTabs userQuestionData={questionData} userData={defined_info} />
    </>

}