import { apiClient } from "$/lib/client";
import { meme_by_date } from "$/lib/queries";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest) {
    const date = req.nextUrl.searchParams.get("date")

    const data = await apiClient.fetch(meme_by_date, { date: date }, { cache: 'no-store'})
    
    return NextResponse.json(data, { status: 200 })

}