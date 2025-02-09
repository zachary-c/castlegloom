import { apiVersion, projectId } from "$/env";
import { UserRecord } from "$/lib/dashboard_queries";
import { createClient } from "next-sanity";
import { NextRequest } from "next/server";

export async function POST(request : NextRequest) {
    let json : UserRecord | undefined
    try {
        json = await request.json()        
    } catch (err) {
        console.error(err)
    }
    if (!json) {
        return new Response(null, { status: 400, statusText: "Bad Request" });
    }
    console.log("user preference JSON:", json)

    const client = createClient({
        projectId: projectId,
        dataset: 'production',
        apiVersion: apiVersion,
        useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
        token: process.env.PROJECT_API_TOKEN
    })
    const patch = client.patch(json._id, {set: {...json, _id: undefined}})
    try {
        const res = await patch.commit()
        console.log("result", res)
    } catch (err) {
        console.error(err)
        return Response.json({}, { status: 500, statusText: "Internal Server Error" })

    }

    return Response.json({}, { status: 200, statusText: "OK" })
}