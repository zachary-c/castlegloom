import React from 'react'
import '../../components/spooktober/styles/global.scss'
import HomeHeader from '../../components/HomeHeader'
import { Meme_t } from '../../sanity/types/documents'
import { latest_meme } from '../../sanity/lib/spooktober_queries'
import { client } from '../../sanity/lib/client'
import MemeContainer from '../../components/MemeContainer'
import SpookySignup from '../../components/SpookySignup'
import DayNavigation from '../../components/DayNavigation'

export const revalidate = 60;

export default async function Home() {
  const meme: Meme_t = await client.fetch(latest_meme)

  const date = new Date(meme.date + "T12:00:00.000Z");
  let currentDate = date.getDate();

  // 2025-11-01
  console.log(meme.date.slice(8), meme.date)
  if (meme.date.slice(5, 7) === "11" && meme.date.slice(8) == "01") {
    currentDate = 32;
  } else if (meme.date.slice(5, 7) === "11") {
    currentDate = 33;
  }

  const today = new Date();

  return (
    <>
      <HomeHeader />
      <MemeContainer meme={meme} />
      <DayNavigation currentDay={currentDate} currentYear={date.getFullYear()} homepage={true} />
      {!(today.getMonth() === 9 && today.getDate() === 10) &&
        <SpookySignup />
      }
    </>
  )
}
