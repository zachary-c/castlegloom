import { client } from '$/lib/client';
import { daily_polled, latest_poll } from '$/lib/queries';
import { PollQuestion_t } from '$/types/documents';
import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 60;

function generatePollHTML(question : PollQuestion_t, recipient : Recipient_t) {
    const pollStyle = 'background-color: rgb(59, 59, 59);padding: 1rem 0; border-radius: 8px;max-width: 600px;'
    const headerStyle = 'margin-top:0; margin-left: 1rem;color:white; margin-right: 1rem;'
    const listStyles = "list-style:none; padding: 0 1rem; width: 100%;box-sizing:border-box; margin-bottom: 0;"
    const listItemStyles = 'margin:0; padding: 0; background-color: rgb(75, 75, 75);'
    const anchorStyles = 'display:block; text-decoration:none; -webkit-transition-duration:.2s; transition-duration: .2s; color: #ffbf00; padding: .25rem .5rem; margin: 0 0 .5rem 0;'
    const title = encodeURIComponent(question.title)
    const responder = encodeURIComponent(recipient._id)
    const encodedDate = encodeURIComponent(question.date)
    let html = `
    <div style="${pollStyle}">
        <h3 style="${headerStyle}">${question.questionText}</h3>
        <ul style="${listStyles}">
            ${question.responses.map((response) => {
                return `<li style="${listItemStyles}"><a style="${anchorStyles}" class="spook-response" href="https://castlegloom.com/api/poll/${title}?responder=${responder}&choice=${encodeURIComponent(response.responseSlug.current)}&date=${encodedDate}">${response.responseText}</a></li>`
            }).join('')}
        </ul>
    </div>
    `

    return html;
    
}
type Recipient_t = {
    email : string
    _id : string
}

export async function GET(request : NextRequest) {
    const secret = request.nextUrl.searchParams.get("secret");
    if (secret != process.env.SEND_MEMES_SECRET) {
        return NextResponse.json({status: 401, message: "Not Allowed"});
    } 

    //    console.log("secret provided: ", secret);
    // [{_id:'asdf', email: 'zacharyhcampbell@gmail.com'}]
    const emails : Recipient_t[] = await client.fetch(daily_polled);
    const pollQuestion : PollQuestion_t = await client.fetch(latest_poll)
    let emailsList = emails.map((email : any) => email.email);//.\filter((e : string) => e === 'zhc@iastate.edu');
    console.log(emailsList)
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
        for (const recipient of emails) {
            let pollHtml = generatePollHTML(pollQuestion, recipient)
            const html = `
            <html>
                <head>
                    <style>
                        .spook-response:hover {
                            background-color: rgb(100, 100, 100);
                        }
                    </style>
                </head>
                <body>
                ${pollHtml}
                </body>
            </html>
            
            `
            const info = await mailer.sendMail({
                from: process.env.ORACLE_LOGIN,
                to: recipient.email,
                // bcc: ['zacharyhcampbell@gmail.com'] ,//emailsList.join(','),
                subject: `Post-Spooktober Poll ${pollQuestion.date}`,
                html: html
            })
            console.log(info);
            if (!info.response.includes('250')) {
                console.log("Errored, info: ", info)
                return NextResponse.json("Error sending email", {status: 500})
            }
        }
    }
        
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
    console.log(`Email sent to ${emailsList.length} emails:`, emailsList);
    return NextResponse.json({status: 200})
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