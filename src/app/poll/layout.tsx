import { Metadata } from 'next'
import '_components/spooktober/styles/global.scss'
import '_components/poll/styles/pollQuestion.scss'
import '_components/poll/styles/theme_november.scss'
import '_components/poll/styles/theme_december.scss'
import { monthly_theme, Theme } from './pollUtil'
import { Montserrat } from 'next/font/google'
import { cookies } from 'next/headers'
import { poll_cookie_theme_preference } from '@/api/poll/login/cookie'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: "Polling | Castle Gloom"
};

export default function Layout({ children }: { children: any }) {
	const cookieJar = cookies()
	const theme_preference = cookieJar.get(poll_cookie_theme_preference)
	let theme = monthly_theme;
	if (theme_preference && theme_preference.value !== 'monthly') {
		theme = theme_preference.value as Theme
	}

	return <html>
		<body className={`poll__body ${theme} ${montserrat.className}`}>
			<main className="page--vflex">
				{children}
			</main>
		</body>
	</html>
}
