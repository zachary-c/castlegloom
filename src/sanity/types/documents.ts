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
    listOfResponders : ({ _key : string, _ref : string })[]
}

export type PollQuestion_t = {
    _id : string
    questionText : string
    title : string
    responses : PollResponse_t[]
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
export const pollQuestionFragment = `question->{
        ...,
        responses[] {
          ...,
        }
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