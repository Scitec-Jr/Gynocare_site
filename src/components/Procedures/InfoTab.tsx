"use client";

import { useState } from "react";

export default function InfoTab({
	treatment,
}: {
	treatment: {
		slug: string;
		name: string;
		information: string;
		preparation: string;
	};
}) {
	const [active, setActive] = useState<"info" | "prep">("info");

	return (
		<section className="bg-(--secondary-color)">
			<div className="max-w-360 mx-auto">
				<div className="flex">
					<button onClick={() => setActive("info")} className={`flex-1 p-4 transition ${active === "info" ? "bg-transparent" : "bg-(--main-dark-color)"} cursor-pointer`}>
						<h2 className="text-white text-center text-xl font-bold">INFORMAÇÕES</h2>
					</button>

					<button onClick={() => setActive("prep")} className={`flex-1 p-4 transition ${active === "prep" ? "bg-transparent" : "bg-(--main-dark-color)"} cursor-pointer`}>
						<h2 className="text-white text-center text-xl font-bold">PREPARAÇÃO</h2>
					</button>
				</div>

				<div className="p-8">
					<p className="text-white font-bold">{active === "info" ? treatment.information : treatment.preparation}</p>
				</div>
			</div>
		</section>
	);
}
