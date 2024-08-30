import { client } from "$/lib/client";
import { soundPresetQuery } from "$/lib/queries";
import Soundboard from "R/src/components/Soundboard";

export default async function Page() {

    const data = await client.fetch(soundPresetQuery, {}, { cache: 'no-store'});
    console.log("data", data)

    return <Soundboard preset={data} />

}