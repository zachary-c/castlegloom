'use client'
import { useState } from "react";
import { UserQuestionInfo } from "./types";
import PollQuestion from "../PollQuestion";
import { theme } from "@/poll/pollUtil";
import "./styles/pollentry.scss"

export default function PollEntry({ info } : { info : UserQuestionInfo }) {
    const [open, setOpen] = useState<boolean>(false);
    
    return (
        <div className={`pe ${open ? 'open' : ''}`}>
            <div className={`pe__header`} onClick={() => setOpen(!open)}>
                    <h3 className="pe__header__title">{info.title}</h3>
                    {!open && <span className="pe__header__text">{info.questionText}</span>}
                {/* <div className="pe__header__titlegroup">
                </div>
                 */}<span className="pe__header__date">{info.date}</span>
            </div>
            {open ? 
                <div className="pe__body">
                    <PollQuestion question={info} date={info.date} theme={theme} useProvidedData={true}/>
                </div>
            : <></>}
        </div>
    )
}