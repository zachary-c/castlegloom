import { groq } from "next-sanity"
import { PreferenceTheme } from '@/poll/pollUtil'
import { DATE_DST_OFFSET } from "./queries"

export const leaderboardQuery = groq`
*[_type == 'recipient'] { 
    "joinedTitle": title.profession + " " + title.qualifier, 
    "score": count(*[_type == "pollQuestion" && length(responses[length(listOfResponders[_ref == ^.^.^._id]) > 0]) > 0]),
    _id,
	color,
	backgroundColor
} | order(score desc)
`
export type LeaderboardRecord = {
	joinedTitle?: string,
	score: number
	_id?: string
	isUser: undefined | true
	color: string
	backgroundColor: string
}

export const poll_question_list = groq`
*[_type == 'pollQuestion' && (!defined(hidden) || !hidden) && (dateTime(${DATE_DST_OFFSET}) - dateTime(now()) < 0)] | order(date desc) {
    ...,
    responses[] {
        responseSlug,
        responseText,
        "responseCount": count(listOfResponders)
    },
    "suggestedBy": suggestedBy->{"joinedTitle": title.profession + " " + title.qualifier}.joinedTitle,
    "userResponse": responses[length(listOfResponders[_ref == $userId]) > 0][0].responseSlug.current
}
`

export const user_dashboard_information = groq`
*[_id == $userId ][0] {
    _id,
    email,
    name,
    isPolledDaily,
    theme,
    title {
        profession,
        qualifier
    }
}`
export type UserRecord = {
	_id: string
	email: string
	name?: string
	isPolledDaily?: boolean
	title?: {
		profession?: string
		qualifier?: string
	}
	theme?: PreferenceTheme
}
