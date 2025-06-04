import { ReactElement } from "react";

export default function Layout({ children } : { children : ReactElement}) {
    return <html>
        <body className="rwbb">
            {children}
        </body>
    </html>
}