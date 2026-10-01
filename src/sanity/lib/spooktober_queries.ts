import { groq } from "next-sanity";
import { meme_fields, PollQuestion_t, pollQuestionFragment } from '../types/documents'
import { DATE_DST_OFFSET } from "./queries";

export const latest_meme = groq`
    *[_type == 'meme' && (dateTime(${DATE_DST_OFFSET}) - dateTime(now()) < 0)] | order(date desc)[0] {
        ${meme_fields}
    }
`

export const meme_by_slug = groq`*[_type == 'meme' && slug.current == $cslug][0]`

export const meme_by_date = groq`
*[_type == 'meme' && date == $date][0] {
    ${meme_fields}
}`

export const todays_meme_by_date = groq`
*[_type == 'meme' && date == $date] | order(date desc)[0] {
    "imgAsset": mainImage.asset->{
        mimeType,
        url,
        extension
    },
    "videoAsset": video.asset->{
        mimeType,
        extension,
        url
    },
    "cslug": slug.current,
    youtubeURL,
    date,
    "pollQuestion": ${pollQuestionFragment}
}
`

export const todays_meme = groq`
*[_type == 'meme' && date < now()] | order(date desc)[0] {
    "imgAsset": mainImage.asset->{
        mimeType,
        url,
        extension
    },
    "videoAsset": video.asset->{
        mimeType,
        extension,
        url
    },
    "cslug": slug.current,
    youtubeURL,
    date,
    "pollQuestion": ${pollQuestionFragment}
}
`
export type EmailableMeme = {
  imgAsset: {
    mimeType: string,
    url: string,
    extension: string
  },
  videoAsset: {
    mimeType: string,
    extension: string,
    url: string
  },
  cslug: string,
  youtubeURL: string,
  date: string,
  pollQuestion: PollQuestion_t | undefined
}
