import { PortableTextBlock } from "sanity"

export type Page_t = {
    title : string
    cslug : string
    content : PortableTextBlock[]
}

export type Meme_t = {
    title : string
    cslug : string
    mainImageURL : string
    date : string
    videoURL : string
    videoType : string
    youtubeURL : string
}

export const meme_fields = `
    title,
    "cslug": slug.current,
    "mainImageURL": mainImage.asset->url,
    "videoURL": video.asset->url,
    videoType,
    date,
    youtubeURL
`
