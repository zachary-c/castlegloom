import '../../components/spooktober/styles/global.scss'
import '../../styles/pollQuestion.scss'
import { theme } from './pollUtil'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({subsets: ['latin']})

export default function Layout({children} : {children : any}) {

    return <html>
        <body className={`poll__body ${theme} ${montserrat.className}`}>
            <main className="page--vflex">
                {children}
            </main>
        </body>
    </html>
}