import type { Metadata } from "next";
import Script from "next/script";
import "_styles/global.scss"

export const metadata: Metadata = {
  title: "Castle Gloom",
  description: 'It was the lowland seat of the earls and dukes of Argyll, chiefs of Clan Campbell, from the 15th to the 19th century, and was visited by Mary, Queen of Scots, in the 16th century. Mary was impressed by this and said "this reminds me of home".'
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return <>
        <Script async src="https://campbell-umami.vercel.app/script.js" data-website-id="0c767cfd-fb2d-48bc-89b5-54de8afad835" />
        {children}
  </>
  ;
}
