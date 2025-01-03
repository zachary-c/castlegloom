import React from 'react'
import 'R/src/components/spooktober/styles/global.scss'
import 'R/src/components/spooktober/styles/daynav.scss'
import Link from 'next/link'

export default async function NotFound() {

    return (
        <html>
            <body>            
                <main className='page--global-notfound'>
                    <h1>404: Not Found</h1>
                    <div style={{display: 'flex', flexDirection: 'row', gap: '1rem'}}>
                        <Link className="button" href='/poll'>Polling</Link>
                        <Link className="button" href='/'>Homepage</Link>
                    </div>
                </main>
            </body>
        </html>
    )
}
