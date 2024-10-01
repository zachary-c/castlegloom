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
    let emailsList = emails.map((email : any) => email.email);//.filter((e : string) => e === 'zhc@iastate.edu');
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
        bcc: 'zacharyhcampbell@gmail.com',//emailsList.join(','),
        subject: `Happy October 1st!`,
        //text: emailBody,
        html: `
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
        </p>
        `,
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
