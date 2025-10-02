import { client, patchClient } from '$/lib/client';
import { daily_polled, EmailableMeme, latest_poll, recipient_list, todays_meme } from '$/lib/queries';
import { PollQuestion_t } from '$/types/documents';
import { NextRequest, NextResponse } from 'next/server';
import { toHTML } from '@portabletext/to-html';
import { applyStyleToHtml, Recipient_t, themeObject, ThemeObject } from '../apiUtil';
import { emailFrom, theme } from '@/poll/pollUtil';

// SPOOKTOBER MESSAGE VERSION

export const maxDuration = 60;

function generatePollHTML(question: PollQuestion_t, recipient: Recipient_t, obj: ThemeObject, request: NextRequest): string {
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
	let html = `
    <body>
        <div style="display:none;max-height: 0px; overflow: hidden;">${"October is upon us yet again, and with it comes a season of skeletons, spooks, and 31 days of daily memes relatedish to such things!"
		/*questionDescription*/
		}\n\n\n</div>
        <div style="display: none; max-height: 0px; overflow: hidden;"> 
 ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏  ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏  ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏  ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏  ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏  ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏  ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏  ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏  ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏  ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏  ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏  ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏  ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏  ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏  ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏  ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏ ͏          
        </div>
        <div style="${wrapperStyle}">
			<h3 style="font-size:1.5rem;">Happy Spooktober!</h3>
			<p style="${msgParagraphStyle}">October is upon us yet again, and with it comes a season of skeletons, spooks, and 31 days of daily pictures and memes related-<em>ish</em> to such things!</p>
			<p style="${msgParagraphStyle}">If this is your first Spooktober on the email list, welcome! Poll questions began last year as an addendum to the daily meme, and continued into November.</p>
			<p style="${msgParagraphStyle}">If you have not been receiving polls all year, welcome back! People keep responding to the poll questions I don't know why but I keep asking and they keep answering. So there's a lot of them now. You can go to the dashboard to view all past polls, generate a title for yourself, or see the question leaderboard using <a href="https://${request.nextUrl.hostname}/api/poll/login?userid=${responder}">your personal login link here.</a></p>
			<p style="${msgParagraphStyle}">If you were here last year and have been receiving polls since, thanks for sticking with it! It's your fault we're still here. I hope you find some daily joy in answering my questions.</p>
			<p style="${msgParagraphStyle}">Without further ado, let the festivities commence! Here is today's question, and attached is today's meme. Happy October!</p>
			<p>P.S. One more bit of ado if you have any good vaguely Halloween memes please send them to me I don't have as much time to go looking these days and there's a lot of bad ones I have to sift through trying to find the very best memes to share so please send me some thank you</p>
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
	// [{ _id: "ceec6d4a-2807-4050-991d-eed3f5e21f29", email: "zacharyhcampbell@gmail.com" }]
	const emails: Recipient_t[] = await client.fetch(recipient_list);
	const pollQuestion: PollQuestion_t = await client.fetch(latest_poll)

	const todaysMeme: EmailableMeme = await client.fetch(todays_meme);
	console.log(todaysMeme)

	console.log(pollQuestion);
	console.log("emails", emails)
	let attachments;

	if (todaysMeme.imgAsset) {
		attachments = [
			{
				filename: todaysMeme.cslug + '.' + todaysMeme.imgAsset.extension,
				path: todaysMeme.imgAsset.url
			}
		]
	} else if (todaysMeme.videoAsset) {
		attachments = [
			{
				filename: todaysMeme.cslug + '.' + todaysMeme.videoAsset.extension,
				path: todaysMeme.videoAsset.url
			}
		]
	}
	// YOUTUbe URLS ARE CURRENTLY UNSUPPORTED

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
			let pollHtml = generatePollHTML(pollQuestion, recipient, themeObj, request)
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
				subject: `HAPPY SPOOKTOBER! | ${pollQuestion.title} | ${pollQuestion.date}`,
				html: html,
				attachments: attachments
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

