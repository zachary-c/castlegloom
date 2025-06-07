import { NextRequest, NextResponse } from "next/server";
import { patchClient } from '$/lib/client';
import { redirect, RedirectType } from "next/navigation";

export async function GET(req : NextRequest) {
    const username = req.nextUrl.searchParams.get('username')
    
    if (!username) {
        return NextResponse.json({message: 'Must provide username.'}, {status: 400, statusText: 'Bad Request'})
    }

    const rec = await patchClient.createIfNotExists({
        _id: username,
        _type: 'rwbbRecord',
        username: username,
        count: 0
    })
    if (!!rec) {
        return redirect(`/rwbb/${username}`, RedirectType.push);
    }
    return NextResponse.json({message: 'Sorry, something went wrong.'}, { status: 500, statusText: 'Internal Server Error' })
}