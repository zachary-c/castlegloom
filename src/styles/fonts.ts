import localFont from 'next/font/local'

export const avenir = localFont({
    src: [
        {
            path: './avenir-font/AvenirLTStd-Light.otf',
            weight: '300'
        },
        {
            path: './avenir-font/AvenirLTStd-Medium.otf',
            weight: '500'
        },
        {
            path: './avenir-font/AvenirLTStd-Heavy.otf',
            weight: '600'

        }
    ]
})
