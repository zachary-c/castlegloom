'use client'
import { PollQuestion_t } from "$/types/documents";
import "../styles/pollQuestion.scss"
import "_components/poll/styles/pollQuestionInput.scss"
import { useContext, useMemo, useState } from "react";
import { UserContext } from "../dash/DashTabs";
import { UserQuestionInfo } from "../dash/types";
import { Theme } from "@/poll/pollUtil";
import Image from "next/image";
import pfp from "%/default.png"
import { renderPrompt } from "./util";

export default function PollQuestionInput({ question, date, theme, setQuestion }: { question: UserQuestionInfo, date: string, theme: Theme, useProvidedData?: boolean, setQuestion: (p: UserQuestionInfo) => void }) {
	const userId = useContext(UserContext)
	const [userAnswer, setUserAnswer] = useState<string | undefined>(question.userResponse) // this is a responseSlug value
	const [answerHasChanged, setAnswerHasChanged] = useState<boolean>(false)
	const [loadingData, setLoadingData] = useState<boolean>(false)
	const [submitting, setSubmitting] = useState<boolean>(false)
	const [submissionMessage, setSubmissionMessage] = useState<string>('')

	const userHasAnswered = useMemo(() => !!question.userResponse, [question])

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

		const data: PollQuestion_t = await response.json()
		setQuestion({
			...data,
			userResponse: data.responses.find((r) => r.listOfResponders?.some((v) => v._ref === userId))?.responseSlug.current
		})
		console.log(data)
		setLoadingData(false)
		setAnswerHasChanged(false)
		setSubmissionMessage('')
	}
	function selectNewAnswer(slug: string) {
		if (slug !== userAnswer && slug === question.userResponse) {
			setAnswerHasChanged(false)
			setSubmissionMessage('')
			setUserAnswer(slug)
		} else if (slug !== userAnswer) {
			setAnswerHasChanged(true);
			setSubmissionMessage('')
			setUserAnswer(slug)
		}
	}
	function resetNewAnswer() {
		setAnswerHasChanged(false);
		setSubmissionMessage('')
		setUserAnswer(question.userResponse)
	}
	async function submitNewAnswer() {
		if (!userAnswer) return;
		setSubmitting(true);

		const response = await fetch(`/api/poll/${encodeURIComponent(question.title)}?responder=${encodeURIComponent(userId)}&choice=${encodeURIComponent(userAnswer)}&date=${encodeURIComponent(question.date)}`, {
			method: 'GET'
		})
		if (response.ok) {
			let newResponses = []

			for (let i = 0; i < question.responses.length; i++) {
				if (question.responses[i].responseSlug.current === question.userResponse) {
					newResponses.push({ ...question.responses[i], responseCount: question.responses[i].responseCount - 1 })
				} else if (question.responses[i].responseSlug.current === userAnswer) {
					newResponses.push({ ...question.responses[i], responseCount: question.responses[i].responseCount + 1 })
				} else {
					newResponses.push({ ...question.responses[i] })
				}
			}
			const rq = {
				...question,
				responses: newResponses,
				userResponse: userAnswer
			}
			setQuestion(rq)
			setSubmissionMessage('New submission recorded! Thank you, have a nice day!');
			setSubmitting(false);
			setAnswerHasChanged(false)
		}
	}

	return <>
		<div className={`poll ${theme ?? 'november'} montserrat input`}>
			<h3 className="poll__header">{question.questionText ? question.questionText : renderPrompt(question.prompt)}</h3>
			<ul className="poll__options">
				{question.responses.map((r, i) =>
					<li key={i} className={`poll__options__item${r.responseSlug.current === userAnswer ? ' selected' : ''}`} onClick={() => selectNewAnswer(r.responseSlug.current)}>
						<div className="poll__options__item__fill-bar" style={{ width: userHasAnswered ? `${(r.responseCount / totalResponses) * 100}%` : "0%" }}></div>
						<span className="poll__options__item__text">{r.responseText}</span>
						{userHasAnswered &&
							<span className="poll__options__item__count">{r.responseCount > 0 ? `${r.responseCount}` : ''}</span>
						}
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
			{question.suggestedBy &&
				<div className="poll__postscript">
					<span className="poll__postscript__suggested-pfp"><Image width={25} height={25} src={pfp.src} alt={"User-suggested poll question!"} /></span>
					<span className="poll__postscript__suggested">This poll question was suggested by <b>{question.suggestedBy.trim()}</b>!</span>
				</div>
			}
		</div>
		{(answerHasChanged || submissionMessage.length > 0) &&
			<div className="poll__submit-area">
				{answerHasChanged &&
					<button onClick={submitNewAnswer} className={`poll__submit-area__btn ${submitting ? 'muted unclickable' : ''}`}>{submitting ? "Submitting..." : "Save Response"}</button>
				}
				{answerHasChanged && !submitting &&
					<button onClick={resetNewAnswer} className={`poll__submit-area__btn muted`}>Reset Selection</button>
				}
				{submissionMessage.length > 0 &&
					<div className="submission-message">
						<span>{submissionMessage}</span>
					</div>
				}
			</div>
		}
	</>
}
