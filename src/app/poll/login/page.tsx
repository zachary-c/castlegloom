import React from 'react'

import { theme } from '../pollUtil'
import Login from 'R/src/components/poll-dash/Login';

export const dynamic = "force-dynamic";

export default async function Page() {

    return <>
        <h1 className={`poll__page-title ${theme}`}>Polling Login</h1>
        <div className='login__page'>
            <Login />
        </div>
    </>

}

// homepage has meme of the day
// gallery page has all the memes -- links to memes or grid? unclear
