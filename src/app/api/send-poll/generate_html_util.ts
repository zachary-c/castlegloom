import { PollQuestion_t } from "$/types/documents"
import { KingsEdict_t } from "$/schemaTypes/edict"
import { applyStyleToHtml, edictThemeObject, EdictThemeObject, Recipient_t, ThemeObject } from "../apiUtil"
import { toHTML } from "@portabletext/to-html"
import { THEME_DECEMBER } from "@/poll/pollUtil"
import { english_th, suffix } from "R/util"

export function generatePollHTML(question: PollQuestion_t, recipient: Recipient_t, obj: ThemeObject): string {
	const pollStyle = `background-color: ${obj.backgroundColor};padding: 1rem 0; border-radius: 8px;max-width: 600px; border: 2px solid ${obj.borderColor ?? obj.itemDefaultColor}`
	const questionTextStyle = `margin-top:0; margin-left: 1rem;color:${obj.questionTextColor}; margin-right: 1rem;font-size:1rem;`
	const listStyles = `list-style:none; padding: 0 1rem; width: 100%;box-sizing:border-box; margin-bottom: 0;`
	const listItemStyles = `margin: 0 0 .5rem 0; padding: 0; border-radius: 3px; background-color: ${obj.itemDefaultColor};${obj.itemAdditionalStyles ?? ''}`
	const headerTextStyle = `color: ${obj.headerTextColor}; text-align: center;font-size: 1.25rem;`
	const wrapperStyle = `display: block; margin: 0 auto;max-width:600px;`
	const anchorStyles = `display:block; text-decoration:none; -webkit-transition-duration:.2s; transition-duration: .2s; color: ${obj.itemTextColor}; padding: .25rem .5rem; margin: 0;`
	const postscriptStyle = `background-color: ${obj.postScriptBackgroundColor}; color: ${obj.postScriptTextColor}; display: block; padding: .5rem 1rem; margin-bottom: 1rem; font-size: 1rem; border-top: 1px solid ${obj.postScriptBorderColor ?? 'transparent'}; border-bottom: 1px solid ${obj.postScriptBorderColor ?? 'transparent'}`;
	const msgParagraphStyle = `font-size:1rem;`
	const title = encodeURIComponent(question.title)
	const responder = encodeURIComponent(recipient._id)
	const encodedDate = encodeURIComponent(question.date)
	let questionHTML
	let questionDescription
	if (question.questionText) {
		questionHTML = question.questionText
		questionDescription = question.questionText
	} else if (question.prompt?.promptType == "plainText") {
		questionHTML = question.prompt.plaintextQuestionPrompt
		questionDescription = question.prompt.plaintextQuestionPrompt
	} else {
		questionHTML = toHTML(question.prompt?.richTextPrompt ?? [])
		let aStyle = ""
		if (obj.questionHeaderLinkColor) {
			aStyle = `color: ${obj.questionHeaderLinkColor};`
		}
		questionHTML = applyStyleToHtml(questionHTML, aStyle, "margin: 0;")
		questionDescription = question.prompt?.richTextAsPlaintext
	}
	let memoriam = ""
	if (question.date === "2025-10-10") {
		memoriam = `<p style="text-align:center;">No spooktober today; instead we pause to remember <a href="https://www.legacy.com/us/obituaries/name/christian-oswalt-obituary?id=36784490">October 10th, 2022.</p>`
	}
	let html = `
    <body>
        <div style="display:none;max-height: 0px; overflow: hidden;">${questionDescription}\n\n\n</div>
        <div style="display: none; max-height: 0px; overflow: hidden;"> 
 ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏  ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏  ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏  ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏  ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏  ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏  ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏  ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏  ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏  ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏  ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏  ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏  ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏  ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏  ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏  ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏          
        </div>
		${(question.edict && generateEdictInnerHtml(question.edict, edictThemeObject(question.edict.colorscheme))) ?? ""}
        <div style="${wrapperStyle}">
            <h3 style="${headerTextStyle}">${question.title}</h3>
            <div style="${pollStyle}">
            ${question.suggestedBy ? `
                <div style="${postscriptStyle}">
                    Today's poll question was suggested by the <b>${question.suggestedBy}</b>!
                </div>`
			: ''
		}
                <h4 style="${questionTextStyle}" class="pt-container">${questionHTML}</h4>
                <ul style="${listStyles}">
                    ${question.responses.map((response) => {
			return `<li style="${listItemStyles}"><a style="${anchorStyles}" class="spook-response" href="https://castlegloom.com/api/poll/${title}?responder=${responder}&choice=${encodeURIComponent(response.responseSlug.current)}&date=${encodedDate}">${response.responseText}</a></li>`
		}).join('')}
                </ul>
            </div>
			${memoriam}
        </div>
    </body>
    `
	return html;
}


export function generateEdictInnerHtml(edict: KingsEdict_t, themeObj: EdictThemeObject) {
	let edict_content = toHTML(edict.edictBody ?? [])
	edict_content = applyStyleToHtml(edict_content, `color:${themeObj.a_color};`, "", "font-size: 1.15rem")
	const edict_dt = new Date(edict.date + "T00:00:00.000")
	const kings_decree = `On this ${edict_dt.getUTCDay()}${suffix(edict_dt.getUTCDay())} day of ${edict_dt.toLocaleDateString("utc", { month: "long" })}, A.D. ${edict_dt.getUTCFullYear()}, the ${english_th(edict.edictNumber)} decree and order of the king:`
	console.log("themeobj", themeObj)
	let html = `
		<section style="max-width:800px; margin: 0 auto;font-size: .95rem;font-family: sans-serif;border-bottom: 2px solid ${themeObj.divider_color};">
			<p style="font-family: cursive;font-size: 1.1rem;font-style: italic;font-weight: bold;text-align: center;">
				${kings_decree}
			</p>
			<h2 style="text-align: center;background-color: ${themeObj.h2_background};color: ${themeObj.h2_color};padding: 1rem 0;border-radius: 15px;">${edict.edictHeading}</h2>
			<section>
				${edict_content}
			</section>
		</section>
		<br />
	`
	return html;
}
