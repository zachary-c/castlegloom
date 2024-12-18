import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Castle Gloom"
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return <>
        <Script async src="https://campbell-umami.vercel.app/script.js" data-website-id="0c767cfd-fb2d-48bc-89b5-54de8afad835" />
        {children}
  </>
  ;
}
