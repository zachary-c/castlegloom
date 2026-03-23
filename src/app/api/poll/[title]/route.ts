import { apiVersion, projectId } from "$/env";
import { QuestionCorrespondence_t } from "$/schemaTypes/questionObjects/questionCorrespondence";
import { PollQuestion_t, ResponseMechanism } from "$/types/documents";
import { createClient } from "next-sanity";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { handleOldResponsesPath } from "./deprecated";

function getCorrespondenceList(correspondence?: QuestionCorrespondence_t): { responseList: ResponseMechanism[], patchSegment: string } {
	if (!correspondence) return { responseList: [], patchSegment: "THIS_WILL_ERROR" }
	switch (correspondence.correspondenceType) {
		case 'richTextResponse':
			return {
				responseList: correspondence.richTextResponses ?? [],
				patchSegment: "richTextResponses"
			}
		case 'imageResponse':
			return {
				responseList: correspondence.imageResponses ?? [],
				patchSegment: "imageResponses"
			}
	}
}

// {params : { title : string }, searchParams : { responder : string | undefined, choice : string | undefined }}
export async function GET(request: NextRequest, { params }: { params: { title: string } }) {
	const title = params.title;
	const responder = decodeURIComponent(request.nextUrl.searchParams.get('responder') ?? '')
	const choice = decodeURIComponent(request.nextUrl.searchParams.get('choice') ?? '')
	const date = decodeURIComponent(request.nextUrl.searchParams.get('date') ?? '')
	console.log("title", params.title, responder, choice, date)

	if (!process.env.PROJECT_API_TOKEN) {
		return NextResponse.json({
			message: 'Sorry, something went wrong.'
		}, { status: 500 })
	}

	const client = createClient({
		projectId: projectId,
		dataset: 'production',
		apiVersion: apiVersion,
		useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
		token: process.env.PROJECT_API_TOKEN
	})

	const data: PollQuestion_t = await client.fetch(`*[_type == 'pollQuestion' && title == $paramTitle][0]`, { paramTitle: title })

	// legacy path
	if (data.responses) {
		return await handleOldResponsesPath(data.responses, choice, responder, date, data._id, data.hidden, client)
	}

	// Mainline Correspondence path
	const { responseList, patchSegment } = getCorrespondenceList(data.correspondence)
	console.log('data', responseList)

	const alreadyVoted = responseList.find((res) => res.listOfResponders?.some((responded) => responded._ref === responder))
	const chosenIndex = responseList.findIndex((res) => res.responseSlug.current === choice)
	if (chosenIndex < 0) {
		redirect("/poll/invalid-response");
	}
	console.log("Chosen Response", chosenIndex)
	console.log("Already Voted found ", alreadyVoted)
	if (alreadyVoted?._key === responseList[chosenIndex]._key) {
		console.log("VOTING FOR SAME ONE ALREADY VOTED FOR, SHORT CIRCUIT")
		if (data.hidden) {
			return NextResponse.json({ message: "Stay sneaky 😎" }, { status: 200, statusText: 'OK' })
		}
		return redirect(`/poll/${date}`)
	}

	// There exists a vote from this responder we need to remove before adding the new one 
	if (alreadyVoted) {
		console.log("Found prior vote: ", alreadyVoted)
		//const filtered = alreadyVoted.listOfResponders.filter((r) => r._ref !== responder)
		let deletion
		if (alreadyVoted.listOfResponders?.length === 1) {
			console.log("Only one vote (us) so removing it wholesale")
			deletion = client.patch(data._id, { unset: [`correspondence.${patchSegment}[_key == \"${alreadyVoted._key}\"].listOfResponders`] })
		} else {
			console.log("Multiple other votes, removing just us")
			deletion = client.patch(data._id, { unset: [`correspondence.${patchSegment}[_key == \"${alreadyVoted._key}\"].listOfResponders[_ref == "${responder}"]`] })
		}
		console.log("Deletion commit response", (await deletion.commit()).responses)
	}

	let patch;
	// if there is some responders in there at the moment/still/already
	if (responseList[chosenIndex].listOfResponders) {
		console.log("Insert Patch; other people have said this")
		patch = client.patch(data._id, {
			insert: {
				after: `correspondence.${patchSegment}[${chosenIndex}].listOfResponders[-1]`,
				items: [{ _type: 'reference', _key: `${responder}_${choice}`, _ref: responder }]
			}
		})
	} else {
		const setpatch: any = {}
		setpatch[`correspondence.${patchSegment}[${chosenIndex}].listOfResponders`] = [{ _type: 'reference', _key: `${responder}_${choice}`, _ref: responder }]
		console.log("setpatch -- no one has responded with this yet", setpatch)
		patch = client.patch(data._id, {
			set: setpatch
		})
	}

	console.log("Patch .commit()", (await patch.commit()))

	if (data.hidden) {
		return NextResponse.json({ message: "Stay sneaky 😎" }, { status: 200, statusText: 'OK' })
	}

	return redirect(`/poll/${date}`)
}
