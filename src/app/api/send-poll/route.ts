import { client, patchClient } from '$/lib/client';
import { daily_polled, latest_poll, test_recipient_list } from '$/lib/queries';
import { PollQuestion_t } from '$/types/documents';
import { NextRequest, NextResponse } from 'next/server';
import { Recipient_t, themeObject } from '../apiUtil';
import { concreteTheme, emailFrom } from '@/poll/pollUtil';
import { generatePollHTML } from './generate_html_util';

export const maxDuration = 300;

export async function GET(request: NextRequest) {
	const secret = request.nextUrl.searchParams.get("secret");
	if (secret != process.env.SEND_MEMES_SECRET) {
		return NextResponse.json({ status: 401, message: "Not Allowed" });
	}
	const is_test = request.nextUrl.searchParams.get("is_test") === "true";
	const dry_run = request.nextUrl.searchParams.get("dry_run") === "true";

	// poll form link 
	let emails: Recipient_t[] = []
	let test_subject_suffix = ""
	if (is_test) {
		emails = await client.fetch(test_recipient_list);
		console.log("email test", emails)
		test_subject_suffix = ` | TS: ${(new Date()).getTime()}`
	} else {
		emails = await client.fetch(daily_polled);
	}
	const pollQuestion: PollQuestion_t = await client.fetch(latest_poll)
	console.log("edict", pollQuestion.edict);

	console.log(pollQuestion);
	console.log("emails", emails)
	let attachments;

	const nodemailer = require('nodemailer');
	const mailer = nodemailer.createTransport({
		service: "Gmail",
		auth: {
			user: process.env.ORACLE_LOGIN,
			pass: process.env.ORACLE_APP_PASSWORD,
		}
	})
	if (pollQuestion) {
		if (!is_test && pollQuestion.hasBeenSent) {
			console.error("Tried to send poll", pollQuestion.title, "but it was already sent")
			return NextResponse.json({ status: 204 })
		}
		for (const recipient of emails) {
			const themeObj = themeObject(concreteTheme(recipient.theme))
			console.log('theme', themeObj)
			let pollHtml = generatePollHTML(pollQuestion, recipient, themeObj)
			const html = `
			<html>
				<head>
					<style>
						.spook-response:hover {
							background-color: ${themeObj.itemHoverColor};
							${themeObj.itemHoverTextColor ? `color: ${themeObj.itemHoverTextColor} !important;` : ""}
							border-radius:3px;
						}
						.pt-container a:hover {
							color: ${themeObj.questionTextColor} !important;
						}
					</style>
				</head>
				${pollHtml}
			</html>
			`
			if (!dry_run) {
				const info = await mailer.sendMail({
					from: emailFrom,
					to: recipient.email,
					subject: `${pollQuestion.title} | ${pollQuestion.date}${test_subject_suffix}`,
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
	}

	if (!is_test) {
		const hasBeenSentPatch = patchClient.patch(pollQuestion._id, {
			"set": {
				hasBeenSent: true
			}
		})
		const res = await hasBeenSentPatch.commit();
	}

	if (!dry_run) {
		console.log(`Email sent to ${emails.length} emails:`, emails);
	} else {
		console.log(`DRY RUN: No emails sent.`);
	}
	return NextResponse.json({ status: 200, count: emails.length, dry_run, is_test })
}

