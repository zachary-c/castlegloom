import "R/src/styles/page.scss";
import Link from "next/link";

export default function Home() {
  return (
    <html lang="en" className="root-layout">
        <body> 
            <main className="homepage">
                <h1>Castle Gloom</h1>
                <Link href="/poll/signup" style={{
                    width: '100%', 
                    textAlign: 'center',
                    display: 'block',
                    fontSize: '1.2rem'
                    
                    }}>SIGN UP FOR POLLS</Link>
                <p>With the success and silliness of my first domain (spook-tober.com) and the project it hosted, I found myself in pursuit of a new internet home. There were three basic criteria:</p>
                <ol>
                    <li>It shouldn&apos;t contain hyphens -- it must be a recognizable word or two.</li>
                    <li>It should be something reasonable enough that it could be given in a professional context as an example of my web development work.</li>
                    <li>It should be related to me, in some way, shape or form.</li>
                </ol>
                <p>
                    Satisfying these three conditions, in particular the latter two, turned out to be a difficult task. 
                    I played around with various references and ideas -- perhaps a video game I greatly enjoyed or some other piece of media. 
                    One strong candidate for a time was hyperionactual.com -- which while potentially difficult to spell is be two reasonably common words, and a <a href="https://www.youtube.com/watch?v=haMc_eebx9o">Starcraft voice line</a>.   
                </p>
                <p>
                    However, when I came across the ancestral home of the clan, Castle Campbell, and <a href="https://en.wikipedia.org/wiki/Castle_Campbell">learned that it had once been called Castle Gloom</a> (or Castle Glume, as some
                    articles suggest) I was confident it would be a good fit. Two recognizable English words, eleven characters, and relevant. The area it most struggles is the second
                    criteria, of being reasonable in a professional context. I trust employers will forgive me if they find it silly.
                </p>
                <p>Currently, this website hosts only the Spooktober project from last year. This is both an archive and host to entries for this October. You can find it <Link href="/spooktober">here</Link>.</p>
                        
                {/* <a href="/soundboard">Soundboard</a> */}
            </main>
        </body>

    </html>
  );
}
