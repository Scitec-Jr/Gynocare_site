"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Avaliacao {
	Id: number;
	Nota: number;
	Texto: string;
	Status: number;
}

interface TestimonialProps {
	refreshKey?: number;
}

export default function Testimonial({ refreshKey = 0 }: TestimonialProps) {
	const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchAvaliacoes = async () => {
			try {
				const response = await fetch("/api/avaliacoes");
				const data = await response.json();
				setAvaliacoes(data.filter((av: Avaliacao) => av.Status === 1));
			} catch (error) {
				console.error("Erro ao buscar avaliações:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchAvaliacoes();
	}, [refreshKey]);

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

	if (loading) {
		return <div className="text-center">Carregando avaliações...</div>;
	}

	return (
		<>
			{avaliacoes.map((avaliacao) => (
				<div key={avaliacao.Id} className="min-w-full md:min-w-auto items-center gap-4 md:flex-[0_0_100%] lg:flex-[0_0_50%] p-4">
					<div className="flex flex-col justify-center items-center gap-4 h-full">
						<div className="flex gap-2">{renderStars(avaliacao.Nota)}</div>
						<div className="w-full p-4 bg-zinc-100 rounded-xl shadow-gray-400 shadow-md">
							<p>{avaliacao.Texto}</p>
						</div>
					</div>
				</div>
			))}
		</>
	);
}
