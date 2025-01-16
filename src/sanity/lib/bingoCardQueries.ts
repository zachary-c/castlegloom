import { ImageAsset } from "sanity"

export type BingoSupport_t = {
    description : string
    image : ImageAsset,
    date : Date
}
export type BingoSquare_t = {
    label : string
    shortLabel : string
    threshold : number
    support : BingoSupport_t[]
}
export type BingoCard_t = {
    ownerName : string
    slug : { current : string }
    row1 : BingoSquare_t[]
    row2 : BingoSquare_t[]
    row3 : BingoSquare_t[]
    row4 : BingoSquare_t[]
    row5 : BingoSquare_t[]
}

export const bingoCardQuery = `
    *[_type == 'bingoCard'] {
        ...
    }[0]
`