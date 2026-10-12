import { Metadata } from 'next'
import '_components/spooktober/styles/global.scss'
import '_components/poll/styles/pollQuestion.scss'
import "_components/poll/styles/01_theme_january.scss"
import "_components/poll/styles/02_theme_february.scss"
import "_components/poll/styles/03_theme_march.scss"
import "_components/poll/styles/04_theme_april.scss"
import "_components/poll/styles/05_theme_may.scss"
import "_components/poll/styles/06_theme_june.scss"
import "_components/poll/styles/07_theme_july.scss"
import "_components/poll/styles/08_theme_august.scss"
import "_components/poll/styles/09_theme_september.scss"
import "_components/poll/styles/10_theme_october.scss"
import '_components/poll/styles/11_theme_november.scss'
import '_components/poll/styles/12_theme_december.scss'
import "_components/poll/styles/theme_wireframe_dark.scss"
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Polling | Castle Gloom",
  authors: { name: "Castle Gloom Smithing" },
  applicationName: "Castle Gloom Census"
};

export default function Layout({ children }: { children: any }) {

  return <html className={`${montserrat.className}`}>
    {children}
  </html>
}
