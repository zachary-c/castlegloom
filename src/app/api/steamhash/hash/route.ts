import { NextRequest, NextResponse } from 'next/server';
/*import prisma from 'R/prisma/lib/prisma';

type Game_t = {
	appid: number,
	playtime_forever: number,
	playtime_windows_forever: number,
	playtime_mac_forever: number,
	playtime_linux_forever: number,
	rtime_last_played: number,
	playtime_disconnected: number
}
// Resolve username (e.g. convert legitbannana to whatever your actual id if you don't have one set up)
// https://wiki.teamfortress.com/wiki/WebAPI/ResolveVanityURL

async function getName(id: number): Promise<string> {
	let res: { id: number, name: string } | null = null
	res = await prisma.steamApp.findFirst({
		where: {
			id: {
				equals: id
			}
		}
	});
	if (res) {
		return res.name
	} else {
		console.log("Couldn't find a game for id", id)
		return "null"
	}
}

export async function POST(request: NextRequest) {
	const postBody = await request.json()

	const game_dict: any = {}

	for (const id of postBody.id_list) {
		const response = await fetch(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_API_KEY}&steamid=${id}&format=json`)
		if (!response.ok) {
			return NextResponse.json({
				message: 'Something went wrong when attempting to retrieve users\' games; please ensure you\'ve entered them correctly.',
				type: 'error'
			}, {
				status: 400,
				statusText: 'Bad Request'
			})
		}
		game_dict[id] = (await response.json()).response
	}

	const dict: Map<number, number> = new Map()
	for (const id of postBody.id_list) {
		for (const game of game_dict[id].games) {
			const num = dict.get(game.appid);
			dict.set(game.appid, num === undefined ? 1 : num + 1);
		}
	}

	const promises: Promise<string>[] = []

	dict.forEach((v, k) => {
		if (v === postBody.id_list.length) {
			promises.push(getName(k))
		}
	})

	let output: string[] = await Promise.all(promises)
	output = output.filter((g) => g !== 'null')
	output.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
	console.log("output", output)

	return NextResponse.json(
		{
			games: output
		},
		{
			status: 200,
		}
	)
}*/
