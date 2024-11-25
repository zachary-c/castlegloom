import { Metadata } from "next";
import "&/stratRoulette.scss"
import StratRoulette from "R/src/components/StratRoulette";

export const metadata : Metadata = {
    title: 'CS2 Strat Roulette',
    description: "A web app for generating your next game-winning strategy."
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