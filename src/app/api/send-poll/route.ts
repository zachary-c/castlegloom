import { client, patchClient } from '$/lib/client';
import { daily_polled, latest_poll } from '$/lib/queries';
import { PollQuestion_t } from '$/types/documents';
import { NextRequest, NextResponse } from 'next/server';
import { toHTML } from '@portabletext/to-html';
import { applyStyleToHtml, Recipient_t, themeObject, ThemeObject } from '../apiUtil';
import { emailFrom, theme } from '@/poll/pollUtil';

export const maxDuration = 60;

function generatePollHTML(question: PollQuestion_t, recipient: Recipient_t, obj: ThemeObject): string {
	const pollStyle = `background-color: ${obj.backgroundColor};padding: 1rem 0; border-radius: 8px;max-width: 600px; border: 2px solid ${obj.borderColor ?? obj.itemDefaultColor}`
	const questionTextStyle = `margin-top:0; margin-left: 1rem;color:${obj.questionTextColor}; margin-right: 1rem;font-size:1rem;`
	const listStyles = `list-style:none; padding: 0 1rem; width: 100%;box-sizing:border-box; margin-bottom: 0;`
	const listItemStyles = `margin: 0 0 .5rem 0; padding: 0; border-radius: 3px; background-color: ${obj.itemDefaultColor};${obj.itemAdditionalStyles ?? ''}`
	const headerTextStyle = `color: ${obj.headerTextColor}; text-align: center;font-size: 1.25rem;`
	const wrapperStyle = `display: block; margin: 0 auto;max-width:600px;`
	const anchorStyles = `display:block; text-decoration:none; -webkit-transition-duration:.2s; transition-duration: .2s; color: ${obj.itemTextColor}; padding: .25rem .5rem; margin: 0;`
	const postscriptStyle = `background-color: ${obj.postScriptBackgroundColor}; color: ${obj.postScriptTextColor}; display: block; padding: .5rem 1rem; margin-bottom: 1rem; font-size: 1rem; border-top: 1px solid ${obj.postScriptBorderColor ?? 'transparent'}; border-bottom: 1px solid ${obj.postScriptBorderColor ?? 'transparent'}`;
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
		questionHTML = applyStyleToHtml(questionHTML, "", "margin: 0;")
		questionDescription = question.prompt?.richTextAsPlaintext
	}
	let html = `
    <body>
        <div style="display:none;max-height: 0px; overflow: hidden;">${questionDescription}\n\n\n</div>
        <div style="display: none; max-height: 0px; overflow: hidden;"> 
 ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏  ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏  ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏  ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏  ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏  ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏  ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏  ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏  ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏  ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏  ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏  ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏  ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏  ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏  ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏  ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏          
        </div>
        <div style="${wrapperStyle}">
            <h3 style="${headerTextStyle}">${question.title}</h3>
            <div style="${pollStyle}">
            ${question.suggestedBy ? `
                <div style="${postscriptStyle}">
                    Today's poll question was suggested by the <b>${question.suggestedBy}</b>!
                </div>`
			: ''
		}
                <h4 style="${questionTextStyle}">${questionHTML}</h4>
                <ul style="${listStyles}">
                    ${question.responses.map((response) => {
			return `<li style="${listItemStyles}"><a style="${anchorStyles}" class="spook-response" href="https://castlegloom.com/api/poll/${title}?responder=${responder}&choice=${encodeURIComponent(response.responseSlug.current)}&date=${encodedDate}">${response.responseText}</a></li>`
		}).join('')}
                </ul>
            </div>
        </div>
    </body>
    `
	return html;
}

export async function GET(request: NextRequest) {
	const secret = request.nextUrl.searchParams.get("secret");
	if (secret != process.env.SEND_MEMES_SECRET) {
		return NextResponse.json({ status: 401, message: "Not Allowed" });
	}

	// poll form link 
	// [{ _id: "asdf", email: "zacharyhcampbell@gmail.com"}]
	const emails: Recipient_t[] = await client.fetch(daily_polled);
	const pollQuestion: PollQuestion_t = await client.fetch(latest_poll)
	//let emailsList = emails.map((email : any) => email.email);//.\filter((e : string) => e === 'zhc@iastate.edu');
	//console.log(emailsList)
	console.log(pollQuestion);

	const nodemailer = require('nodemailer');
	const mailer = nodemailer.createTransport({
		service: "Gmail",
		auth: {
			user: process.env.ORACLE_LOGIN,
			pass: process.env.ORACLE_APP_PASSWORD,
		}
	})
	if (pollQuestion) {
		if (pollQuestion.hasBeenSent) {
			console.error("Tried to send poll", pollQuestion.title, "but it was already sent")
			return NextResponse.json({ status: 204 })
		}
		const themeObj = themeObject(theme)
		console.log('theme', themeObj)
		for (const recipient of emails) {
			let pollHtml = generatePollHTML(pollQuestion, recipient, themeObj)
			const html = `
            <html>
                <head>
                    <style>
                        .spook-response:hover {
                            background-color: ${themeObj.itemHoverColor};
                            border-radius:3px;
                        }
                    </style>
                </head>
                ${pollHtml}
            </html>
            
            `
			const info = await mailer.sendMail({
				from: emailFrom,
				to: recipient.email,
				subject: `${pollQuestion.title} | ${pollQuestion.date}`,
				html: html
			})
			console.log(info);
			if (!info.response.includes('250')) {
				console.log("Errored, info: ", info)
				return NextResponse.json("Error sending email", { status: 500 })
			}
		}
	}

	const hasBeenSentPatch = patchClient.patch(pollQuestion._id, {
		"set": {
			hasBeenSent: true
		}
	})
	const res = await hasBeenSentPatch.commit();

	console.log(`Email sent to ${emails.length} emails:`, emails);
	return NextResponse.json({ status: 200 })
}

