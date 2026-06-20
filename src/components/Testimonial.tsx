"use client";

import Image from "next/image";

interface Avaliacao {
	id: number;
	rating: number;
	text: string;
	status: number;
}

interface TestimonialProps {
	avaliacao: Avaliacao;
}

export default function Testimonial({ avaliacao }: TestimonialProps) {
	const renderStars = (nota: number) => {
		return Array.from({ length: 5 }, (_, i) => (
			<Image
				key={i}
				src={i < nota ? "/assets/icons/star-full.png" : "/assets/icons/star.png"}
				alt={`Estrela ${i + 1}`}
				width={32}
				height={32}
			/>
		));
	};

	return (
		<div className="min-w-full md:min-w-auto items-center gap-4 md:flex-[0_0_100%] lg:flex-[0_0_50%] p-4">
			<div className="flex flex-col justify-center items-center gap-4 h-full">
				<div className="flex gap-2">
					{renderStars(avaliacao.rating)}
				</div>

				<div className="w-full p-4 bg-zinc-100 rounded-xl shadow-gray-400 shadow-md">
					<p>{avaliacao.text}</p>
				</div>
			</div>
		</div>
	);
}