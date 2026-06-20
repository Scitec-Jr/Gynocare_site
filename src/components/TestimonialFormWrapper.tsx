"use client";

import { useEffect, useState } from "react";
import Testimonial from "./Testimonial";
import TestimonialForm from "./TestimonialForm";
import Carousel from "./Carousel";

interface Avaliacao {
	id: number;
	rating: number;
	text: string;
	status: number;
}

export default function TestimonialFormWrapper() {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [refreshKey, setRefreshKey] = useState(0);
	const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchAvaliacoes = async () => {
			try {
				const response = await fetch("/api/avaliacoes");

				if (!response.ok) {
					throw new Error(`Erro HTTP: ${response.status}`);
				}

				const data = await response.json();

				const avaliacoesArray = Array.isArray(data)
					? data
					: data.data || [];

				const avaliacoesAprovadas = avaliacoesArray.filter(
					(av: Avaliacao) => av.status === 1
				);

				setAvaliacoes(avaliacoesAprovadas);
			} catch (error) {
				console.error("Erro ao buscar avaliações:", error);
				setAvaliacoes([]);
			} finally {
				setLoading(false);
			}
		};

		fetchAvaliacoes();
	}, [refreshKey]);

	const handleSuccess = () => {
		setRefreshKey((prev) => prev + 1);
		setIsFormOpen(false);
	};

	return (
		<>
			{loading ? (
				<div className="text-center">
					Carregando avaliações...
				</div>
			) : (
				<Carousel>
					{avaliacoes.map((avaliacao) => (
						<Testimonial
							key={avaliacao.id}
							avaliacao={avaliacao}
						/>
					))}
				</Carousel>
			)}

			<button
				onClick={() => setIsFormOpen(true)}
				className="block w-fit mx-auto py-2 px-4 md:py-4 bg-(--main-color) md:text-xl text-white title rounded-full md:rounded-xl hover:opacity-90 transition cursor-pointer"
			>
				Avaliar
			</button>

			<TestimonialForm
				isOpen={isFormOpen}
				onClose={() => setIsFormOpen(false)}
				onSuccess={handleSuccess}
			/>
		</>
	);
}