import type { Metadata } from "next";
import "_styles/global.scss"
import "./annual.scss"


export const metadata: Metadata = {
	title: "Annual",
	description: 'Reflections.'
};

export default function AnnualLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return <html>
		{children}
	</html>
		;
}
