import type { Metadata } from 'next'
import Script from 'next/script'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Spooktober',
	description: 'Happy Halloween!',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className='spooktober-layout'>
			<body>
				<main className={`page--vflex montserrat ${montserrat.className}`}>
					{children}
				</main>
			</body>
		</html>
	)
}
//<script async src="https://umami-mere.vercel.app/script.js" data-website-id="be0a694b-bda1-4d44-b3f2-c4af1bd7d632"></script>
