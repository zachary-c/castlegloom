import { client, patchClient } from '$/lib/client';
import { daily_polled, latest_poll } from '$/lib/queries';
import { PollQuestion_t } from '$/types/documents';
import { emailFrom, STANDARDS, Theme, theme, THEME_APRIL_LIGHT, THEME_FEB_LIGHT, THEME_JAN, THEME_MARCH_LIGHT, THEME_MAY_DARK, THEME_JUNE_LIGHT, THEME_JULY_LIGHT, THEME_AUGUST_DARK, THEME_SEPTEMBER_LIGHT } from '@/poll/pollUtil';
import { NextRequest, NextResponse } from 'next/server';
import { toHTML } from '@portabletext/to-html';

export const maxDuration = 60;

export type ThemeObject = {
	backgroundColor: string
	headerTextColor: string
	questionTextColor: string
	itemDefaultColor: string
	itemHoverColor: string
	itemTextColor: string
	itemAdditionalStyles?: string
	borderColor?: string
	postScriptBackgroundColor: string
	postScriptTextColor: string
	postScriptBorderColor?: string
}

export function themeObject(theme: Theme): ThemeObject {
	let obj: ThemeObject;
	switch (theme) {
		case 'november':
			obj = {
				backgroundColor: 'rgb(255, 255, 228)',
				questionTextColor: 'black',
				itemDefaultColor: 'rgb(114, 51, 17)',
				itemHoverColor: 'rgb(161, 73, 18)',
				itemTextColor: 'rgb(255, 255, 228)',
				headerTextColor: 'black',
				postScriptBackgroundColor: STANDARDS.white,
				postScriptTextColor: STANDARDS.black
			};
			break;
		case 'december-light':
			obj = {
				backgroundColor: '#fff',
				questionTextColor: '#01440f',
				itemDefaultColor: '#ae0000',
				itemHoverColor: '#01440f',
				itemTextColor: '#f2f2f2',
				borderColor: '#01440f',
				headerTextColor: '#01440f',
				postScriptBackgroundColor: STANDARDS.white,
				postScriptTextColor: STANDARDS.black
			};
			break;
		case 'december-dark':
			obj = {
				backgroundColor: '#01440f',
				questionTextColor: '#f2f2f2',
				itemDefaultColor: '#ae0000',
				itemHoverColor: '#00b409',
				itemTextColor: '#f2f2f2',
				borderColor: 'none',
				headerTextColor: '#01440f',
				postScriptBackgroundColor: STANDARDS.white,
				postScriptTextColor: STANDARDS.black

			};
			break;
		case 'january':
			obj = {
				backgroundColor: THEME_JAN.walnutBrown,
				headerTextColor: THEME_JAN.jasper,
				itemDefaultColor: THEME_JAN.bone,
				itemHoverColor: THEME_JAN.platinum,
				itemTextColor: THEME_JAN.blackOlive,
				questionTextColor: THEME_JAN.platinum,
				postScriptBackgroundColor: STANDARDS.white,
				postScriptTextColor: STANDARDS.black,
				borderColor: 'none',

			};
			break;
		case 'february-light':
			obj = {
				backgroundColor: THEME_FEB_LIGHT.electricBlue,
				headerTextColor: THEME_FEB_LIGHT.chefchaouenBlue,
				itemDefaultColor: THEME_FEB_LIGHT.chefchaouenBlue,
				itemHoverColor: THEME_FEB_LIGHT.blush,
				itemTextColor: THEME_FEB_LIGHT.snow,
				questionTextColor: THEME_FEB_LIGHT.prussianBlue,
				postScriptBackgroundColor: STANDARDS.white,
				postScriptTextColor: STANDARDS.black,
				borderColor: 'none'

			};
			break;
		case 'march-light':
			obj = {
				headerTextColor: THEME_MARCH_LIGHT.lapisLazuli,
				questionTextColor: STANDARDS.white,
				backgroundColor: THEME_MARCH_LIGHT.officeGreen,
				itemDefaultColor: THEME_MARCH_LIGHT.springGreen,
				itemHoverColor: THEME_MARCH_LIGHT.bakerMiller,
				itemTextColor: THEME_MARCH_LIGHT.lapisLazuli,
				postScriptBackgroundColor: THEME_MARCH_LIGHT.bakerMiller,
				postScriptTextColor: STANDARDS.black,
				borderColor: 'none',
			};
			break;
		case 'april-light':
			obj = {
				headerTextColor: THEME_APRIL_LIGHT.robinsEgg,
				questionTextColor: THEME_APRIL_LIGHT.paynesGray,
				backgroundColor: THEME_APRIL_LIGHT.paleDogwood,
				itemDefaultColor: THEME_APRIL_LIGHT.lavenderPink,
				itemHoverColor: THEME_APRIL_LIGHT.vanillaIce,
				itemTextColor: THEME_APRIL_LIGHT.paynesGray,
				postScriptBackgroundColor: THEME_APRIL_LIGHT.lightGreen,
				postScriptTextColor: STANDARDS.black,
				borderColor: 'none',
			};
			break;
		case 'may-dark':
			obj = {
				headerTextColor: THEME_MAY_DARK.claret,
				questionTextColor: THEME_MAY_DARK.mistyRose,
				backgroundColor: THEME_MAY_DARK.claret,
				itemDefaultColor: THEME_MAY_DARK.saffron,
				itemHoverColor: THEME_MAY_DARK.mistyRose,
				itemTextColor: THEME_MAY_DARK.charcoal,
				postScriptBackgroundColor: THEME_MAY_DARK.mistyRose,
				itemAdditionalStyles: 'font-weight: bold;',
				postScriptTextColor: THEME_MAY_DARK.charcoal,
				borderColor: 'none',
			};
			break;
		case 'june-light':
			obj = {
				headerTextColor: THEME_JUNE_LIGHT.flame,
				questionTextColor: STANDARDS.white,
				backgroundColor: THEME_JUNE_LIGHT.flame,
				itemDefaultColor: THEME_JUNE_LIGHT.earthYellow,
				itemHoverColor: THEME_JUNE_LIGHT.icterine,
				itemTextColor: THEME_JUNE_LIGHT.blackOlive2,
				postScriptBackgroundColor: THEME_JUNE_LIGHT.airSuperiority,
				itemAdditionalStyles: `border: 2px solid ${THEME_JUNE_LIGHT.icterine}; border-radius: 5px;`,
				postScriptTextColor: STANDARDS.white,
				postScriptBorderColor: STANDARDS.white,
				borderColor: 'none',
			};
			break;
		case 'july-light':
			obj = {
				headerTextColor: THEME_JULY_LIGHT.americanBlue,
				questionTextColor: STANDARDS.white,
				backgroundColor: THEME_JULY_LIGHT.fireEngineRed,
				itemDefaultColor: THEME_JULY_LIGHT.americanBlue,
				itemHoverColor: THEME_JULY_LIGHT.strawberryRed,
				itemTextColor: THEME_JULY_LIGHT.white,
				postScriptBackgroundColor: THEME_JULY_LIGHT.americanBlue,
				//itemAdditionalStyles: `border: 2px solid ${THEME_JULY_LIGHT.icterine}; border-radius: 5px;`,
				postScriptTextColor: STANDARDS.white,
				postScriptBorderColor: STANDARDS.white,
				borderColor: 'none',
			};
			break;
		case 'august-dark':
			obj = {
				headerTextColor: THEME_AUGUST_DARK.header,
				questionTextColor: STANDARDS.white,
				backgroundColor: THEME_AUGUST_DARK.pollBackground,
				itemDefaultColor: THEME_AUGUST_DARK.optionsItem,
				itemHoverColor: THEME_AUGUST_DARK.optionsItemFillBar,
				itemTextColor: THEME_AUGUST_DARK.header,
				postScriptBackgroundColor: THEME_AUGUST_DARK.header,
				postScriptTextColor: THEME_AUGUST_DARK.optionsItemText,
				postScriptBorderColor: STANDARDS.white,
				borderColor: 'none',
			};
			break;
		case 'september-light':
			obj = {
				headerTextColor: THEME_SEPTEMBER_LIGHT.munsellBlue,
				questionTextColor: STANDARDS.white,
				backgroundColor: THEME_SEPTEMBER_LIGHT.atomicTangerine,
				itemDefaultColor: THEME_SEPTEMBER_LIGHT.cerulean,
				itemHoverColor: THEME_SEPTEMBER_LIGHT.munsellBlue,
				itemTextColor: STANDARDS.white,
				postScriptBackgroundColor: THEME_SEPTEMBER_LIGHT.pakistanGreen,
				postScriptTextColor: STANDARDS.white,
				postScriptBorderColor: 'none',
				borderColor: 'none',
			};
			break;
		default:
			obj = {
				backgroundColor: 'black',
				questionTextColor: 'white',
				itemDefaultColor: 'gray',
				itemHoverColor: 'white',
				itemTextColor: 'black',
				headerTextColor: 'black',
				postScriptBackgroundColor: STANDARDS.white,
				postScriptTextColor: STANDARDS.black
			};
			break;
	}
	return obj;
}

/*
			<h3 style="font-weight:bold; color: red; display:block; text-align:center; padding-top:.5rem; padding-bottom:.5rem; font-size:4rem;margin: 0;">BIG NEWS</h3>
			<span style="font-weight:bold; display:block; padding-top:.5rem; padding-bottom:.5rem; font-size:1rem;">THERE"S A POLLING DASHBOARD NOW</span>
			<span style="font-weight:bold; display:block; padding-top:.5rem; padding-bottom:.5rem; font-size:1rem;">CLICK THIS STRANGE EMAIL LINK TO GO THERE: <a href="https://castlegloom.com/api/poll/login?userid=${recipient._id}">Dashboard</a></span>
			<span style="font-weight:bold; display:block; padding-top:.5rem; padding-bottom:.5rem; font-size:1rem;">OR, in the future, GO TO <a href="https://castlegloom.com/poll/login">https://castlegloom.com/poll/login</a> AND PUT IN YOUR EMAIL TO GET A MAGIC LINK EMAIL THAT WILL LET YOU SIGN IN</span>
			<span style="font-weight:bold; display:block; padding-top:.5rem; padding-bottom:.5rem; font-size:1rem;">THE DASHBOARD LETS YOU 1) SUBMIT POLL RESPONSES 2) SET YOUR USER PREFERENCES 3) SEE HOW YOU"VE VOTED IN OLD POLLS</span>
			<span style="font-weight:bold; display:block; padding-top:.5rem; padding-bottom:.5rem; font-size:1rem;">OK GREAT THANKS NOW HELP ME DECIDE WHAT TO DO NEXT:</span>
*/
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
	if (question.questionText) {
		questionHTML = question.questionText
	} else if (question.prompt?.promptType == "plainText") {
		questionHTML = question.prompt.plaintextQuestionPrompt
	} else {
		questionHTML = toHTML(question.prompt?.richTextPrompt ?? [])

	}
	let html = `
    <body>
        <div style="display:none;max-height: 0px; overflow: hidden;">${question.questionText}\n\n\n</div>
        <div style="display: none; max-height: 0px; overflow: hidden;"></div>

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

export type Recipient_t = {
	email: string
	_id: string
}

export async function GET(request: NextRequest) {
	const secret = request.nextUrl.searchParams.get("secret");
	if (secret != process.env.SEND_MEMES_SECRET) {
		return NextResponse.json({ status: 401, message: "Not Allowed" });
	}

	// poll form link 
	//    console.log("secret provided: ", secret);
	const emails: Recipient_t[] = [{ _id: 'asdf', email: 'zacharyhcampbell@gmail.com' }]//await client.fetch(daily_polled);
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
	//console.log('Mailer:', mailer);
	if (pollQuestion) {
		if (pollQuestion.hasBeenSent) {
			console.error("Tried to send poll", pollQuestion.title, "but it was already sent")
			//return NextResponse.json({ status: 204 })
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
	console.log("result", res)
	/* const info = await mailer.sendMail({
		from: process.env.ORACLE_LOGIN,
		to: '314oracle@gmail.com',
		bcc: ['zacharyhcampbell@gmail.com'] ,//emailsList.join(','),
		subject: `Happy October ${todaysDate.getDate()}${suffix(todaysDate.getDate())} + POLLS!`,
		text: emailBody,
		html: ,
		attachments: attachments
	})
	/* 
	//console.log(info);
	if (!info.response.includes('250')) {
		console.log("Errored, info: ", info)
		return NextResponse.json("Error sending email", {status: 500})
	}  
	*/
	console.log(`Email sent to ${emails.length} emails:`, emails);
	return NextResponse.json({ status: 200 })
}

/*
<p>
	Happy October 1st! Spooky season has begun and it is time to get excited for fall, the best season. 
</p>
<p>
	You are receiving this email because last year you signed up for daily spooky memes from <a href="spook-tober.com">spook-tober.com</a>. That domain is no longer in use! Spooktober memes have moved to <a href="https://castlegloom.com/spooktober">castlegloom.com/spooktober</a>. The site has received a fresh coat of paint, and more improvements and updates will be coming Soon™. 
</p>
<p>
	If you do not wish to receive daily spooktober memes at this address, please reply to this email stating as much and you willl be removed from the list.
</p>
<p>
	Happy Autumn!
</p>*/

/*

					<p>Happy second half of Spooktober! The smiths at Castle Gloom have been hard at work and are pleased to announce the newest way to <strike>collect data</strike> provide entertainment: Polling! </p>
					<p>Each day for the second half of the month (in addition to the spooktober meme of the day), you will receive a poll such as the following: </p>
					<p>You will then (if you so desire) click one of the responses. This will record your response and redirect you to that meme's page, where you can see it and other poll responses (Voting again changes your vote, theoretically, but the skeleton crew hasn't tested that very well so it might break :P).</p>
					<p>Happy Haunting!</p>
*/
