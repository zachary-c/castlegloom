import '../../components/spooktober/styles/global.scss'
import '../../styles/polls.scss'

export default function Layout({children} : {children : any}) {

    return <html>
        <body className='poll__body'>
            <main className="page--vflex">
                {children}
            </main>
        </body>
    </html>
}