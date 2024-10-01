'use client'
import React from 'react'
import './spooktober/styles/homeheader.scss'
import { suffix } from '../../util'
export default function HomeHeader() {
    
    const date = new Date();
    if (date.getDate() === 10 && date.getMonth() === 9) {
        return <div className='home-header'></div>
    }

    const titles = ['Happy Spooktober!', 
                    'Happy Halloween!', 
                    'Happy October!', 
                    'Happy Spooky Season!',
                    'Spooktober Is Upon Us!',
                    'Spooky Scary Skeletons!',
                    'Merry Spooktober!',
                    `Happy ${date.toLocaleDateString('en-US', {month: 'long', day: 'numeric'}) + suffix(date.getDate())}!`]
    return (
        <div className='home-header'>
            <h1>{titles[Math.floor(date.getUTCMinutes()%titles.length)]}</h1>
            
            {/* <h1>Happy November!</h1> */}
        </div>
    )
}