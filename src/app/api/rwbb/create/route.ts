import { NextRequest, NextResponse } from "next/server";
import { patchClient } from '$/lib/client';

export async function POST(req : NextRequest) {
    const body = await req.json()

    if (!body.username) {
        return NextResponse.json({message: 'Must provide username.'}, {status: 400, statusText: 'Bad Request'})
    }

    const rec = await patchClient.createIfNotExists({
        _id: body.username,
        _type: 'rwbbRecord',
        username: body.username,
        count: 0
    })
    if (!!rec) {
        return NextResponse.json({}, { status: 200 })
    }
    return NextResponse.json({message: 'Sorry, something went wrong.'}, { status: 500, statusText: 'Internal Server Error' })
}