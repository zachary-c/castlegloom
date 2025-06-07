import { NextRequest, NextResponse } from "next/server";
import { apiClient } from '$/lib/client';
import { groq } from "next-sanity";

export async function GET(req : NextRequest) {
    const username = req.nextUrl.searchParams.get('username')
    const result = await apiClient.fetch(groq`*[_type == 'rwbbRecord' && username == "${username}"][0] { count }`)
    
    return NextResponse.json(result, { status: 200, statusText: 'OK' })
}