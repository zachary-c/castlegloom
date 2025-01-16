'use client'
import { BingoSquare_t } from "$/lib/bingoCardQueries";
import { useMemo } from "react";

export default function BingoSquare({data} : { data : BingoSquare_t}) {
    const isCompleted = useMemo(() => data.threshold <= (data.support?.length ?? 0), [data.threshold, data.support])
    return <>
        <div className={`bc__square${isCompleted ? ' completed' : ''}`}>
            <h3>{data.label}</h3>
        </div>
    </>
}