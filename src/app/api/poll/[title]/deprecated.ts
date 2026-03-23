import { PollQuestion_t, PollResponse_t, ResponseMechanism } from "$/types/documents";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { SanityClient } from "sanity";

export async function handleOldResponsesPath(responses: PollResponse_t[], choice: string, responder: string, date: string, _id: string, hidden: boolean, client: SanityClient) {
	const alreadyVoted = responses.find((res) => res.listOfResponders?.some((responded) => responded._ref === responder))
	const chosenIndex = responses.findIndex((res) => res.responseSlug.current === choice)
	if (chosenIndex < 0) {
		redirect("/poll/invalid-response");
	}

	console.log("Chosen Response", chosenIndex)
	console.log("Already Voted found ", alreadyVoted)
	if (alreadyVoted?._key === responses[chosenIndex]._key) {
		console.log("VOTING FOR SAME ONE ALREADY VOTED FOR, SHORT CIRCUIT")
		if (hidden) {
			return NextResponse.json({ message: "Stay sneaky 😎" }, { status: 200, statusText: 'OK' })
		}
		return redirect(`/poll/${date}`)
	}

	//const alreadyVotedIndex = data.responses.find((res) => res.listOfResponders.some((responded) => responded._ref === responder))
	if (alreadyVoted) {
		console.log("Found prior vote: ", alreadyVoted)
		//const filtered = alreadyVoted.listOfResponders.filter((r) => r._ref !== responder)
		let deletion
		if (alreadyVoted.listOfResponders?.length === 1) {
			console.log("Only one vote (us) so removing it wholesale")
			deletion = client.patch(_id, { unset: [`responses[_key == \"${alreadyVoted._key}\"].listOfResponders`] })
		} else {
			console.log("Multiple other votes, removing just us")
			deletion = client.patch(_id, { unset: [`responses[_key == \"${alreadyVoted._key}\"].listOfResponders[_ref == "${responder}"]`] })
		}
		console.log("Deletion commit response", (await deletion.commit()).responses)
	}

	let patch;
	// if there is some responders in there at the moment/still/already
	if (responses[chosenIndex].listOfResponders) {
		console.log("Insert Patch; other people have said this")
		patch = client.patch(_id, {
			insert: {
				after: `responses[${chosenIndex}].listOfResponders[-1]`,
				items: [{ _type: 'reference', _key: `${responder}_${choice}`, _ref: responder }]
			}
		})
	} else {
		const setpatch: any = {}
		setpatch[`responses[${chosenIndex}].listOfResponders`] = [{ _type: 'reference', _key: `${responder}_${choice}`, _ref: responder }]
		console.log("setpatch -- no one has responded with this yet", setpatch)
		patch = client.patch(_id, {
			set: setpatch
		})
	}

	console.log("Patch .commit()", (await patch.commit()))

	if (hidden) {
		return NextResponse.json({ message: "Stay sneaky 😎" }, { status: 200, statusText: 'OK' })
	}

	return redirect(`/poll/${date}`)

}
