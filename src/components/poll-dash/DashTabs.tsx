'use client'
import { RecipientInfo } from "$/lib/queries";
import { PollQuestion_t } from "$/types/documents";
import React, { createContext, useState } from "react"
import { UserQuestionInfo } from "./types";
import PollEntry from "./PollEntry";

export const UserContext = createContext<string>('')

export default function DashTabs({ userData, userQuestionData } : { userData : RecipientInfo, userQuestionData : UserQuestionInfo[]}) {
    const [currentTab, setCurrentTab] = useState(0);

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
            index: 1,
            title: 'Preferences',
            body: <div>
                        PREFERENCES WOOHOO
            </div>
        },
    ]
    
    return (
        <>
            <UserContext.Provider value={userData._id}>
                <menu className="pd__tabmenu">
                    {tabs.map((t, i) => 
                        <li key={i} className={`${currentTab === t.index ? 'current' : ''}`} onClick={() => setCurrentTab(t.index)}>{t.title}</li>
                    )}
                    <li className='spacer'></li>
                </menu>
                <div className="pd__body">
                    {tabs[currentTab].body}
                </div>
            </UserContext.Provider>
        </>
    )
}