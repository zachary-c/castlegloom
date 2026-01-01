import { patchClient } from '$/lib/client';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';
import { poll_cookie_user_id } from '../login/cookie';

export async function GET(request: NextRequest) {
	const userid = request.nextUrl.searchParams.get("userid")

	if (!userid) {
		return new Response(null, { status: 400, statusText: 'Bad Request' })
	}

	const patch = patchClient.patch(userid, {
		set: {
			isPolledDaily: true
		}
	})
	try {
		const result = await patch.commit()
		console.log("result", result)
	} catch (err) {
		console.error(err)
		return Response.json({}, { status: 500, statusText: "Internal Server Error" })
	}

	const cookieJar = cookies();

	const id = cookieJar.get(poll_cookie_user_id);
	console.log('id', id)

	cookieJar.set(poll_cookie_user_id, userid, {
		maxAge: 60 * 60 * 24 * 30,
		//domain: 'castlegloom.com',
		//partitioned: true
	})

	return redirect(`/poll/dashboard`)
}
