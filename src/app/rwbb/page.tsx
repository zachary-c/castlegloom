import { client } from "$/lib/client"
import "@/rwbb/rwbb.scss"
import RWBBLookup from "./components/RWBBLookup"

export default async function Page() {

    const records = await client.fetch(`*[_type == "rwbbRecord"]`)
    console.log('records', records)
    return <>
        <div className="intro">
            <h1><span style={{fontSize: '9.5rem', lineHeight: '.8'}}><b>R</b>ED</span>
            <span style={{fontSize: '4.3rem'}}><b>W</b>INGED</span>
            <span style={{fontSize: '2.8rem', lineHeight: '.8'}}><b className="orange">B</b>LACK <b className="orange">B</b>IRDS</span>
            </h1>
            <p className="">
                Welcome to the RWBB tracking website!
            </p>
            <p>
                Some people are into birdwatching for avian diversity -- they want to find the rarest and most unique birds in all the land. High and low, near and far, whether clearly up close or glimpsed from a distance, these enthusiasts long to find and describe their excitement at sighting the most exotic birds around.
            </p>
            <p>
                However, others have a simpler interest. Why go for quality when you can go for quantity?
            </p>
            <blockquote>
                "I fear not the man who has seen 10,000 birds once, but I fear the man who has seen one bird 10,000 times."
                <span className="quote-attr">
                    - Bruce Lee, probably
                </span>
            </blockquote>
            <p>
                This website is for RWBB enthusiasts to keep and share their lifetime count.
            </p>
        </div>
        <RWBBLookup staticRecords={records} />
        <div className="">
            <h2>
                Top Counters
            </h2>
            <ul>

            </ul>
        </div>
    </>
}