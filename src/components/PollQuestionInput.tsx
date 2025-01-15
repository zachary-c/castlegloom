'use client'
import { PollQuestion_t } from "$/types/documents";
import "R/src/styles/pollQuestion.scss"
import "R/src/components/poll-dash/styles/pollQuestionInput.scss"
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { UserContext } from "./poll-dash/DashTabs";
import { UserQuestionInfo } from "./poll-dash/types";
import { Theme } from "./PollQuestion";

// alignment fixes on the left
// poll response with header text with refresh button
// poll response text off white with background
// width 70 of the h3
// increasing padding and margin on the response boxes
// vertically aligning the refresh and the total responses
// very light dropshadow to light white box
// 

export default function PollQuestionInput({ question, date, theme, setQuestion } : { question : UserQuestionInfo, date : string, theme : Theme, useProvidedData? : boolean, setQuestion : (p : UserQuestionInfo) => void}) {
    const userId = useContext(UserContext)
    const [userAnswer, setUserAnswer] = useState<string | undefined>(question.userResponse) // this is a responseSlug value
    const [answerHasChanged, setAnswerHasChanged] = useState<boolean>(false)
    const [loadingData, setLoadingData] = useState<boolean>(false)
    const [submitting, setSubmitting] = useState<boolean>(false)
    const [submissionMessage, setSubmissionMessage] = useState<string>('')

    const totalResponses = useMemo(() => {
        let count = 0;
        if (question?.responses) {
            question.responses.forEach((r) => count += r.responseCount)
        }
        
        return count;
    }, [question])

    async function getData() {
        setLoadingData(true)
        let response = await fetch(`/api/get-poll?date=${date}`)
        
        // TODO: Need to update the query being used here (and everywhere on dashboard) to ensure 
        // we don't share user_ids to everyone, only your data should be shared with you not anyone else's
        // I'm going to go work on bingo card
        const data : PollQuestion_t = await response.json()
        setQuestion({
            ...data,
            userResponse: data.responses.find((r) => r.listOfResponders?.some((v) => v._ref === userId))?.responseSlug.current
        })
        //setUserAnswer(data.responses.find((response) => response.listOfResponders && response.listOfResponders.some((responder) => responder._key === userId))?.responseSlug.current)
        console.log(data)
        setLoadingData(false)
        setAnswerHasChanged(false)
        setSubmissionMessage('')
    }   
    function selectNewAnswer(slug : string) {
        setAnswerHasChanged(true);
        setUserAnswer(slug)
        console.log('ctex', userId)

    }
    async function submitNewAnswer() {
        if (!userAnswer) return;
        setSubmitting(true);

        const response = await fetch(`/api/poll/${encodeURIComponent(question.title)}?responder=${encodeURIComponent(userId)}&choice=${encodeURIComponent(userAnswer)}&date=${encodeURIComponent(question.date)}`, {
            method: 'GET'
        })
        if (response.ok) {
            //const selectedResponse = question.responses.find((r) => r.listOfResponders.some((lr) => lr._ref === userId))
            //if (!selectedResponse) return
            //selectedResponse.listOfResponders = [...selectedResponse?.listOfResponders.filter((lr) => lr._ref !== userId)]
            await getData()
            setSubmissionMessage('New Submission Recorded! Thank you, have a nice day!');
            setSubmitting(false);
            setAnswerHasChanged(false)
        }
    }

    return <>
        <div className={`poll ${theme ?? 'november'} ${theme !== 'october-light' ? 'montserrat' : ''} input`}>
            <h3 className="poll__header">{question.questionText}</h3> 
            <ul className="poll__options">
                {question.responses.map((r, i) => 
                    <li key={i} className={`poll__options__item${r.responseSlug.current === userAnswer ? ' selected' : ''}`} onClick={() => selectNewAnswer(r.responseSlug.current)}>
                        <div className="poll__options__item__fill-bar" style={{ width: `${(r.responseCount/totalResponses) * 100}%`}}></div>
                        <span className="poll__options__item__text">{r.responseText}</span>
                        <span className="poll__options__item__count">{r.responseCount > 0 ? `${r.responseCount}` : ''}</span>
                    </li>
                )}
            </ul>
            <div className="poll__footer">
                <div>
                    <button className="poll__footer__refresh" onClick={getData}>Refresh</button>
                    {loadingData && <span className="loading-notice">Refreshing...</span>}
                </div>
                <span className="poll__footer__rc">Total Responses: {totalResponses ?? '?'}</span>
            </div>
        </div>
        <div className="poll__submit-area">
            {answerHasChanged &&
                <button onClick={submitNewAnswer}>Submit New Answer</button>
            }
            {submissionMessage.length > 0 && <p>{submissionMessage}</p>}
        </div>
    </>
}