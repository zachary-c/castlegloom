import { client } from '$/lib/client';
import { daily_polled, latest_poll } from '$/lib/queries';
import { PollQuestion_t } from '$/types/documents';
import { NextRequest, NextResponse } from 'next/server';
import { emailFrom, monthly_theme, emailToForBCC } from '@/poll/pollUtil';
import { Recipient_t, themeObject } from '../apiUtil';

export async function GET(request: NextRequest) {
	const secret = request.nextUrl.searchParams.get("secret");
	if (secret != process.env.SEND_MEMES_SECRET) {
		return NextResponse.json({ status: 401, message: "Not Allowed" });
	}

	// poll form link https://forms.gle/RFrcnMMKAa1edVkP6
	//    console.log("secret provided: ", secret);
	// //[{_id:'asdf', email: 'zacharyhcampbell@gmail.com'}] 
	const emails: Recipient_t[] = await client.fetch(daily_polled);
	const rawEmails = emails.map((r) => r.email)
	const pollQuestion: PollQuestion_t = await client.fetch(latest_poll)
	//let emailsList = emails.map((email : any) => email.email);//.\filter((e : string) => e === 'zhc@iastate.edu');
	//console.log(emailsList)
	console.log(pollQuestion);
	console.log(rawEmails)

	const nodemailer = require('nodemailer');
	const mailer = nodemailer.createTransport({
		service: "Gmail",
		auth: {
			user: process.env.ORACLE_LOGIN,
			pass: process.env.ORACLE_APP_PASSWORD,
		}
	})
	const obj = themeObject(monthly_theme)
	const wrapperStyle = `display: block; margin: 0 auto;max-width:600px;`
	const buttonStyle = `background-color: ${obj.itemDefaultColor};border-radius:10px;padding: 8px 16px; text-align:center; font-weight:bold; color:${obj.itemTextColor} !important;transition-duration: .3s;display: block; font-size: 1.25rem;text-decoration:none;`
	const paragraphStyle = `font-size: .95rem; text-align: left;`
	const headerTextStyle = `font-size: 1.5rem; color: ${obj.headerTextColor};text-align:center;`
	const listStyle = `padding-left:.75rem; font-size: .95rem; text-align: left;`
	const html = `
	<html>
		<head>
			<style>
				.btn:hover {
					background-color: ${obj.itemHoverColor};
				}
			</style>
		</head>
		<body>
			<div style="${wrapperStyle}">
				<h3 style="${headerTextStyle}">POLLING PARTY PLANNING</h3>
				<div style="text-align:center;">
					<p style="${paragraphStyle}">
						The court of Castle Gloom cordially requests your presence at a festival to be thrown between the end of September and the end of October. This party is to commemorate ONE FULL YEAR of poll questions, and will include activities such as:
					</p>
					<ul style="${listStyle}">
						<li>Answering in-person polls!</li>
						<li>Reviewing the year's best, most answered, and most divisive poll questions!</li>
						<li>Learning the identities of some of those top players on the dashboard leaderboard!</li>
						<li>Deciding the future of the census!</li>
						<li>Aruging your case (or watching others argue theirs) in debates!</li>
						<li>Snacks!</li>
						<li><a href="https://www.castlegloom.com/poll/2025-02-04">Watching Groundhog Day<a>!</li>
						<li>Generally having a good time!</li>
					</ul>
					<p style="${paragraphStyle}">All who have answered even a single poll question (there's still time!) are invited!</p>
					<p style="${paragraphStyle}">However, to aid in the planning of the party, the king has requested a special census be completed, a magical form from the wizard Goo Gle, that allows for <em>multiple responses to be selected</em>! The court requests that you complete <a href="https://forms.gle/RFrcnMMKAa1edVkP6">the form</a> linked by the button below by <b>Friday, September 5th</b>, to aid in planning the party. More details to come!</p>
					<a class="btn" style="${buttonStyle}" href="https://forms.gle/RFrcnMMKAa1edVkP6">Scheduling Form</a>
				</div>
			</div>
		</body>
	</html>
	
	`
	const info = await mailer.sendMail({
		from: emailFrom,
		to: emailToForBCC,
		bcc: rawEmails.join(","),
		subject: `Polling Party Scheduling | Respond by 09/05/2025`,
		html: html
	})
	console.log(info);
	if (!info.response.includes('250')) {
		console.log("Errored, info: ", info)
		return NextResponse.json("Error sending email", { status: 500 })
	}

	//console.log(`Email sent to ${emails.length} emails:`, emails);
	return NextResponse.json({ status: 200 })
}
