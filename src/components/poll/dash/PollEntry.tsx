'use client'
import { useState } from "react";
import { UserQuestionInfo } from "./types";
import "../styles/pollentry.scss"
import PollQuestionInput from "../frontdoor/PollQuestionInput";
import { renderPrompt } from "../frontdoor/util";

export default function PollEntry({ preloadInfo }: { preloadInfo: UserQuestionInfo }) {
	const [open, setOpen] = useState<boolean>(false);
	const [info, setInfo] = useState<UserQuestionInfo>(preloadInfo)

	return (
		<div className={`pe ${info.userResponse ? 'responded' : ''} ${open ? 'open' : ''}`}>
			<div className={`pe__header`} onClick={() => setOpen(!open)}>
				<h3 className="pe__header__title">{info.title}</h3>
				<span className="pe__header__text">{!open && preloadInfo.questionText ? preloadInfo.questionText : renderPrompt(preloadInfo.prompt)}</span>
				<span className="pe__header__date">{info?.date}</span>
			</div>
			{open ?
				<div className="pe__body">
					<PollQuestionInput question={info} setQuestion={setInfo} date={info.date} />
				</div>
				: <></>}
		</div>
	)
}
