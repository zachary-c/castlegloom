import React from 'react'
import { client } from '../../sanity/lib/client'
import { poll_date_surrounding } from '../../sanity/lib/queries'
import { PollQuestion_t } from '../../sanity/types/documents'
import { notFound } from 'next/navigation'
import PollQuestion from 'R/src/components/PollQuestion'
import '../../components/spooktober/styles/daynav.scss'
import Link from 'next/link'
import { FIVE_HOURS_OF_MILLISECONDS, padToTwo } from 'R/util'

export const dynamic = "force-static";

/* export async function generateStaticParams() {
    const pages = await client.fetch(page_slugs);

    return pages.map((page : {slug : string}) => ({
        cslug: page.slug
    }));
} */

export default async function Page() {
    const datetime = new Date()
    const dateString = `${datetime.getFullYear()}-${datetime.getMonth()+1}-${padToTwo(datetime.getDate())}`
    //console.log('data', datetime)

    const y = new Date(datetime.getTime() - (1000*60*60*24) + FIVE_HOURS_OF_MILLISECONDS);
    const yString = `${y.getFullYear()}-${y.getMonth()+1}-${padToTwo(y.getDate())}`
    //console.log('date', y, datetime)
    //console.log('string', yString, dateString)
    
    const data : {today: PollQuestion_t, yesterday: { _id : string }, tomorrow: { _id : string }} 
        = await client.fetch(
            poll_date_surrounding, 
            { date: dateString, previous: yString, nextPoll: '0000-00-00' }, 
            { cache: 'no-store' }
        )
    if (!data.today) {
        notFound()
    }

    //console.log("poll", data)
    if (!data) {
        notFound()
    }

    return <>
        <h1>{data.today.title}</h1>
        <PollQuestion question={data.today} date={dateString}/>
        <div className='daynav__container'>
            {data.yesterday && 
            <div className='daynav__button'>
                <Link className='button' href={`/poll/${yString}`}>Previous</Link>
            </div>
            }
        </div>
        <p style={{maxWidth:'500px', textAlign:'center'}}>
            Color scheme, layout, functionality, and other qualities subject to change.
            There is currently no direct sign up for polling; if you feel strongly you would like to be polled <a href='/spooktober'>sign
            up for spooktober memes</a> and you will be manually added to the list.    
        </p>
        
    </>

}

// homepage has meme of the day
// gallery page has all the memes -- links to memes or grid? unclear
