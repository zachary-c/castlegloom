import { BingoCard_t } from "$/lib/bingoCardQueries";
import BingoSquare from "./BingoSquare";
import 'R/src/styles/bingo.scss'

export default async function BingoCard(data : BingoCard_t) {
    console.log('data', data)
    return <div className="bc__wrapper">
        <div className="bc__header">
            <span>B</span>
            <span>I</span>
            <span>N</span>
            <span>G</span>
            <span>O</span>
        </div>
        <div className="bc__card">
            <div className="bc__row">
                {data.row1.map((square, index) => 
                    <BingoSquare key={index} data={square} />
                )}
            </div>
            <div className="bc__row">
                {data.row2?.map((square, index) => 
                    <BingoSquare key={index} data={square} />
                )}
            </div>
            <div className="bc__row">
                {data.row3?.map((square, index) => 
                    <BingoSquare key={index} data={square} />
                )}
            </div>
            <div className="bc__row">
                {data.row4?.map((square, index) => 
                    <BingoSquare key={index} data={square} />
                )}
            </div>
            <div className="bc__row">
                {data.row5?.map((square, index) => 
                    <BingoSquare key={index} data={square} />
                )}
            </div>
        </div>
    </div>
}