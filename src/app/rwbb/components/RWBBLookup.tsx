"use client"

import { useMemo, useState } from "react"
import { RwbbRecord } from "../util"

export default function RWBBLookup({ staticRecords } : { staticRecords : RwbbRecord[] }) {
    const [records, setRecords] = useState(staticRecords)    
    const [searchTerm, setSearchTerm] = useState('')
    const filteredRecords = useMemo<RwbbRecord[] | null>(() => {
        if (searchTerm === '') {
            return null
        } else {
            return records.filter((r) => r.username.toLowerCase().includes(searchTerm.toLowerCase()))
        }
    }, [records, searchTerm])   


    return <div className="lookup">
        <h2>
            Find Your Counter
        </h2>
        <input placeholder="Username" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        {filteredRecords === null 
            ? <span>{records.length} RWBB Lifetime Counters</span>
            : (
                filteredRecords.length === 0 
                    ? <span>No matching counters... </span>
                    : <ul>
                        {filteredRecords.map((fr) => <li>{fr.username}</li>)}
                    </ul>
            )
        }
        
    </div>

}