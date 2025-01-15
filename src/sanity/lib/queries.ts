import { groq } from "next-sanity";
import { meme_fields, PollQuestion_t, pollQuestionFields, pollQuestionFragment } from '../types/documents'

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
export const latest_poll = groq`
    *[_type == 'pollQuestion'  && (dateTime(date + "T00:00:00-06:00") - dateTime(now()) < 0)] | order(date desc)[0] {
        ${pollQuestionFields}
    }
`
export const poll_by_date = groq`
*[_type == 'pollQuestion' && date == $date][0] {
        ${pollQuestionFields}
    }
    `
export const poll_date_surrounding = groq`{
    "today": ${poll_by_date},
    "yesterday": *[_type == 'pollQuestion' && date == $previous][0] {
        _id
    },
    "tomorrow": *[_type == 'pollQuestion' && date == $nextPoll][0] {
        _id
    }
}
`
export const poll_latest_surrounding = groq`{
    "today": *[_type == 'pollQuestion' && (dateTime(date + "T00:00:00-06:00") - dateTime(now()) < 0)] | order(date desc)[0] {
        ${pollQuestionFields}
    },
    "previous": *[_type == 'pollQuestion' && (dateTime(date + "T00:00:00-06:00") - dateTime(now()) < 0)] | order(date desc)[1] {
        _id
    }
}
`

export const poll_question_list = groq`
*[_type == 'pollQuestion' && (dateTime(date + "T00:00:00-06:00") - dateTime(now()) < 0)] | order(date desc) {
    ...,
    responses[] {
        ...,
        responseSlug,
        responseText,
        "responseCount": count(listOfResponders)
    }
}
`

export const user_dashboard_information = groq`
*[_id == $userid ][0] {
    _id,
    email,
    isPolledDaily,
    chosenTitle
}`
export type RecipientInfo = {
    _id : string
    email : string
    isPolledDaily? : boolean 
    chosenTitle? : string
}
export const latest_meme = groq`
    *[_type == 'meme' && date < $now] | order(date desc)[0] {
        ${meme_fields}
    }
`
export const recipient_list = groq`
    *[_type == 'recipient'] {
        _id,
        email
    }
`
export const daily_polled = groq`
    *[_type == 'recipient' && isPolledDaily] {
        _id,
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
    date : string,
    pollQuestion : PollQuestion_t | undefined
}

function keyFragment(name : string) {
    return groq`{
        "key": "${name}",
        "url": soundfile.asset->url,
        "filename": soundfile.asset->originalFilename
    }`
}

export const soundPresetQuery = groq`
*[_type == 'soundPreset'][0] {
    "Backquote": Backquote ${keyFragment("Backquote")},
    "Digit1": Digit1 ${keyFragment("Digit1")},
    "Digit2": Digit2 ${keyFragment("Digit2")},
    "Digit3": Digit3 ${keyFragment("Digit3")},
    "Digit4": Digit4 ${keyFragment("Digit4")},
    "Digit5": Digit5 ${keyFragment("Digit5")},
    "Digit6": Digit6 ${keyFragment("Digit6")},
    "Digit7": Digit7 ${keyFragment("Digit7")},
    "Digit8": Digit8 ${keyFragment("Digit8")},
    "Digit9": Digit9 ${keyFragment("Digit9")},
    "Digit0": Digit0 ${keyFragment("Digit0")},
    "Minus": Minus ${keyFragment("Minus")},
    "Equal": Equal ${keyFragment("Equal")},

    "KeyQ": KeyQ ${keyFragment("KeyQ")},
    "KeyW": KeyW ${keyFragment("KeyW")},
    "KeyE": KeyE ${keyFragment("KeyE")},
    "KeyR": KeyR ${keyFragment("KeyR")},
    "KeyT": KeyT ${keyFragment("KeyT")},
    "KeyY": KeyY ${keyFragment("KeyY")},
    "KeyU": KeyU ${keyFragment("KeyU")},
    "KeyI": KeyI ${keyFragment("KeyI")},
    "KeyO": KeyO ${keyFragment("KeyO")},
    "KeyP": KeyP ${keyFragment("KeyP")},
    "BracketLeft": BracketLeft ${keyFragment("BracketLeft")},
    "BracketRight": BracketRight ${keyFragment("BracketRight")},
    "Backslash": Backslash ${keyFragment("Backslash")},

    // second row
    "KeyA": KeyA ${keyFragment("KeyA")},
    "KeyS": KeyS ${keyFragment("KeyS")},
    "KeyD": KeyD ${keyFragment("KeyD")},
    "KeyF": KeyF ${keyFragment("KeyF")},
    "KeyG": KeyG ${keyFragment("KeyG")},
    "KeyH": KeyH ${keyFragment("KeyH")},
    "KeyJ": KeyJ ${keyFragment("KeyJ")},
    "KeyK": KeyK ${keyFragment("KeyK")},
    "KeyL": KeyL ${keyFragment("KeyL")},
    "KeyM": KeyM ${keyFragment("KeyM")},
    "Semicolon": Semicolon ${keyFragment("Semicolon")},
    "Quote": Quote ${keyFragment("Quote")},

    // third row
    "KeyZ": KeyZ ${keyFragment("KeyZ")},
    "KeyX": KeyX ${keyFragment("KeyX")},
    "KeyC": KeyC ${keyFragment("KeyC")},
    "KeyV": KeyV ${keyFragment("KeyV")},
    "KeyB": KeyB ${keyFragment("KeyB")},
    "KeyN": KeyN ${keyFragment("KeyN")},
    "KeyM": KeyM ${keyFragment("KeyM")},
    "Comma": Comma ${keyFragment("Comma")},
    "Period": Period ${keyFragment("Period")},
    "Slash": Slash ${keyFragment("Slash")},
}
`