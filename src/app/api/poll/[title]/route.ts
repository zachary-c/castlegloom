import { apiVersion, projectId } from "$/env";
import { client } from "$/lib/client"
import { PollQuestion_t } from "$/types/documents";
import { createClient } from "next-sanity";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

// {params : { title : string }, searchParams : { responder : string | undefined, choice : string | undefined }}
export async function GET(request : NextRequest, { params } : { params : { title : string } }) {
    const title = params.title;
    const responder = decodeURIComponent(request.nextUrl.searchParams.get('responder') ?? '')
    const choice = decodeURIComponent(request.nextUrl.searchParams.get('choice') ?? '')
    const date = decodeURIComponent(request.nextUrl.searchParams.get('date') ?? '')
    console.log("title", params.title, responder, choice, date)
     
    if (!process.env.CAMPBELL_TOKEN) {
        return NextResponse.json({
            message: 'Sorry, something went wrong.'
        }, { status: 500 })
    }

    const client = createClient({
        projectId: projectId,
        dataset: 'production',
        apiVersion: apiVersion,
        useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
        token: process.env.CAMPBELL_TOKEN
    })

    const data : PollQuestion_t = await client.fetch(`*[_type == 'pollQuestion' && title == $paramTitle][0]`, { paramTitle: title})
    console.log('data', data.responses)
    const alreadyVoted = data.responses.find((res) => res.listOfResponders?.some((responded) => responded._ref === responder))
    const chosenIndex = data.responses.findIndex((res) => res.responseSlug.current === choice)
    console.log("Chosen Response", chosenIndex)
    if (alreadyVoted?._key === data.responses[chosenIndex]._key) {
        console.log("VOTING FOR SAME ONE ALREADY VOTED FOR, SHORT CIRCUIT")
        return redirect(`/spooktober/${date}`)
    }
    //const alreadyVotedIndex = data.responses.find((res) => res.listOfResponders.some((responded) => responded._ref === responder))
    if (alreadyVoted) {
        console.log("Found prior vote: ", alreadyVoted)
        //const filtered = alreadyVoted.listOfResponders.filter((r) => r._ref !== responder)
        let deletion
        if (alreadyVoted.listOfResponders.length === 1) {
            deletion = client.patch(data._id, { unset: [`responses[_key == \"${alreadyVoted._key}\"].listOfResponders`]})
        } else {
            deletion = client.patch(data._id, { unset: [`responses[_key == \"${alreadyVoted._key}\"].listOfResponders[0]`]})
        }
        console.log("Deletion commit response", (await deletion.commit()).responses)
    }

    let patch;
    // if there is some responders in there at the moment/still/already
    if (data.responses[chosenIndex].listOfResponders) {
        patch = client.patch(data._id, {
            set: {
                before: `responses[1].listOfResponders[0]`,
                items: [{_type: 'reference', _key: `${responder}_${choice}`, _ref: responder}]
            }
        })
    } else {
        const setpatch : any = {}
        setpatch[`responses[${chosenIndex}].listOfResponders`] = [{_type: 'reference', _key: `${responder}_${choice}`, _ref: responder}]
        console.log("setpatch", setpatch)
        patch = client.patch(data._id, {
            set: setpatch
        })
    }

    console.log("Patch Insert", (await patch.commit()))

    return redirect(`/spooktober/${date}`)
}