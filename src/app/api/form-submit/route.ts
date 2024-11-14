import { NextResponse } from 'next/server';

export async function POST(request : Request) {  
    const form = await request.formData();
    const email : string= form.get('email') as string
    console.log('Submission Received!', email)
    if (!email.match(/[0-9A-z]+@[0-9A-z]+\.[A-z]+/g)) {
        return NextResponse.json("Invalid Email Address", {status: 400})
    }

    const patch_data = {
        'mutations': [
            {
                "createIfNotExists": {
                    "_id": `recipient-${email.replace('@', '-').replace('.', '-')}`,
                    "_type": 'recipient',
                    "email": email,
                }
            }
        ]
    }
    const headers = {    
        "Authorization": `Bearer ${process.env.PROJECT_API_TOKEN}`,
        "Content-Type": 'application/json'
    }
    const init : RequestInit = {
        body: JSON.stringify(patch_data),
        method: 'POST',
        headers: headers
    }

    
    const response = await fetch(`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-09-29/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`, init)
    if (response.ok) {
        console.log('Sanity POST OK!')
    } else {
        console.log('Mutation Failed:', response);
        return NextResponse.json("Error creating recipient", {status: 500})
    }    

    const nodemailer = require('nodemailer');
    const mailer = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.ORACLE_LOGIN,
            pass: process.env.ORACLE_APP_PASSWORD,
        }
    })
    //console.log('Mailer:', mailer);
    
    const emailBody = `Thanks for signing up for spooky memes! You can expect to receive about one a day for the duration of October. Happy Haunting!`
    const info = await mailer.sendMail({
        from: process.env.ORACLE_LOGIN,
        to: email,
        bcc: "zacharyhcampbell@gmail.com",
        subject: `Happy Spooktober!`,
        text: emailBody
    })
    
    //console.log(info);
    if (!info.response.includes('250')) {
        console.log("Errored, info: ", info)
        return NextResponse.json("Error sending email", {status: 500})
    }
    console.log(`Email sent to ${email}`)
    return NextResponse.json({status: 200})
}
