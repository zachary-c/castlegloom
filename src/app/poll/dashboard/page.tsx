import React from 'react'
import { apiClient } from '$/lib/client'
import { Concrete } from '$/lib/queries'
import { LeaderboardRecord, UserRecord, leaderboardQuery, poll_question_list, user_dashboard_information } from "$/lib/dashboard_queries"
import { cookies } from 'next/headers'
import { pollCookieName } from '@/api/poll/login/cookie'
import { redirect, RedirectType } from 'next/navigation'
import { PollQuestion_t } from '$/types/documents'
import '_components/poll/styles/pollDashboard.scss'
import '_components/poll/styles/theme_october.scss'
import DashTabs from '_components/poll/dash/DashTabs'

export default async function Page() {
	//console.log('data', datetime)
	const cookieJar = cookies()

	const userid = cookieJar.get(pollCookieName)
	if (!userid) {
		redirect('/poll/login', RedirectType.replace)
	}

	const info: UserRecord | undefined = await apiClient.fetch(user_dashboard_information, { userId: userid.value })
	const questionData: PollQuestion_t[] = await apiClient.fetch(poll_question_list, { userId: userid.value })
	const leaderboardData: LeaderboardRecord[] = await apiClient.fetch(leaderboardQuery)

	if (!info) {
		redirect('/poll/login', RedirectType.replace)
	}
	const defined_info: Concrete<UserRecord> = {
		_id: info._id,
		name: info.name ?? '',
		isPolledDaily: info.isPolledDaily ?? false,
		title: {
			profession: info.title?.profession ?? '',
			qualifier: info.title?.qualifier ?? ''
		},
		email: info.email ?? '',
	}
	const cleanedLeaderboardData: LeaderboardRecord[] = []
	leaderboardData.forEach((d) => {
		const newData = { ...d }
		delete newData["_id"];

		if (userid && d._id === userid.value) {
			newData.isUser = true;
		}
		cleanedLeaderboardData.push(newData)
	})

	return <>
		<DashTabs userQuestionData={questionData} userData={defined_info} staticLeaderboardData={cleanedLeaderboardData} />
	</>

}
