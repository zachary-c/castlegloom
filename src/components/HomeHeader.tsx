'use client'
import React from 'react'
import './spooktober/styles/homeheader.scss'
import { suffix } from '../../util'
export default function HomeHeader() {

  const date = new Date();

  const titles = ['Happy Spooktober!',
    'Happy Halloween!',
    'Happy October!',
    'Happy Spooky Season!',
    'Spooktober Is Upon Us!',
    'Spooky Scary Skeletons!',
    'Merry Spooktober!',
    `Happy ${date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }) + suffix(date.getDate())}!`]

  let chosenTitle = titles[Math.floor(date.getUTCMinutes() % titles.length)]
  if (date.getDate() === 10 && date.getMonth() === 9) {
    chosenTitle = "In Memory"
  }

  return (
    <div className='home-header'>
      <h1>{chosenTitle}</h1>

      {/* <h1>Happy November!</h1> */}
    </div>
  )
}
