import React from 'react'
import { apiClient } from '../../sanity/lib/client'
import { poll_latest_surrounding } from '../../sanity/lib/queries'
import { PollQuestion_t } from '../../sanity/types/documents'
import { notFound } from 'next/navigation'
import PollQuestion from 'R/src/components/poll/frontdoor/PollQuestion'
import '../../components/spooktober/styles/daynav.scss'
import Link from 'next/link'
import { padToTwo } from 'R/util'
import { theme } from './pollUtil'
import { Metadata } from 'next'

export const dynamic = "force-dynamic";

export const metadata : Metadata = {
    title: "Polling | Castle Gloom",
    description: 'Daily poll questions, asked and answered for the good of the land.',
}

export default async function Page() {

    const data : {today: PollQuestion_t, previous: { _id : string }} 
        = await apiClient.fetch(
            poll_latest_surrounding, 
            {}, 
            { cache: 'no-store' }
        )
    const datetime = new Date(data.today.date)

    const y = new Date(datetime.getTime() - (1000*60*60*24) + (1000*60*60*3));
    const yString = `${y.getUTCFullYear()}-${padToTwo(y.getUTCMonth()+1)}-${padToTwo(y.getUTCDate())}`
    //console.log('yesterday, datetime', y, datetime, yString),
    //console.log("components", y.getFullYear(), y.getMonth()+1, padToTwo(y.getUTCDate()))
    
    if (!data.today) {
        notFound()
    }

    return <>
        <h1 className={`poll__page-title ${theme}`}>{data.today.title}</h1>
        <PollQuestion question={data.today} date={data.today.date} theme={theme}/>
        <span className={`poll__date ${theme}`}>{data.today.date}</span>
        <div className='daynav__container'>
        </div>
        <div className='poll__page-footer'>
            {data.previous && 
                <div className='daynav__button'>
                    <Link className={`button poll__btn ${theme}`} href={`/poll/${yString}`}>Previous</Link>
                </div>
            }
            <a className={`button poll__btn outline`} href='https://forms.gle/XJCmS9HtPZ3yTeUD6'>Suggest a Question</a>
            <Link className={`button poll__btn outline`} href='/poll/login'>
            <span>
                Log In
            </span>
            </Link>
            <Link className={`button poll__btn outline cta`}  href='/poll/signup'>
                <span>
                    Sign Up!
                </span>
            </Link>
        </div>
    </>

}