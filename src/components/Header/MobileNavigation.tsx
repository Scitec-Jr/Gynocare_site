"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { navigationLinks } from "./navigationLinks";

export default function MobileNavigation() {
	const [open, setOpen] = useState(false);

	return (
		<nav className="relative flex items-center gap-4 w-full p-4 md:px-8 bg-white text-(--main-color) title lg:hidden shadow-md">
			<div className="mr-auto">
				<Image src="/assets/global/logo.png" alt="Gynocare" width={200} height={100} />
			</div>

			<button onClick={() => setOpen(!open)} className="relative right-4 w-8 h-8 cursor-pointer z-20" aria-label="Menu">
				<span className={`absolute left-1 h-0.5 w-6 transition-all ${open ? "rotate-45 top-1/2 bg-white" : "top-2 bg-(--main-dark-color)"}`} />

				<span className={`absolute left-1 top-4 h-0.5 w-6 bg-(--main-dark-color) transition-all ${open ? "opacity-0" : ""}`} />

				<span className={`absolute left-1 h-0.5 w-6 transition-all ${open ? "-rotate-45 top-1/2 bg-white" : "top-6 bg-(--main-dark-color)"}`} />
			</button>

			<div className={`absolute top-0 right-0 z-10 h-screen w-80 pt-20 p-8 bg-(--main-dark-color) text-white transform transition-transform ${open ? "translate-x-0" : "translate-x-full"}`}>
				{navigationLinks.map((link) => (
					<Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="block py-4">
						{link.label}
					</Link>
				))}
			</div>
		</nav>
	);
}
