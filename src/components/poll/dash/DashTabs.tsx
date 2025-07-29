'use client'
import { Concrete } from "$/lib/queries";
import { LeaderboardRecord, UserRecord } from "$/lib/dashboard_queries"
import { PollQuestion_t } from "$/types/documents";
import React, { createContext, useEffect, useMemo, useState } from "react"
import { UserQuestionInfo } from "./types";
import PollEntry from "./PollEntry";
import { UserPreferences } from "./UserPreferences";
import { randomInRange, theme } from "@/poll/pollUtil";
import { Leaderboard } from "./Leaderboard";

export const UserContext = createContext<string>('')

const greetings = [
    "Greetings, "
]

export function getTitle(userData : Concrete<UserRecord>) {
    let str = ''
    
    if (userData.name.length > 0) {
        str += userData.name;
    }
    if ((userData.title.profession?.length ?? 0) > 0) {
        if (userData.name.length > 0) {
            str += ', '
        }
        str +=  userData.title?.profession
        if ((userData.title.qualifier?.length ?? 0) > 0) {
            str += " " + userData.title?.qualifier
        }
    }
    if (userData.name.length === 0 && (userData.title.profession?.length ?? 0) === 0) {
        str = userData.email
    }
    return str;
}

export default function DashTabs({ userData, userQuestionData, staticLeaderboardData } : { userData : Concrete<UserRecord>, userQuestionData : UserQuestionInfo[], staticLeaderboardData : LeaderboardRecord[] }) {
    const [currentTab, setCurrentTab] = useState(0);
    const [userRecord, setUserRecord] = useState<Concrete<UserRecord>>(userData)
    const [originalUserData, setOriginalUserData] = useState<Concrete<UserRecord>>(userData)
    const [leaderboardData, setLeaderboardData] = useState<LeaderboardRecord[]>(staticLeaderboardData)
    const greeting = useMemo(() => greetings[Math.floor((Date.now() / (1000 * 60 * 60)) % greetings.length)] + getTitle(userRecord), [userRecord])
    const countUnanswered = useMemo(() => userQuestionData.filter((q)=>!q.userResponse).length, [userQuestionData]);
    //console.log("leader", leaderboardData)
    const tabs = [
        {
            index: 0,
            title: 'Questions',
            body: <div className='pd__question-entries'>
            {
                userQuestionData.map((q : UserQuestionInfo, i : number) => 
                    <PollEntry preloadInfo={q} key={i} />
                )
            }
            </div>
        },
        {
            index:1,
            title:<>Unanswered <span>{countUnanswered}</span></>,
            body: <div className='pd__question-entries'>
            {
                userQuestionData.filter((q)=>!q.userResponse).map((q : UserQuestionInfo, i : number) => 
                    <PollEntry preloadInfo={q} key={'filtered'+q.title} />
                )
            }
            </div>
        },
        {
            index: 2,
            listitem: <li className='pd__tabmenu__spacer'></li>
        },
        {
            index: 3,
            title: 'Preferences',
            body: <UserPreferences userRecord={userRecord} setUserRecord={setUserRecord} originalRecord={originalUserData} setOriginalRecord={setOriginalUserData}/>
        },/* 
        {
            index: 2,
            title: 'Leaderboard',
            body: <Leaderboard leaderboardData={leaderboardData} setLeaderboardData={setLeaderboardData}/>
        }, */
    ]
    
    return (
        <>
            <h1 className={`pd__title ${theme}`}>{greeting}</h1>
            <UserContext.Provider value={userRecord._id}>
                <menu className="pd__tabmenu">
                    {tabs.map((t, i) => 
                        t.listitem? t.listitem : 
                        <li key={i} className={`pd__tabmenu__tab ${currentTab === t.index ? 'current' : ''}`} onClick={() => setCurrentTab(t.index)}>{t.title}</li>
                    )}
                </menu>
                <div className="pd__body">
                    {tabs[currentTab].body}
                </div>
            </UserContext.Provider>
        </>
    )
}