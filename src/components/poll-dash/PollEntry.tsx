'use client'
import { useEffect, useState } from "react";
import { UserQuestionInfo } from "./types";
import { theme } from "@/poll/pollUtil";
import "./styles/pollentry.scss"
import PollQuestionInput from "../PollQuestionInput";

export default function PollEntry({ preloadInfo } : { preloadInfo : UserQuestionInfo }) {
    const [open, setOpen] = useState<boolean>(false);
    const [info, setInfo] = useState<UserQuestionInfo>(preloadInfo)
    return (
        <div className={`pe ${info.userResponse ? 'responded' : ''} ${open ? 'open' : ''}`}>
            <div className={`pe__header`} onClick={() => setOpen(!open)}>
                <h3 className="pe__header__title">{info.title}</h3>
                <span className="pe__header__text">{!open && info.questionText}</span>
                <span className="pe__header__date">{info?.date}</span>
            </div>
            {open ? 
                <div className="pe__body">
                    <PollQuestionInput question={info} setQuestion={setInfo} date={info.date} theme={theme} />
                </div>
            : <></>}
        </div>
    )
}