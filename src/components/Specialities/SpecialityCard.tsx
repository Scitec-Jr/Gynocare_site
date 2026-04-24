import Image from "next/image";
import Link from "next/link";

export default function SpecialityCard({ name, imageUrl, url, treatments }: { name: string; imageUrl: string; url: string; treatments: string[] }) {
	return (
		<div className="group odd:bg-zinc-100 p-8 md:pb-12">
			<div className="flex flex-col items-center md:group-even:flex-row md:group-odd:flex-row-reverse justify-between gap-8 max-w-2xl mx-auto">
				<div className="relative flex-1 h-full">
					<Image src={imageUrl} alt={name} width={300} height={300} className="h-full border-3 border-(--main-color) rounded-xl" />

<<<<<<< HEAD
					<h2 className="absolute left-0 bottom-0 w-11/10 py-2 px-4 bg-(--main-color) text-white text-center title rounded-full md:rounded-xl -translate-x-1/20 md:-translate-x-1/13 translate-y-1/2">{name}</h2>
				</div>

				<div className="flex flex-1 flex-col justify-between h-full">
=======
					<h2 className="absolute left-0 bottom-0 w-11/10 py-2 px-4 bg-(--main-color) text-white text-center title rounded-full md:rounded-xl -translate-x-1/20 translate-y-1/2">{name}</h2>
				</div>

				<div className="flex flex-col justify-between h-full">
>>>>>>> 68d0fc457e0dcc02901ce7e333b3b016119605c7
					<ul className="hidden md:block list-disc columns-2 gap-8 ps-4 text-zinc-600 title">
						{treatments.map((treatment, index) => (
							<li key={index}>{treatment}</li>
						))}
					</ul>

					<Link href={url} className="w-fit group-even:ms-auto py-2 px-4 md:bg-(--main-color) text-(--main-dark-color) md:text-white title rounded-full md:rounded-xl shadow-black shadow md:translate-y-1/2">
						Procedimentos
					</Link>
				</div>
			</div>
		</div>
	);
}
