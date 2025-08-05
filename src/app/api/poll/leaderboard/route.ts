import { apiClient } from "$/lib/client";
import { leaderboardQuery, LeaderboardRecord } from "$/lib/dashboard_queries";
import { meme_by_date, poll_by_date } from "$/lib/queries";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest) {
    const userid = new URL(req.url).searchParams.get('userid');

    const data : LeaderboardRecord[] = await apiClient.fetch(leaderboardQuery, {}, { cache: 'no-store'})
    const cleanedData : LeaderboardRecord[] = []
    data.forEach((d) => { 
        const newData = {...d, _id: undefined}
        delete newData["_id"];
        if (userid && d._id == userid) {
            newData.isUser = true;
        }
        cleanedData.push(newData)
     })
    
    return NextResponse.json(cleanedData, { status: 200 })

}