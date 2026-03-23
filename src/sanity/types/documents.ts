import { PortableTextBlock } from "sanity"
import { QuestionPrompt_t } from "$/schemaTypes/questionObjects/questionPrompt"
import { KingsEdict_t } from "$/schemaTypes/edict"
import { ImageAlt } from "$/schemaTypes/imageAlt"
import { QuestionCorrespondence_t } from "$/schemaTypes/questionObjects/questionCorrespondence"

export type Page_t = {
	title: string
	cslug: string
	content: PortableTextBlock[]
}
export interface ResponseMechanism {
	_key: string
	responseSlug: { current: string }
	responseCount: number
	listOfResponders?: ({ _key: string, _ref: string })[]
}
export type PollResponse_t = ResponseMechanism & {
	responseText: string
}
export type ResponseRichText_t = ResponseMechanism & {
	content: PortableTextBlock[]
}
export type ResponseImage_t = ResponseMechanism & {
	hoverTitle: string
	img: ImageAlt
}

export type PollQuestion_t = {
	_id: string
	title: string
	date: string
	prompt?: QuestionPrompt_t
	correspondence?: QuestionCorrespondence_t
	hasBeenSent: boolean
	hidden: boolean
	suggestedBy: string
	edict: KingsEdict_t
	userResponse?: string

	// deprecated: shouldn't be used for new code
	questionText: string
	responses?: PollResponse_t[]
}

export type Meme_t = {
	title: string
	cslug: string
	mainImageURL: string
	date: string
	videoURL: string
	videoType: string
	youtubeURL: string
	pollQuestion: PollQuestion_t
}
export const pollQuestionFields = `
    ...,
    responses[] {
        "responseCount": count(listOfResponders),
        responseSlug,
        responseText
    },
	"correspondence": correspondence {
		...,
	},
	"prompt": prompt {
		...,
		"richTextAsPlaintext": pt::text(richTextPrompt)
	},
    "suggestedBy": suggestedBy->{"joinedTitle": title.profession + " " + title.qualifier}.joinedTitle,
	"edict": edict->{ 
        edictNumber,
        edictBody,
        date,
        edictHeading,
		colorscheme
	}
`
export const pollQuestionFragment = `question->{
        ${pollQuestionFields}
    }
`
export const meme_fields = `
    title,
    "cslug": slug.current,
    "mainImageURL": mainImage.asset->url,
    "videoURL": video.asset->url,
    videoType,
    date,
    youtubeURL,
    "pollQuestion": ${pollQuestionFragment}
    `
