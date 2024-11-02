import React from 'react'
import '../../components/spooktober/styles/global.scss'
import '../../components/spooktober/styles/daynav.scss'
import Link from 'next/link'

export default async function NotFound() {

    return (
        <main className='page--global-notfound'>
            <h1>404 Poll Not Found</h1>
            <div className='daynav__button'>
                <Link className="button" href='/poll'>Return To Poll Home</Link>
            </div>
        </main>
    )
}
