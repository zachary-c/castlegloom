'use client'
import React, { useEffect } from 'react'
import { Meme_t } from '../sanity/types/documents';
import './spooktober/styles/memeContainer.scss'

export default function VideoWrapper({meme} : {meme : Meme_t}) {    
    const videoRef = React.useRef<HTMLVideoElement>(null);

    useEffect(() => { 
        if (videoRef.current) {
            videoRef.current.volume = 0.5;
        }
    })
    return (
        <video controls height='600' title={meme.title} ref={videoRef}>
            <source src={meme.videoURL} type={meme.videoType} />
        </video>
    )
}