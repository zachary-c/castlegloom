import { Metadata } from 'next'
import '_components/spooktober/styles/global.scss'
import '_components/poll/styles/pollQuestion.scss'
import "_components/poll/styles/theme_october.scss"
import '_components/poll/styles/theme_november.scss'
import '_components/poll/styles/theme_december.scss'
import "_components/poll/styles/theme_january.scss"
import "_components/poll/styles/theme_february.scss"
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
