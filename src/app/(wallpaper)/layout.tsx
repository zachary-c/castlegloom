import "_styles/page.scss";
import "_styles/listgrid.scss"
import Image from "next/image";
import { ReactElement } from "react";

export default function Layout({ children } : { children : ReactElement[] }) {
  return (
    <html lang="en" className="layout--wallpaper">
        <body> 
            <div className="wallpaper__wrapper">
                <Image src={"/castle_16-9.webp"} alt="Landscape view of castles," width={1696} height={954}/>
            </div>
            {children}
        </body>
    </html>
  );
}
