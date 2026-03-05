"use client";

import Image from "next/image";
import { useState } from "react";

export default function DropdownFAQ({ title, answers }: { title: string; answers: string[] }) {
	const [open, setOpen] = useState(false);

	return (
		<div className="mb-8 rounded-xl shadow-md overflow-hidden">
			<div onClick={() => setOpen(!open)} className="relative p-4 pe-12 bg-(--main-color) text-white text-xl font-bold text-center cursor-pointer">
				{title}
                <Image src="/assets/icons/arrow-down.png" alt="Seta para baixo" width={14} height={14} className={`absolute right-4 sm:right-10 top-1/2 transform -translate-y-1/2 transition-transform duration-300 ease-in-out ${open ? "rotate-180" : "rotate-0"}`}/>
			</div>

			<div className={`grid transition-all duration-300 ease-in-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
				<div className="p-4 bg-zinc-100 text-(--main-color) font-bold overflow-hidden">
                    <ul className="ps-8 list-disc">
                        {answers.map((answer, index) => (
                            <li key={index}>{answer}</li>
                        ))}
                    </ul>
				</div>
			</div>
		</div>
	);
}
