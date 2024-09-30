import { client } from '$/lib/client';
import { todays_meme, recipient_list, EmailableMeme } from '$/lib/queries';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request : NextRequest) {
    const secret = request.nextUrl.searchParams.get("secret");
    console.log("secret provided: ", secret);
    
    if (secret != process.env.SEND_MEMES_SECRET) {
        return NextResponse.json({status: 401, message: "Not Allowed"});
    }
    const emails = await client.fetch(recipient_list);
    const todaysMeme : EmailableMeme = await client.fetch(todays_meme);
    let emailsList = emails.map((email : any) => email.email);
    console.log(emailsList);
    console.log(todaysMeme)

    let attachments;
    let emailBody = '';
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
    } else if (todaysMeme.youtubeURL) {
        emailBody = todaysMeme.youtubeURL
    }

    

    console.log(todaysMeme)
    const nodemailer = require('nodemailer');
    const mailer = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.ORACLE_LOGIN,
            pass: process.env.ORACLE_APP_PASSWORD,
        }
    })
    //console.log('Mailer:', mailer);
        
    const info = await mailer.sendMail({
        from: process.env.ORACLE_LOGIN,
        to: '314oracle@gmail.com',
        bcc: emailsList.join(','),
        subject: `It's November 8th`,
        text: emailBody,
        attachments: attachments
    })
    
    //console.log(info);
    if (!info.response.includes('250')) {
        console.log("Errored, info: ", info)
        return NextResponse.json("Error sending email", {status: 500})
    }
    console.log(`Email sent to `, emailsList);
    
    return NextResponse.json({status: 200})
}
