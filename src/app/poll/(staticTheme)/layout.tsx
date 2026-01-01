import { concreteTheme, monthly_theme, PreferenceTheme } from '../pollUtil'
import { cookies } from 'next/headers'
import { poll_cookie_theme_preference } from '@/api/poll/login/cookie'

export default function Layout({ children }: { children: any }) {
	const cookieJar = cookies()
	const theme_preference = cookieJar.get(poll_cookie_theme_preference)
	let theme = monthly_theme;
	if (theme_preference && theme_preference.value !== 'monthly') {
		theme = concreteTheme(theme_preference.value as PreferenceTheme)
	}

	return <body className={`poll__body ${theme}`}>
		<main className="page--vflex">
			{children}
		</main>
	</body>
}
