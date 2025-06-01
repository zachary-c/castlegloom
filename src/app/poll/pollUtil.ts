
export type Theme = 'november' | 'october-dark' | 'october-light' | 'wireframe' | 'january' | 'december-light' | 'december-dark' | 'february-light' | 'march-light' | 'march-dark' | 'april-light' | 'may-dark' | 'june-light'

export const theme : Theme = 'june-light'

export const STANDARDS = {
    white: '#fff',
    black: '#000' 
}
// January Theme Colors
export const THEME_JAN = {
    walnutBrown: "#5c574f",
    blackOlive: "#48483a",
    jasper: "#d66853",
    bone: "#d1d3c4",
    platinum: "#dfe0dc",
}

export const THEME_FEB_LIGHT = {
    blush: '#db5375',
    snow: '#f7f0f0',
    electricBlue: '#8af3ff',
    chefchaouenBlue: '#3f8efc',
    prussianBlue: `#0b3142`,
    uranianBlue: '#b1ddf2'
}
export const THEME_MARCH_LIGHT = {
    springGreen: '#92e464',
    bakerMiller: '#fa91b2',
    columbiaBlue: '#c4d1d7',
    officeGreen: '#276904',
    lapisLazuli: `#1f6898`,
    kellyGreen: '#40a505'
}
export const THEME_APRIL_LIGHT = {
    periwinkle: "#B7B1F2",
    lavenderPink: "#fdb7ea",
    paleDogwood: "#ffdccc",
    vanillaIce: "#fbf3b9",
    lightGreen: "#B4FFAB",
    paynesGray: '#536271',
    robinsEgg: '#1ae3e3'
}
export const THEME_MAY_DARK = {
    bittersweet: "#ff5e5b",
    mistyRose: "#f1dede",
    claret: "#6e0d25",
    saffron: "#f9c22e",
    charcoal: "#424c55",
}
export const THEME_JUNE_LIGHT = {
    icterine: "#FFFA71",
    airSuperiority: "#4DA5E0",
    earthYellow: "#FFAE36",
    flame: "#DD6031",
    blackOlive2: "#2E382E",
}

export const emailFrom = `Castle Gloom Census <${process.env.ORACLE_LOGIN}>`

export function randomInRange(min : number, max : number) {
    return Math.floor(Math.random() * max) + min; 
}
export const emailRegex = new RegExp(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi)
