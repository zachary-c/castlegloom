'use client'
import { PollQuestion_t } from "$/types/documents";
import Image from "next/image";
import "../styles/pollQuestion.scss"

import { useEffect, useMemo, useState } from "react";
import pfp from "%/default.png"
import { renderPrompt } from "./util";

// alignment fixes on the left
// poll response with header text with refresh button
// poll response text off white with background
// width 70 of the h3
// increasing padding and margin on the response boxes
// vertically aligning the refresh and the total responses
// very light dropshadow to light white box
// 
export default function PollQuestion({ question, date, embedded }: { question: PollQuestion_t, date: string, embedded?: boolean }) {
	const [questionData, setQuestionData] = useState<PollQuestion_t | undefined>(undefined)
	const [loadingData, setLoadingData] = useState<boolean>(true)

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

		setLoadingData(false)
	}
	useEffect(() => {
		getData()
	}, [])
	console.log(question)

	return <div className={`poll montserrat${embedded ? " embedded" : ""}`}>
		<h3 className="poll__header">{question.questionText ? question.questionText : renderPrompt(question.prompt)}</h3>
		<ul className="poll__options">
			{questionData ? questionData.responses.map((r, i) =>
				<li key={i} className="poll__options__item">
					<div className="poll__options__item__fill-bar" style={{ width: `${(r.responseCount / totalResponses) * 100}%` }}></div>
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
		<div className="poll__footer">
			<div className="">
				<button className="poll__footer__refresh" onClick={getData}>Refresh</button>
				{loadingData && <span className="loading-notice">Refreshing...</span>}
			</div>
			<span className="poll__footer__rc">Total Responses: {totalResponses ?? '?'}</span>
		</div>
		{question.suggestedBy &&
			<div className="poll__postscript">
				<span className="poll__postscript__suggested-pfp"><Image width={25} height={25} src={pfp.src} alt={"User-suggested poll question!"} /></span>
				<span className="poll__postscript__suggested">Today&apos;s poll question was suggested by the <b>{question.suggestedBy.trim()}</b>!</span>
			</div>
		}
	</div>
}
