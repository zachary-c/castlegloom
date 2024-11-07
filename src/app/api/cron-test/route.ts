import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 60;

export async function GET(request : NextRequest) {
    const secret = request.nextUrl.searchParams.get("secret");
    if (secret != process.env.SEND_MEMES_SECRET) {
        return NextResponse.json({status: 401, message: "Not Allowed"});
    } 

    const email = 'zacharyhcampbell@gmail.com'
    const nodemailer = require('nodemailer');
    const mailer = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.ORACLE_LOGIN,
            pass: process.env.ORACLE_APP_PASSWORD,
        }
    })
            
    const info = await mailer.sendMail({
        from: process.env.ORACLE_LOGIN,
        to: email,
        subject: `Cron Job Testing ${Date()}`,
        body: 'Please disregard'
    })
    console.log('info', info)
    return NextResponse.json({status: 200})
}
