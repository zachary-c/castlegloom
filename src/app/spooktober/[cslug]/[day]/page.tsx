import React from 'react'
import '../../../../components/spooktober/styles/global.scss'
import HomeHeader from '../../../../components/HomeHeader'
import { Meme_t } from '../../../../sanity/types/documents'
import { meme_by_date } from '../../../../sanity/lib/queries'
import { client } from '../../../../sanity/lib/client'
import MemeContainer from '../../../../components/MemeContainer'
import { notFound } from 'next/navigation'
import DayNavigation from '../../../../components/DayNavigation'
import PollQuestion from 'R/src/components/poll/frontdoor/PollQuestion'
import SpookySignup from 'R/src/components/SpookySignup'

export default async function Day2022({params} : {params : {day : string, cslug : string}}) {
    const dayOfMonth  = parseInt(params.day);
    const year = parseInt(params.cslug);
    if (Number.isNaN(dayOfMonth) || Number.isNaN(year)) notFound()

    let date;
    if (dayOfMonth !== 32) {
        date = new Date(year, 9, dayOfMonth);
//        date = `${year}-10-${dayOfMonth < 10 ? '0' + params.day : params.day}`;
    } else {
        date = new Date(year, 10, 1)
     //   date = `${year}-11-01`;
    }
    if (date > new Date()) {
        notFound();
    }
    //let date2 = new Date(date);
    //date2.setDate(date2.getDate()+1);
    //console.log(date);
    //console.log(date2);
    let month = date.getMonth() < 9 ? `0${date.getMonth()+1}` : `${date.getMonth()+1}`;
    let day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
    let dateString = `${date.getFullYear()}-${month}-${day}`;
    const data : Meme_t = await client.fetch(meme_by_date, {date: dateString}, { cache: 'no-store' })
    //console.log(data);
    //console.log(data);
    if (!data) notFound();

    return (
        <main className='page--vflex'>
            <HomeHeader />
            <MemeContainer meme={data}/>
            <DayNavigation currentDay={dayOfMonth} currentYear={year}/>
            {data.pollQuestion && 
                <PollQuestion question={data.pollQuestion} date={dateString} theme={'october-light'}/>
            }
        </main>
    )
}
