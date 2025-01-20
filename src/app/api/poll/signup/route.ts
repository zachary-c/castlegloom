import { patchClient } from '$/lib/client';
import { emailFrom, emailRegex } from '@/poll/pollUtil';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request : NextRequest) {  
    const email : string = request.nextUrl.searchParams.get('email') as string
    console.log('Email Signup Received!', email)
    if (!emailRegex.test(email)) {
        return NextResponse.json("Invalid Email Address", {status: 400})
    }
    
    let newRecipientRecord
    try {
        newRecipientRecord = await patchClient.create({
            "_type": 'recipient',
            "email": email
        })        
        console.log("result", newRecipientRecord)
    } catch (err) {
        console.error(err)
        return Response.json({}, { status: 500, statusText: "Internal Server Error" })
    }

    const nodemailer = require('nodemailer');
    const mailer = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.ORACLE_LOGIN,
            pass: process.env.ORACLE_APP_PASSWORD,
        }
    })
    
    const info = await mailer.sendMail({
        from: emailFrom,
        to: email,
        bcc: "zacharyhcampbell@gmail.com",
        subject: `Welcome to Castle Gloom!`,
        html: `
        <html>
            <head>
                <style>
                    .login-link:hover {
                        background-color:rgb(126, 182, 255);
                    }
                </style>
            </head>
            <body>
                <div style="max-width: 600px; width: 100%;">
                    <p>Thanks for signing up for the Castle Gloom Census! Click the following button to confirm this email address:</p>
                    <a class="login-link" style="background-color: #5ca3ff;border-radius:10px;padding: 8px 16px; text-align:center; font-weight:bold; color:white !important;transition-duration: .3s;display: block;" href="https://${request.nextUrl.hostname}/api/poll/signup-confirm?userid=${newRecipientRecord._id}">Confirm Email</a>
                </div>
            </body>
        </html>
        `
    })
    
    //console.log(info);
    if (!info.response.includes('250')) {
        console.log("Errored, info: ", info)
        return NextResponse.json("Error sending email", {status: 500})
    }
    console.log(`Signup email sent to ${email}`)
    return NextResponse.json({status: 200})
}
