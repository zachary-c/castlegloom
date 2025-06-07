import { NextRequest, NextResponse } from "next/server";
import { patchClient } from '$/lib/client';

export async function POST(req : NextRequest) {
    const paramVal = req.nextUrl.searchParams.get('value')
    if (!paramVal) {
        return NextResponse.json({message: 'Must provide value.'}, {status: 400, statusText: 'Bad Request'})
    }
    const value = parseInt(paramVal)
    const username = req.nextUrl.searchParams.get('username')

    if (!username) {
        return NextResponse.json({message: 'Must provide username.'}, {status: 400, statusText: 'Bad Request'})
    }
    let count = value
    
    const patch = patchClient.patch(username, {
        inc: {
            count: count
        }
    })
    const result = await patch.commit()
    if (!!result) {
        return NextResponse.json({count: result.count}, { status: 200 })
    }
    return NextResponse.json({message: 'Sorry, something went wrong.'}, { status: 500, statusText: 'Internal Server Error' })
}