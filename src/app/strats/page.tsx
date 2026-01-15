import { Metadata } from "next";
import StratRoulette from "R/src/components/stratroulette/StratRoulette";

export const metadata: Metadata = {
	title: 'CS2 Strat Roulette | Castle Gloom',
	description: "A web app for generating your next game-winning Counterstrike plan."
}

export default function Page() {

	return (
		<html lang="en" className="sr">
			<body className="sr__body">
				<main className="sr__main">
					<StratRoulette />
				</main>
			</body>
		</html>)
}
