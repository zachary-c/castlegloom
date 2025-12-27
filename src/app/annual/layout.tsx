import "_styles/global.scss"
import "./annual.scss"

export default function AnnualLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return <html>
		{children}
	</html>
		;
}
