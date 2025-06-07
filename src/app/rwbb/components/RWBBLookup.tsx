"use client"

import { ReactElement, useMemo, useState } from "react"
import { RwbbRecord } from "../util"
import Link from "next/link"
import { RightArrow } from "R/src/components/icons/RightArrow"

export default function RWBBLookup({ staticRecords } : { staticRecords : RwbbRecord[] }) {
    const [records, setRecords] = useState(staticRecords)    
    const [searchTerm, setSearchTerm] = useState('')
    const displayItems = useMemo<ReactElement[] | null>(() => {
        if (searchTerm === '') {
            return null
        }
        const matching = []
        let exactMatch = false
        for (let i = 0; i < records.length; i++) {
            if (records[i].username.toLowerCase() === searchTerm.toLowerCase()) {
                exactMatch = true;
                matching.push(
                    <li>
                        <Link href={`/rwbb/${records[i].username}`}>
                            <span>{records[i].username}</span>
                            <RightArrow />
                        </Link>
                    </li>
                )
            } else if (records[i].username.toLowerCase().includes(searchTerm.toLowerCase())) {
                matching.push(
                    <li>
                        <Link href={`/rwbb/${records[i].username}`}>
                            <span>{records[i].username}</span>
                            <RightArrow />
                        </Link>
                    </li>
                )            
            }
        }
        if (!exactMatch) {
            matching.push(<li className="create">
                <Link href={`/api/rwbb/create?username=${encodeURIComponent(searchTerm)}`}>
                    <span>
                        Register Counter "{searchTerm}"
                    </span>
                </Link>
            </li>)
        }
        return matching
    }, [records, searchTerm])   




    return <div className="lookup">
        <h2>
            Find Your Counter
        </h2>
        <div className="input-wrapper">
            <label>Lookup/Create:</label>
            <input placeholder="Username" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        {displayItems === null 
            ? <span className="info-message">{records.length} RWBB Lifetime Counters</span>
            : (
                displayItems.length === 0 
                    ? <span className="">No matching counters... </span>
                    : <ul className="results">
                        {displayItems.map((fr) => fr)}
                    </ul>
            )
        }
        
    </div>

}