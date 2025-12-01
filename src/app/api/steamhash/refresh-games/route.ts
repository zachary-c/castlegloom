import { NextRequest, NextResponse } from 'next/server';
/*import prisma from 'R/prisma/lib/prisma';

type ReturnedData = {
	applist: {
		apps: {
			appid: number,
			name: string
		}[]
	}
}

export async function GET(request: NextRequest) {

	const data: ReturnedData = await (await fetch('https://api.steampowered.com/ISteamApps/GetAppList/v2/')).json()

	//console.log(data.applist.apps)
	const dict: Map<number, string> = new Map();
	for (const game of data.applist.apps) {
		if (game.name?.length > 0) {
			dict.set(game.appid, game.name);
		}
	}
	const records: { id: number, name: string }[] = []
	dict.forEach((v, k) => {
		records.push({ id: k, name: v })
	})

	await prisma.steamApp.deleteMany()

	await prisma.steamApp.createMany({
		data: records
	})

	await prisma.retrievalRecord.create({});

	console.log('creating a retrieval record, count of apps:', records.length)

	return NextResponse.json({ count: records.length, steam_games_list: records }, { status: 200 })
}*/
