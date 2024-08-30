import { defineField, defineType } from "sanity";
// caps lock variants 
// qwertyuiopasdfghjklzxcvbnm
// QWERTYUIOPASDFGHJKLZXCVBNM
// no shift
// []\;',./1234567890-=
// numpad:
// /*-789+4561230.
// up down left right 
// function keys? unclear
// shift left shift right
// ctrl left ctrl right
// meta left meta right
// 

export default defineType({
    name: 'soundPreset',
    title: 'Soundboard Preset',
    type: 'document',
    groups: [
        {
            name: "number_row",
            title: "Number Row"
        },
        {
            name: 'first_row',
            title: "First Row"
        },
        {
            name: 'second_row',
            title: "Second Row"
        },
        {
            name: "third_row",
            title: "Third Row"
        }
    ],
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
            },
            validation: (Rule: any) => Rule.required(),
        }),

        defineField({
            name: 'Backquote',
            title: 'Key: `',
            type: 'sound',
            group: 'number_row'
        }),
        defineField({
            name: 'Digit1',
            title: 'Key: 1',
            type: 'sound',
            group: 'number_row'
        }),
        defineField({
            name: 'Digit2',
            title: 'Key: 2',
            type: 'sound',
            group: 'number_row'
        }),
        defineField({
            name: 'Digit3',
            title: 'Key: 3',
            type: 'sound',
            group: 'number_row'
        }),
        defineField({
            name: 'Digit4',
            title: 'Key: 4',
            type: 'sound',
            group: 'number_row'
        }),
        defineField({
            name: 'Digit5',
            title: 'Key: 5',
            type: 'sound',
            group: 'number_row'
        }),
        defineField({
            name: 'Digit6',
            title: 'Key: 6',
            type: 'sound',
            group: 'number_row'
        }),
        defineField({
            name: 'Digit7',
            title: 'Key: 7',
            type: 'sound',
            group: 'number_row'
        }),
        defineField({
            name: 'Digit8',
            title: 'Key: 8',
            type: 'sound',
            group: 'number_row'
        }),
        defineField({
            name: 'Digit9',
            title: 'Key: 9',
            type: 'sound',
            group: 'number_row'
        }),
        defineField({
            name: 'Digit0',
            title: 'Key: 0',
            type: 'sound',
            group: 'number_row'
        }),
        defineField({
            name: 'Minus',
            title: 'Key: -',
            type: 'sound',
            group: 'number_row'
        }),
        defineField({
            name: 'Equal',
            title: 'Key: =',
            type: 'sound',
            group: 'number_row'
        }),


        // first row
        defineField({
            name: 'KeyQ',
            title: 'Key: Q',
            type: 'sound',
            group: 'first_row'
        }),
        defineField({
            name: 'KeyW',
            title: 'Key: W',
            type: 'sound',
            group: 'first_row'
        }),
        defineField({
            name: 'KeyE',
            title: 'Key: E',
            type: 'sound',
            group: 'first_row'
        }),
        defineField({
            name: 'KeyR',
            title: 'Key: R',
            type: 'sound',
            group: 'first_row'
        }),
        defineField({
            name: 'KeyT',
            title: 'Key: T',
            type: 'sound',
            group: 'first_row'
        }),
        defineField({
            name: 'KeyY',
            title: 'Key: Y',
            type: 'sound',
            group: 'first_row'
        }),
        defineField({
            name: 'KeyU',
            title: 'Key: U',
            type: 'sound',
            group: 'first_row'
        }),
        defineField({
            name: 'KeyI',
            title: 'Key: I',
            type: 'sound',
            group: 'first_row'
        }),
        defineField({
            name: 'KeyO',
            title: 'Key: O',
            type: 'sound',
            group: 'first_row'
        }),
        defineField({
            name: 'KeyP',
            title: 'Key: P',
            type: 'sound',
            group: 'first_row'
        }),
        defineField({
            name: 'BracketLeft',
            title: 'Key: [',
            type: 'sound',
            group: 'first_row'
        }),
        defineField({
            name: 'BracketRight',
            title: 'Key: ]',
            type: 'sound',
            group: 'first_row'
        }),
        defineField({
            name: 'Backslash',
            title: 'Key: \\',
            type: 'sound',
            group: 'first_row'
        }),

        // second row
        defineField({
            name: 'KeyA',
            title: 'Key: A',
            type: 'sound',
            group: "second_row"
        }),
        defineField({
            name: 'KeyS',
            title: 'Key: S',
            type: 'sound',
            group: "second_row"
        }),
        defineField({
            name: 'KeyD',
            title: 'Key: D',
            type: 'sound',
            group: "second_row"
        }),
        defineField({
            name: 'KeyF',
            title: 'Key: F',
            type: 'sound',
            group: "second_row"
        }),
        defineField({
            name: 'KeyG',
            title: 'Key: G',
            type: 'sound',
            group: "second_row"
        }),
        defineField({
            name: 'KeyH',
            title: 'Key: H',
            type: 'sound',
            group: "second_row"
        }),
        defineField({
            name: 'KeyJ',
            title: 'Key: J',
            type: 'sound',
            group: "second_row"
        }),
        defineField({
            name: 'KeyK',
            title: 'Key: K',
            type: 'sound',
            group: "second_row"
        }),
        defineField({
            name: 'KeyL',
            title: 'Key: L',
            type: 'sound',
            group: "second_row"
        }),
        defineField({
            name: 'Semicolon',
            title: 'Key: Semicolon (;)'  ,
            type: 'sound',
            group: "second_row"
        }),
        defineField({
            name: 'Quote',
            title: "Key: Single Quote (')",
            type: 'sound',
            group: "second_row"
        }),

        // third row
        defineField({
            name: 'KeyZ',
            title: 'Key: Z',
            type: 'sound',
            group: "third_row"
        }),
        defineField({
            name: 'KeyX',
            title: 'Key: X',
            type: 'sound',
            group: "third_row"
        }),
        defineField({
            name: 'KeyC',
            title: 'Key: C',
            type: 'sound',
            group: "third_row"
        }),
        defineField({
            name: 'KeyV',
            title: 'Key: V',
            type: 'sound',
            group: "third_row"
        }),
        defineField({
            name: 'KeyB',
            title: 'Key: B',
            type: 'sound',
            group: "third_row"
        }),
        defineField({
            name: 'KeyN',
            title: 'Key: N',
            type: 'sound',
            group: "third_row"
        }),
        defineField({
            name: 'KeyM',
            title: 'Key: M',
            type: 'sound',
            group: "third_row"
        }),
        defineField({
            name: 'Comma',
            title: 'Key: Comma (,)',
            type: 'sound',
            group: "third_row"
        }),
        defineField({
            name: 'Period',
            title: 'Key: Period (.)',
            type: 'sound',
            group: "third_row"
        }),
        defineField({
            name: 'Slash',
            title: 'Key: Forward Slash (/)'  ,
            type: 'sound',
            group: "third_row"
        }),
    ],
})

export type Sound_t = {
    url : string
    filename : string
    key : string
}

export type SoundPreset = {

    // number row
    Backquote : Sound_t
    Digit1 : Sound_t
    Digit2 : Sound_t
    Digit3 : Sound_t
    Digit4 : Sound_t
    Digit5 : Sound_t
    Digit6 : Sound_t
    Digit7 : Sound_t
    Digit8 : Sound_t
    Digit9 : Sound_t
    Digit0 : Sound_t
    Minus : Sound_t
    Equal : Sound_t

    KeyQ : Sound_t
    KeyW : Sound_t
    KeyE : Sound_t
    KeyR : Sound_t
    KeyT : Sound_t
    KeyY : Sound_t
    KeyU : Sound_t
    KeyI : Sound_t
    KeyO : Sound_t
    KeyP : Sound_t
    BracketLeft : Sound_t
    BracketRight : Sound_t
    Backslash : Sound_t

    KeyA : Sound_t
    KeyS : Sound_t
    KeyD : Sound_t
    KeyF : Sound_t
    KeyG : Sound_t
    KeyH : Sound_t
    KeyJ : Sound_t
    KeyK : Sound_t
    KeyL : Sound_t
    Semicolon : Sound_t
    Quote : Sound_t

    // third row
    KeyZ : Sound_t
    KeyX : Sound_t
    KeyC : Sound_t
    KeyV : Sound_t
    KeyB : Sound_t
    KeyN : Sound_t
    KeyM : Sound_t
    Comma : Sound_t
    Period : Sound_t
    Slash : Sound_t
}