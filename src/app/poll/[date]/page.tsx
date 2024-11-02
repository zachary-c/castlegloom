import React from 'react'
import { client } from '../../../sanity/lib/client'
import { poll_date_surrounding } from '../../../sanity/lib/queries'
import { PollQuestion_t } from '../../../sanity/types/documents'
import { notFound } from 'next/navigation'
import PollQuestion from 'R/src/components/PollQuestion'
import '../../../components/spooktober/styles/daynav.scss'
import Link from 'next/link'
import { FIVE_HOURS_OF_MILLISECONDS, padToTwo } from 'R/util'

export const dynamic = "force-static";

/* export async function generateStaticParams() {
    const pages = await client.fetch(page_slugs);

    return pages.map((page : {slug : string}) => ({
        cslug: page.slug
    }));
} */

export default async function Page({params} : {params : {date : string}}) {
    console.log('data', params.date)

    if (!params.date.match(/202[0-9]-[01][0-9]-[0-3][0-9]/g)) {
        notFound()
    }

    const datetime = new Date(params.date);
    const y = new Date(datetime.getTime() - (1000*60*60*24) + FIVE_HOURS_OF_MILLISECONDS);
    const t = new Date(datetime.getTime() + (1000*60*60*24) + FIVE_HOURS_OF_MILLISECONDS);
    const yString = `${y.getFullYear()}-${y.getMonth()+1}-${padToTwo(y.getDate())}`
    const tString = `${t.getFullYear()}-${t.getMonth()+1}-${padToTwo(t.getDate())}`
    console.log('date', y, datetime, t)
    console.log('string', yString, datetime, tString)
    
    const data : {today: PollQuestion_t, yesterday: { _id : string }, tomorrow: { _id : string }} 
        = await client.fetch(
            poll_date_surrounding, 
            { date: params.date, previous: yString, nextPoll: tString }, 
            { cache: 'no-store' }
        )

    console.log("poll", data)
    if (!data) {
        notFound()
    }

    return <>
        <h1>{data.today.title}</h1>
        <PollQuestion question={data.today} date={params.date}/>
        <div className='daynav__container'>
            {data.yesterday && 
                <div className='daynav__button'>
                    <Link className='button' href={`/poll/${yString}`}>Previous</Link>
                </div>
            }
            {data.tomorrow && 
                <div className='daynav__button'>
                    <Link className='button' href={`/poll/${tString}`}>Next</Link>
                </div>
            }
        </div>
    </>

}

// homepage has meme of the day
// gallery page has all the memes -- links to memes or grid? unclear
