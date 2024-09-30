import React from 'react'
import { client } from '../../../sanity/lib/client'
import { page_by_slug, page_slugs } from '../../../sanity/lib/queries'
import { Page_t } from '../../../sanity/types/documents'
import { notFound } from 'next/navigation'

export const dynamic = "force-static";

export async function generateStaticParams() {
    const pages = await client.fetch(page_slugs);

    return pages.map((page : {slug : string}) => ({
        cslug: page.slug
    }));
}

export default async function Page({params} : {params : {cslug : string}}) {

    const data : Page_t = await client.fetch(page_by_slug, {cslug: params.cslug})
    if (!data) notFound();
    console.log(data);
    return (
        <>
            <h1>Hello and welcome to page: {data.title}</h1>
        </>
    )
}

// homepage has meme of the day
// gallery page has all the memes -- links to memes or grid? unclear
