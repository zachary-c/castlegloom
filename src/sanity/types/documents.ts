import { PortableTextBlock } from "sanity"

export type Page_t = {
    title : string
    cslug : string
    content : PortableTextBlock[]
}

export type PollResponse_t = {
    _key : string
    responseSlug : { current : string }
    responseText : string
    responseCount : number
    listOfResponders? : ({ _key : string, _ref : string })[]
}

export type PollQuestion_t = {
    _id : string
    questionText : string
    title : string
    responses : PollResponse_t[]
    date : string
    hasBeenSent : boolean
}

export type Meme_t = {
    title : string
    cslug : string
    mainImageURL : string
    date : string
    videoURL : string
    videoType : string
    youtubeURL : string
    pollQuestion : PollQuestion_t
}
export const pollQuestionFields = `
    ...,
    responses[] {
        "responseCount": count(listOfResponders),
        responseSlug,
        responseText
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