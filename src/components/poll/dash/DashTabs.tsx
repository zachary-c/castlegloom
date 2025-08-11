'use client'
import { Concrete } from "$/lib/queries";
import { LeaderboardRecord, UserRecord } from "$/lib/dashboard_queries"
import React, { createContext, useMemo, useState } from "react"
import { UserQuestionInfo } from "./types";
import PollEntry from "./PollEntry";
import { UserPreferences } from "./UserPreferences";
import { theme } from "@/poll/pollUtil";
import { Leaderboard } from "./Leaderboard";

export const UserContext = createContext<string>('')

const greetings = [
    "Greetings, "
    ,"Howdy, "
    ,"Ahoy, "
    ,"Commiserations, "
    ,"Congratulations, "
    ,"What's 🅱️rackin, "
    ,"Salutations, "
    ,"#%$&SYNT@X ERROr@%, "
    ,"{spamming_user_name}, "
    ,"Look who it is! It's, "
    ,"What's happenin', "
    ,"What's goin on, "
    ,"Good to see you, "
    ,"So glad you're here, "
    ,"Right this way, "
    ,"Yo, "
    ,"Aloha, "
    ,"Wait till you see this, "
    ,"How fare ye, "
    ,"What cheer, "
    ,"So glad to see you, "
    ,"Top of the day to you, "
    ,"How do you do, "
    ,"[Hat tip], "
    ,"Salute plurimam dicit. Si vales, bene est, ego valeo, " // Latin meaning “Many greetings. If you’re well, then that’s good, and I’m well too.”
    ,"Breaker, breaker, "
    ,"It's good to see you, "
    ,"Warm greetings, "
    ,"A pleasure to see you, "
    ,"[Hi-five], "
    ,"[Fist bump], "
    ,"[Secret handshake], "
    ,"Hope your day is great, "
    ,"Cheerio!, "
    ,"Well, if it isn't, "
    ,"Well met, "
    ,"Delighted to see you, "
    ,"I welcome your company, "
    ,"Wherefore art thou, "
    ,"Ready to take on the world, "
    ,"Let's make today legendary, "
    ,"Greetings human, "
    ,"Carpe diem, "
    ,"Another day, another adventure awaits, "
    ,"The curtain rises, and the spotlight is on, "
    ,"How's it going, "
    ,"1, 2, 3, all eyes on, "
    ,"Attention everyone, I'd like to introduce, "
    ,"Please welcome, "
    ,"I'm glad we crossed paths, "
    ,"Thank you for taking time to meet with me, "
    ,"Cheers, "
    ,"Hey, look who's here. It's, "
    ,"You're looking well, "
    ,"Stay curious, "
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
    const greeting = useMemo(() => greetings[Math.floor((Date.now() / (1000 * 60)) % greetings.length)] + getTitle(userRecord), [userRecord])
    const countUnanswered = useMemo(() => userQuestionData.filter((q)=>!q.userResponse).length, [userQuestionData]);
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
            title:<>Unanswered <span className="pd__tabmenu__badge">{countUnanswered}</span></>,
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
            title: 'Leaderboard',
            body: <Leaderboard leaderboardData={leaderboardData} setLeaderboardData={setLeaderboardData}/>
        },
        {
            index: 3,
            listitem: <li className='pd__tabmenu__spacer'></li>
        },
        {
            index: 4,
            title: 'Preferences',
            body: <UserPreferences userRecord={userRecord} setUserRecord={setUserRecord} originalRecord={originalUserData} setOriginalRecord={setOriginalUserData}/>
        } 
    ]
    
    return (
        <>
            <h1 className={`pd__title ${theme}`}>{greeting}</h1>
            <UserContext.Provider value={userRecord._id}>
                <menu className="pd__tabmenu">
                    {tabs.map((t, i) => 
                        t.listitem ? <React.Fragment key={i}>{t.listitem}</React.Fragment> : 
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