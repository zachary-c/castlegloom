'use client'
import { PollQuestion_t } from "$/types/documents";
import "../styles/pollQuestion.scss"
import "_components/poll/styles/pollQuestionInput.scss"
import { useContext, useMemo, useState } from "react";
import { UserContext } from "../dash/DashTabs";
import { UserQuestionInfo } from "../dash/types";
import { PreferenceTheme, Theme } from "@/poll/pollUtil";
import Image from "next/image";
import pfp from "%/default.png"
import { renderPrompt } from "./util";

export default function PollQuestionInput({ question, date, theme, setQuestion }: { question: UserQuestionInfo, date: string, theme: PreferenceTheme, useProvidedData?: boolean, setQuestion: (p: UserQuestionInfo) => void }) {
	const userId = useContext(UserContext)
	const [userAnswer, setUserAnswer] = useState<string | undefined>(question.userResponse) // this is a responseSlug value
	const [loadingData, setLoadingData] = useState<boolean>(false)
	const [submitting, setSubmitting] = useState<boolean>(false)

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
		let response = await fetch(`/api/get-poll?date=${date}&userId=${userId}`)

		const data: PollQuestion_t = await response.json()
		setQuestion(data)
		console.log(data);
		setLoadingData(false)
	}

	async function submitNewAnswer(newUserAnswer: string) {
		if (submitting || newUserAnswer == userAnswer) return;
		const oldAnswer = userAnswer;
		setUserAnswer(newUserAnswer);
		setSubmitting(true);

		const response = await fetch(`/api/poll/${encodeURIComponent(question.title)}?responder=${encodeURIComponent(userId)}&choice=${encodeURIComponent(newUserAnswer)}&date=${encodeURIComponent(question.date)}`, {
			method: 'GET'
		})
		if (response.ok) {
			let newResponses = []

			for (let i = 0; i < question.responses.length; i++) {
				if (question.responses[i].responseSlug.current === oldAnswer) {
					newResponses.push({ ...question.responses[i], responseCount: question.responses[i].responseCount - 1 })
				} else if (question.responses[i].responseSlug.current === newUserAnswer) {
					newResponses.push({ ...question.responses[i], responseCount: question.responses[i].responseCount + 1 })
				} else {
					newResponses.push({ ...question.responses[i] })
				}
			}
			const rq = {
				...question,
				responses: newResponses,
				userResponse: newUserAnswer
			}
			setQuestion(rq)
			setSubmitting(false);
		} else {
			setSubmitting(false);
		}
	}

	return <>
		<div className={`poll ${theme ?? 'november'} montserrat input ${submitting ? 'submitting' : ''}`}>
			<h3 className="poll__header">{question.questionText ? question.questionText : renderPrompt(question.prompt)}</h3>
			<ul className="poll__options">
				{question.responses.map((r, i) =>
					<li key={i} className={`poll__options__item${r.responseSlug.current === userAnswer ? ' selected' : ''}`} onClick={() => submitNewAnswer(r.responseSlug.current)}>
						<div className="poll__options__item__fill-bar" style={{ width: userHasAnswered ? `${(r.responseCount / totalResponses) * 100}%` : "0%" }}></div>
						<span className="poll__options__item__text">{r.responseText}</span>
						{userHasAnswered &&
							<span className="poll__options__item__count">{r.responseCount > 0 ? r.responseCount : ''}</span>
						}
					</li>
				)}
			</ul>
			<div className="poll__footer">
				<div>
					<button className="poll__footer__refresh" onClick={getData}>Refresh</button>
					{submitting && <span className="loading-notice">Saving...</span>}
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
		</div >
	</>
}
