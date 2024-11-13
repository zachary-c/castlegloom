import React from 'react'
import { apiClient, client } from '../../../sanity/lib/client'
import { poll_date_surrounding } from '../../../sanity/lib/queries'
import { PollQuestion_t } from '../../../sanity/types/documents'
import { notFound } from 'next/navigation'
import PollQuestion from 'R/src/components/PollQuestion'
import '../../../components/spooktober/styles/daynav.scss'
import Link from 'next/link'
import { padToTwo, SEVEN_HOURS_OF_MILLISECONDS, SIX_HOURS_OF_MILLISECONDS } from 'R/util'
import { theme } from '../pollUtil'

export const revalidate = 60;

/* export async function generateStaticParams() {
    const pages = await client.fetch(page_slugs);

    return pages.map((page : {slug : string}) => ({
        cslug: page.slug
    }));
} */

export default async function Page({params} : {params : {date : string}}) {
    //console.log('data', params.date)

    if (!params.date.match(/202[0-9]-[01][0-9]-[0-3][0-9]/g)) {
        notFound()
    }

    const datetime = new Date(params.date);
    const now = new Date()
    const y = new Date(datetime.getTime() - (1000*60*60*24));
    const t = new Date(datetime.getTime() + (1000*60*60*24));
    const yString = `${y.getFullYear()}-${y.getMonth()+1}-${padToTwo(y.getUTCDate())}`
    const tString = `${t.getFullYear()}-${t.getMonth()+1}-${padToTwo(t.getUTCDate())}`
   // console.log('t', t.getDate())
   // console.log('date', y, datetime, t)
   // console.log('string', yString, datetime, tString)
    
    const data : {today: PollQuestion_t, yesterday: { _id : string }, tomorrow: { _id : string }} 
        = await apiClient.fetch(
            poll_date_surrounding, 
            { date: params.date, previous: yString, nextPoll: tString }, 
            { cache: 'no-store' }
        )

    //console.log("poll", data)
    if (!data) {
        notFound()
    }

    return <>
        <h1 className={`poll__page-title ${theme}`}>{data.today.title}</h1>
        <PollQuestion question={data.today} date={params.date} theme={theme}/>
        <span className={`poll__date ${theme}`}>{params.date}</span>
        <div className='daynav__container'>
            {data.yesterday && 
                <div className='daynav__button'>
                    <Link className={`button poll__btn ${theme}`} href={`/poll/${yString}`}>Previous</Link>
                </div>
            }
            {data.tomorrow && t.getTime() < Date.now() - SIX_HOURS_OF_MILLISECONDS && 
                <div className='daynav__button'>
                    <Link className={`button poll__btn ${theme}`} href={`/poll/${tString}`}>Next</Link>
                </div>
            }
        </div>
        <Link className={`button poll__btn ${theme}`} href={`/poll`}>Home</Link>

    </>

}

// homepage has meme of the day
// gallery page has all the memes -- links to memes or grid? unclear
