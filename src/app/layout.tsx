import type { Metadata } from "next";
import "./globals.css";
import { inter, konkhmerSleokchher } from "../../public/fonts/fonts";

export const metadata: Metadata = {
	title: "Gynocare",
	icons: {
		icon: "/favicon.ico",
	},
	description: "Clínica especializada em exames e consultas",
	keywords: ["ginecologia", "exames", "consultas", "ultrassom"],
	authors: [
		{
			name: "Gynocare",
		},
	],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="pt" className={`${inter.variable} ${konkhmerSleokchher.variable}`} suppressHydrationWarning>
			<body>{children}</body>
		</html>
	);
}
