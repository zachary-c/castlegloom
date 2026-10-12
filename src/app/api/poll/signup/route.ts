import { patchClient } from '$/lib/client';
import { emailFrom, emailRegex } from '@/poll/pollUtil';
import { NextRequest, NextResponse } from 'next/server';

export type SignupBody = {
  email: string
  qualifier: string
  profession: string
  isPolledDaily: boolean
}
function validateSignupBody(b: Partial<SignupBody>): SignupBody | false {
  if (!b.qualifier || !b.profession || !b.email || (b.isPolledDaily !== true && b.isPolledDaily !== false)) {
    return false
  }
  return {
    email: b.email,
    qualifier: b.qualifier,
    profession: b.profession,
    isPolledDaily: b.isPolledDaily,
  }
}

export async function POST(request: NextRequest) {
  const body: SignupBody = await request.json()
  const validBody = validateSignupBody(body)
  if (!validBody) {
    console.log("Invalid Body:", body)
    return Response.json("Missing arguments", { status: 400 })
  }

  console.log('Email Signup Received!', validBody.email)
  if (!emailRegex.test(validBody.email)) {
    return NextResponse.json("Invalid Email Address", { status: 400 })
  }

  let newRecipientRecord
  try {
    newRecipientRecord = await patchClient.create({
      "_type": 'recipient',
      "email": validBody.email,
      "title": {
        "profession": validBody.profession,
        "qualifier": validBody.qualifier
      },
      "isPolledDaily": validBody.isPolledDaily ? undefined : false,
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
    to: validBody.email,
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
    return NextResponse.json("Error sending email", { status: 500 })
  }
  console.log(`Signup email sent to ${validBody.email}`)
  return NextResponse.json({ status: 200 })
}
