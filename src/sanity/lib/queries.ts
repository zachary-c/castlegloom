import { groq } from "next-sanity";
import { meme_fields } from '../types/documents'

export const page_by_slug = groq`
    *[_type == 'page' && slug.current == $cslug][0]
`
export const page_slugs = groq`
    *[_type == 'page'] {
        "cslug": slug.current
    }
`

export const meme_by_slug = groq`
    *[_type == 'meme' && slug.current == $cslug][0]
`
export const meme_by_date = groq`
    *[_type == 'meme' && date == $date][0] {
        ${meme_fields}
    }
    `
export const latest_meme = groq`
    *[_type == 'meme' && date < $now] | order(date desc)[0] {
        ${meme_fields}
    }
`
export const recipient_list = groq`
    *[_type == 'recipient'] {
        email
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
    youtubeURL: string
}