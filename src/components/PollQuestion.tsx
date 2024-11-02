'use client'
import { PollQuestion_t } from "$/types/documents";
import "R/src/styles/pollQuestion.scss"
import { useEffect, useMemo, useState } from "react";

export default function PollQuestion({ question, date } : { question : PollQuestion_t, date : string}) {
    const [questionData, setQuestionData] = useState<PollQuestion_t | undefined>(undefined)
    const [loadingData, setLoadingData] = useState<boolean>(true)
    //console.log('question', question);
    //let totalResponses = 0;
    //question.responses.forEach((r) => totalResponses += r.listOfResponders?.length ?? 0)

    const totalResponses = useMemo(() => {
        let count = 0;
        if (questionData?.responses) {
            questionData.responses.forEach((r) => count += r.responseCount)
        }
        
        return count;
    }, [questionData])

    async function getData() {
        setLoadingData(true)
        let response = await fetch(`/api/get-poll?date=${date}`)
        
        const data = await response.json()
        setQuestionData(data)
        console.log(data)
        setLoadingData(false)
    }
    useEffect(() => {
        getData()
    }, []) 

    return <div className="poll">
        <h3 className="poll__header">{question.questionText}</h3> 
        <ul className="poll__options">
            {questionData ? questionData.responses.map((r, i) => 
                <li key={i} className="poll__options__item">
                    <div className="poll__options__item__fill-bar" style={{ width: `${(r.responseCount/totalResponses) * 100}%`}}></div>
                    <span className="poll__options__item__text">{r.responseText}</span>
                    <span className="poll__options__item__count">{r.responseCount > 0 ? `${r.responseCount}` : ''}</span>
                </li>
            ) : question.responses.map((r, i) => 
                <li key={i} className="poll__options__item">
                    <div className="poll__options__item__fill-bar"></div>
                    <span className="poll__options__item__text">{r.responseText}</span>
                    <span className="poll__options__item__count">~</span>
                </li>
            )}
        </ul>
        <span className="poll__response_count">Total Responses: {totalResponses ?? '?'}</span>
        <button onClick={getData}>Refresh</button>
        {loadingData && <span className="loading-notice">Refreshing...</span>}
    </div>
}