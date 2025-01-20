'use server'
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { pollCookieName } from "./cookie";
import { apiClient } from "$/lib/client";
import { redirect } from "next/navigation";

// {params : { title : string }, searchParams : { responder : string | undefined, choice : string | undefined }}
export async function GET(request : NextRequest) {
    const userid = decodeURIComponent(request.nextUrl.searchParams.get('userid') ?? '')
    console.log("title", userid)
     
    if (!process.env.PROJECT_API_TOKEN) {
        return NextResponse.json({
            message: 'Sorry, something went wrong.'
        }, { status: 500 })
    }

    const data = await apiClient.fetch(`*[_id == $userid][0]`, { userid: userid})
    if (!data) {
        return NextResponse.json({
            message: 'User Not Found'
        }, { status: 404, statusText: 'Not Found' })
    }

    const cookieJar = cookies();

    const id = cookieJar.get(pollCookieName);
    console.log('id', id)

    cookieJar.set(pollCookieName, userid, {
        maxAge: 60 * 60 * 24 * 30,
        //domain: 'castlegloom.com',
        //partitioned: true
    }) 

    //return NextResponse.json({"Woohoo": 'Overtime'}, { status: 200 })
    return redirect(`/poll/dashboard`)
}