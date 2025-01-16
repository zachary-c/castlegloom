import { BingoCard_t, bingoCardQuery } from "$/lib/bingoCardQueries";
import { client } from "$/lib/client";
import BingoCard from "R/src/components/BingoCard";
import "R/src/styles/page.scss";
import { createGlobalStyle } from "styled-components";

export default async function Bingo() {
    const bingoCard : BingoCard_t = await client.fetch(bingoCardQuery, { slug: 'zhc' })
    console.log('bingo', bingoCard)

    return (
        <html lang="en" className="root-layout">
            <body className="bingo" >
                <main>
                    <style>
                        {`
                        html {
                            --not-completed: lightgrey;
                            --not-completed-text: black;
                            --completed: #00d021;
                            --completed-text: black;
                        }  
                        `}
                    </style>
                    <BingoCard {...bingoCard} />
                </main>
            </body>
        </html>
    );
}
