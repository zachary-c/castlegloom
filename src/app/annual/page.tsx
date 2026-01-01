
import { Montserrat } from 'next/font/google'
import { Metadata } from 'next/types'
import eoy_25 from "%/eoy/2025.png"
import eoy_24 from "%/eoy/2024.png"
import eoy_23 from "%/eoy/2023.png"
import eoy_22 from "%/eoy/2022.png"
import eoy_21 from "%/eoy/2021.png"
import eoy_20 from "%/eoy/2020.png"
import eoy_19 from "%/eoy/2019.png"
import eoy_18 from "%/eoy/insta_2018.jpg"
import { caption_25, caption_24, caption_23, caption_22, caption_21, caption_20, caption_19 } from "./captions"

export const metadata: Metadata = {
	title: "ZHC Annual",
	description: 'A collection of memories and reflections.',
	openGraph: {
		images: [
			{
				alt: "2025 End of Year Photo",
				url: "/eoy/2024.png"
			}
		]
	}
};
const montserrat = Montserrat({ subsets: ['latin'] })

export default function AnnualPage() {

	return <body className="annual">
		{/*		<section className="header">
			<h1 className={`${montserrat.className}`}>ANNUAL</h1>
		</section>
*/}
		<main>
			<section className="year" id="2025">
				<div className="img-wrapper">
					<img src={eoy_25.src} />
					<span className={`date ${montserrat.className}`}>January 1st, 2026</span>
				</div>
				<span className={`caption ${montserrat.className}`}>{caption_25}
				</span>
			</section>
			<section className="spacer"></section>
			<section className="year" id="2024">
				<div className="img-wrapper">
					<img src={eoy_24.src} />
					<span className={`date ${montserrat.className}`}>January 1st, 2025</span>
				</div>
				<span className={`caption ${montserrat.className}`}>{caption_24}
				</span>
			</section>
			<section className="spacer"></section>
			<section className="year" id="2023">
				<div className="img-wrapper">
					<img src={eoy_23.src} />
					<span className={`date ${montserrat.className}`}>January 1st, 2024</span>
				</div>
				<span className={`caption ${montserrat.className}`}>{caption_23}
				</span>
			</section>
			<section className="spacer"></section>
			<section className="year" id="2022">
				<div className="img-wrapper">
					<img src={eoy_22.src} />
					<span className={`date ${montserrat.className}`}>January 1st, 2023</span>
				</div>
				<span className={`caption ${montserrat.className}`}>{caption_22}
				</span>
			</section>
			<section className="spacer"></section>
			<section className="year" id="2021">
				<div className="img-wrapper">
					<img src={eoy_21.src} />
					<span className={`date ${montserrat.className}`}>January 1st, 2022</span>
				</div>
				<span className={`caption ${montserrat.className}`}>{caption_21}
				</span>
			</section>
			<section className="spacer"></section>
			<section className="year" id="2020">
				<div className="img-wrapper">
					<img src={eoy_20.src} />
					<span className={`date ${montserrat.className}`}>January 2nd, 2021</span>
				</div>
				<span className={`caption ${montserrat.className}`}>{caption_20}
				</span>
			</section>
			<section className="spacer"></section>
			<section className="year" id="2019">
				<div className="img-wrapper">
					<img src={eoy_19.src} />
					<span className={`date ${montserrat.className}`}>December 31st, 2019</span>
				</div>
				<span className={`caption ${montserrat.className}`}>{caption_19}
				</span>
			</section>
			<section className="spacer"></section>
			<section className="year" id="2018">
				<div className="img-wrapper">
					<img src={eoy_18.src} />
					<span className={`date ${montserrat.className}`}>January 1st, 2019</span>
				</div>
			</section>
			<section className="spacer"></section>
		</main>

	</body>
}
