'use client'
import { useState } from "react";
import { UserQuestionInfo } from "./types";
import { monthly_theme, PreferenceTheme, Theme } from "@/poll/pollUtil";
import "../styles/pollentry.scss"
import PollQuestionInput from "../frontdoor/PollQuestionInput";
import { renderPrompt } from "../frontdoor/util";
import { poll_cookie_theme_preference } from "@/api/poll/login/cookie";

export default function PollEntry({ preloadInfo, theme }: { preloadInfo: UserQuestionInfo, theme: PreferenceTheme }) {
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
					<PollQuestionInput question={info} setQuestion={setInfo} date={info.date} theme={theme} />
				</div>
				: <></>}
		</div>
	)
}
