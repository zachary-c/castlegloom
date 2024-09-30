import React from 'react'
import { Meme_t } from '../sanity/types/documents';
import Image from 'next/image';
import './spooktober/styles/memeContainer.scss'
import { suffix } from '../../util';
import VideoWrapper from './VideoWrapper';

export default function MemeContainer({meme} : {meme : Meme_t}) {
    
    //const date = new Date(meme.date);
    const month = parseInt(meme.date.slice(5, 7)) == 10 ? "October" : "November"
    //console.log(meme.date.slice(5, 7));
    const day = parseInt(meme.date.slice(8))
    let memoriam = false;
    if (day == 10) {
        memoriam = true;
    }
    //console.log(meme.date)

    return (
        <div className='meme-container'>
            {meme.mainImageURL &&
            <>
                <Image src={meme.mainImageURL} title={meme.title} alt={meme.title} width={500} height={500} />
                {memoriam &&
                    <a className='external memoriam' href="https://www.legacy.com/us/obituaries/name/christian-oswalt-obituary?id=36784490">In Memory</a>
                }
            </>
            }
            {meme.videoURL &&
                <VideoWrapper meme={meme}/>
            }
            {meme.youtubeURL &&
                <iframe width="840" height="473" src={meme.youtubeURL} title={meme.title} allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" frameBorder={0}></iframe>
            }
            <span>{`${month} ${day}${suffix(day)}, ${meme.date.slice(0, 4)}`}</span>
        </div>
    )
}