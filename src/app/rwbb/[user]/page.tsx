'use client'
import { useEffect, useState } from "react"
import "@/rwbb/rwbb.scss"

export default function Page({params} : {params : {user : string}}) {
    const [realCount, setRealCount] = useState(0);
    const [batchCount, setBatchCount] = useState<number>(0);
    const [timerId, setTimerId] = useState<NodeJS.Timeout | undefined>()
    const [displayCount, setDisplayCount] = useState<number | undefined>(undefined)
    const [posting, setPosting] = useState(true);

    useEffect(() => {
        async function fetchCount() {
            const response = await fetch(`/api/rwbb/read?username=${params.user}`)
            const result = await response.json()
            console.log("result", result)
            setDisplayCount(result.count)
            setRealCount(result.count)
            setPosting(false)
        }
        fetchCount()
    }, [])

    useEffect(() => console.log('real', realCount), [realCount])
    
    async function postData(value : number) {
        const response = await fetch(`/api/rwbb/update?username=${params.user}&value=${value}`, { method: 'POST' })
        const result = await response.json()

        if (response.ok) {
            console.log("SUCCESS", result)
            setDisplayCount(result.count)
            setRealCount(result.count)
        } else {
            console.log("FAILURE", result)
        }
        setPosting(false)
    }

    function updateBatch(delta : (1 | -1)) {
        if (displayCount === undefined) return
        setPosting(true)

        let batchTempCount = 0
        setBatchCount(latestBatchCount => {
            batchTempCount = latestBatchCount + delta

            if (realCount + batchTempCount < 0) {
                batchTempCount = -realCount
            }
            return batchTempCount
        })
        setDisplayCount(dc => Math.max((dc ?? 0) + delta, 0))
        
        if (timerId) {
            clearTimeout(timerId)
        } 
        
        const timeoutId = setTimeout(() => {
            postData(batchTempCount)
            setBatchCount(0)

            setTimerId(undefined)
        }, 1000)
        setTimerId(timeoutId)
    }

    return <div>
        <h1 className="individual-title">Happy Counting, {``}<b>{params.user}</b>{``}!</h1>
        <div className="counter">
            <div className={`number-wrap`}>
                <span className="number">{displayCount ?? 0}</span>
                <span className={`indicator ${posting ? 'posting' : ''}`}></span>
            </div>
            <div className="controls">
                <button className="pm" onClick={() => updateBatch(-1)}><span>-</span></button>
                <button className="pm" onClick={() => updateBatch(1)}><span>+</span></button>
            </div>
        </div>
    </div>
}