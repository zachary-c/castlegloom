import { avenir } from "_styles/fonts";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
        <div className="wallpaper__overlay page central medium" style={{['--avenir' as any]: avenir.style.fontFamily}}>
            <header>
                <h1>Castle Gloom</h1>
            </header>
            <main className="central-section">
                <section>
                    <h2>Projects</h2>
                    <ul className="list-grid">
                        <li>
                            <Link href="/poll">
                                <Image src={`/july_poll.png`} className="full-width top shaded" width={540} height={318} alt={'Poll Box'} />
                                <span>Polling</span>
                            </Link>

                        </li>
                        <li>
                            <Link href="/steamhash">
                                <Image src={`/steem.png`} width={272} height={102} className="center--top shaded--light" alt={'Legally distinct Steem logo'} />
                                <span>Steamhash</span>
                            </Link>
                        </li>{/* 
                        <li>
                            <Link href="/spooktober">
                                <Image src={`/spookin_light_transparent.png`} className="center--top squareish" width={372} height={355} alt={'Spooky Pumpkin'} />
                                <span>Spooktober</span>
                            </Link>
                        </li> */}
                        <li>
                            <Link href="/strats">
                                <Image src={`/cs2.png`} className="full-width shaded" width={512} height={512} alt={'CS2 Logo'} />
                                <span>CS2 Strats</span>
                            </Link>
                        </li>
                    </ul>
                    <p>
                        The polling project has now been providing a daily poll question for over 8 months! The Steamhash and CS2 Strats projects simply happened of their own accord, and live here as well.
                    </p>
                </section>
                <section>
                    <h2>The Sites</h2>
                    <ul className="list-grid">
                        <li className="background--white">
                            <Link href="https://www.kingdommowing.com/" title={"Kingdom Keepers\' Grow & Mow"}>
                                <Image src={`/kingdomkeepers_black.webp`} width={600} height={151} className="center--top infront" alt={'Kingdom Keepers\' Grow & Mow'} />
                                <Image src={`/kingdomkeepers.webp`} width={600} height={151} className="center--top" alt={'Kingdom Keepers\' Grow & Mow'} />
                            </Link>
                        </li>
                        <li className="background--white">
                            <Link href="https://www.meadhardacre.com/" title="Mead Hardacre Portfolio">
                                <Image src={`/mh.svg`} className="squareish--plus center infront" width={225} height={225} alt={'Mead Hardacre\'s Wordmark'} />
                                <Image src={`/mh_2.svg`} className="squareish--plus center" width={225} height={225} alt={'Mead Hardacre\'s Wordmark'} />
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.rwbb.org" title={"Red-winged Black Birds"}>
                                <Image src={`/rwbb_shaded.png`} className="full-width infront" width={512} height={341} alt={'Red-winged Black Birds'} />
                                <Image src={`/rwbb_look.png`} className="full-width" width={512} height={341} alt={'Red-winged Black Birds'} />
                            </Link>
                        </li>
                    </ul>
                    <p>Independent web development is a thing that I do for others and for fun sometimes. If you have a project you&apos;d like to discuss, feel free to reach out!</p>
                </section>
                <section>

                <h2>Ideas</h2>
                    <ul>
                        <li>Chess With Powerups</li>
                        <li>Phone App for Polls</li>
                        <li>Soundboard (Soon™)</li>
                        <li>Svelte Web Dev???</li>
                        <li>Bingo</li>
                        <li>Contact form for this website</li>
                    </ul>
                    <p>This list will be updated as I complete projects and come up with new ideas.</p>
                </section>
            </main>
            <footer>
                <span className="copyright">
                    &copy; Castle Gloom 2025 
                </span>
                <span>|</span>
                <span className="siteby">
                    Site by zhc
                </span>
            </footer>
            <div className="spacer"></div>
        </div>
  );
}
