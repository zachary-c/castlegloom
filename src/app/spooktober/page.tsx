import React from 'react'
import '../../components/spooktober/styles/global.scss'
import HomeHeader from '../../components/HomeHeader'
import { Meme_t } from '../../sanity/types/documents'
import { latest_meme } from '../../sanity/lib/queries'
import { client } from '../../sanity/lib/client'
import MemeContainer from '../../components/MemeContainer'
import SpookySignup from '../../components/SpookySignup'
import DayNavigation from '../../components/DayNavigation'

export const revalidate = 60;

export const FIVE_HOURS_OF_MILLISECONDS = 1000 * 60 * 60 * 5;

export default async function Home() {

    // THANKS UTC
    const cstDate = new Date(Date.now() - FIVE_HOURS_OF_MILLISECONDS);
    const meme : Meme_t = await client.fetch(latest_meme, {
        "now": cstDate.toISOString()
    })
    const date = new Date(meme.date + "T12:00:00.000Z");
    let currentDate = date.getDate();
    //console.log("cdate", date.toLocaleString(undefined, {}), date.getMonth(), meme.date.slice(5, 7));
    if (meme.date.slice(5, 7) === "11" && meme.date.slice(8) == "1") {
        currentDate = 32;
    } else if (meme.date.slice(5, 7) === "11") {
        currentDate = 33;
    }
    console.log("month", date.getMonth())
    console.log(currentDate)
    //console.log(cstDate.getDate());
    const today = new Date();


    return (
        <main className='page--vflex'>
            <HomeHeader />
            <MemeContainer meme={meme}/>
            <DayNavigation currentDay={currentDate} currentYear={date.getFullYear()} homepage={true}/>
            {!(today.getMonth() === 9 && today.getDate() === 10) &&
                <SpookySignup />
            }
        </main>
    )
}
