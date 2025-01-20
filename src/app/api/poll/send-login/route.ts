import { apiClient } from '$/lib/client';
import { emailFrom } from '@/poll/pollUtil';
import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 60;

export async function GET(request : NextRequest) {
    const secret = request.nextUrl.searchParams.get("secret");
    if (secret != process.env.SEND_MEMES_SECRET) {
        return NextResponse.json({status: 401, message: "Not Allowed"});
    } 
    const userid = decodeURIComponent(request.nextUrl.searchParams.get('userid') ?? '')
    const data = await apiClient.fetch(`*[_id == $userid][0]`, { userid: userid})
    

    const nodemailer = require('nodemailer');
    const mailer = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.ORACLE_LOGIN,
            pass: process.env.ORACLE_APP_PASSWORD,
        }
    })

    const html = `
    <html>
        <head>
            <style>
            </style>
        </head>
        <body>
            <a class="login-link" style="background-color: blue;border-radius:10px;padding: 8px 16px; text-align:center; font-weight:bold; color:white !important;transition-duration: .3s;display: block;" href="${request.nextUrl.hostname}/api/poll/login?userid=${userid}">Dashboard Login</a>
        </body>

    </html>
    
    `
    const info = await mailer.sendMail({
        from: emailFrom,
        to: data.email,
        // bcc: ['zacharyhcampbell@gmail.com'] ,//emailsList.join(','),
        subject: `Castle Gloom Poll Dashboard`,
        html: html
    })

    if (!info.response.includes('250')) {
        console.log("Errored, info: ", info)
        return NextResponse.json("Error sending email", {status: 500})
    }
        
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