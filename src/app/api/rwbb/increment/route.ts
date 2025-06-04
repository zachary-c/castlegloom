import { NextRequest, NextResponse } from "next/server";
import { patchClient } from '$/lib/client';

export async function POST(req : NextRequest) {
    const body = await req.json()

    if (!body.username) {
        return NextResponse.json({message: 'Must provide username.'}, {status: 400, statusText: 'Bad Request'})
    }
    let count = 1;
    if (body.count) {
        count = body.count
    }

    const patch = patchClient.patch(body.username, {
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