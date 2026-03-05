"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Treatments, Procedure } from "./procedures";

export default function TreatmentButtons({ procedures, procedure, treatments, treatment }: { procedures: Procedure[]; procedure: string; treatments: Treatments[]; treatment: string }) {
	const [open, setOpen] = useState(false);

	return (
		<section className="max-w-360 mx-auto mb-8 p-4 md:px-8 relative">
			<div onClick={() => setOpen((prev) => !prev)} className="flex items-center mb-6 cursor-pointer">
				<h1 className="me-4 text-(--main-dark-color) text-4xl font-bold">{procedure}</h1>

				<Image src="/assets/icons/arrow-down-dark.png" alt="Ver procedimentos" width={18} height={18} className={`transition-transform ${open ? "rotate-180" : ""}`} />
			</div>

			{open && (
				<div className="absolute p-4 bg-(--main-color) shadow-lg rounded-lg text-lg text-center text-white font-bold overflow-hidden z-20">
					{procedures.map((proc) => (
						<Link key={proc.slug} href={`/procedimentos/${proc.slug}/${proc.treatments[0].slug}`} className={`block p-3 hover:text-(--main-dark-color) ${proc.name === procedure ? "bg-(--main-dark-color) text-white" : ""} rounded-md`} onClick={() => setOpen(false)}>
							{proc.name}
						</Link>
					))}
				</div>
			)}

			<div className="grid grid-cols-[repeat(auto-fill,minmax(min(300px,100%),1fr))] gap-4 max-w-241 mx-auto mt-8">
				{treatments.map((treatmentItem) => (
					<Link key={treatmentItem.slug} href={treatmentItem.slug} className={`p-2 rounded-lg border border-(--main-color) text-(--main-color) font-bold shadow-md cursor-pointer ${treatmentItem.name === treatment ? "bg-zinc-200" : ""}`}>
						{treatmentItem.name}
					</Link>
				))}
			</div>
		</section>
	);
}
