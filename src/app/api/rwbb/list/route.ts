import { NextRequest, NextResponse } from "next/server";
import { apiClient } from '$/lib/client';
import { groq } from "next-sanity";

export async function GET(req : NextRequest) {
    const recs = await apiClient.fetch(groq`*[_type == 'rwbbRecord']`)
    
    return NextResponse.json(recs, { status: 200, statusText: 'OK' })
}