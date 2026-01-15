import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Steamhash | Castle Gloom",
	description: 'A tool for deciding what to play with your friends, by determining what steam games you all have in common.'
};

export default function SteamhashLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return children
}
