import { apiClient } from "$/lib/client";
import { meme_by_date, poll_by_date } from "$/lib/queries";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest) {
    const date = req.nextUrl.searchParams.get("date")
    const index = req.nextUrl.searchParams.get('index')

    const data = await apiClient.fetch(poll_by_date, { date: date }, { cache: 'no-store'})
    
    return NextResponse.json(data, { status: 200 })

}