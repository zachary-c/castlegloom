import "_styles/page.scss";
import "_styles/listgrid.scss"
import "_styles/global.scss"
import Image from "next/image";
import { ReactElement } from "react";
import Link from "next/link";

export default function Layout({ children }: { children: ReactElement[] }) {
	return (
		<html lang="en" className="layout--wallpaper">
			<body>
				<div className="wallpaper__wrapper">
					<Image src={"/castle_16-9.webp"} alt="Landscape view of castles," width={1696} height={954} />
				</div>
				<main className='page--global-notfound'>
					<h1>404: Not Found</h1>
					<div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
						<Link className="button" href='/poll'>Polling</Link>
						<Link className="button" href='/'>Homepage</Link>
					</div>
				</main>
			</body>
		</html>
	);
}
