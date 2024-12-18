import React from 'react'
import { apiClient } from '$/lib/client'
import { user_dashboard_information } from '$/lib/queries'
import { theme } from '../pollUtil'
import { RecipientInfo } from '$/lib/queries'
import { cookies } from 'next/headers'
import { pollCookieName } from '@/api/poll/login/cookie'
import { redirect, RedirectType } from 'next/navigation'

export default async function Page() {
    //console.log('data', datetime)
    const cookieJar = cookies()

    const userid = cookieJar.get(pollCookieName)
    if (!userid) {
        redirect('/poll', RedirectType.replace)
    }
    console.log('userid', userid)
    const info : RecipientInfo | undefined = await apiClient.fetch(user_dashboard_information, { userid: userid.value })
    console.log(info)
    return <>
        <h1 className={`poll__page-title ${theme}`}>Hello {info?.email}</h1>
    </>

}