"use client";

import { useState } from "react";
import Image from "next/image";

interface TestimonialFormProps {
	isOpen: boolean;
	onClose: () => void;
	onSuccess: () => void;
}

export default function TestimonialForm({ isOpen, onClose, onSuccess }: TestimonialFormProps) {
	const [nota, setNota] = useState(0);
	const [texto, setTexto] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		if (nota === 0) {
			setError("Por favor, selecione uma nota");
			return;
		}

		if (texto.trim().length === 0) {
			setError("Por favor, escreva uma avaliação");
			return;
		}

		setLoading(true);

		try {
			const response = await fetch("/api/avaliacoes", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					nota,
					texto,
					status: 0,
				}),
			});

			if (!response.ok) {
				throw new Error("Erro ao enviar avaliação");
			}

			setNota(0);
			setTexto("");
			onSuccess();
			onClose();
		} catch (err) {
			setError("Erro ao enviar avaliação. Tente novamente.");
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-[#000000aa] flex items-center justify-center p-4 z-50">
			<div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
				<h2 className="text-2xl font-bold mb-4 text-(--main-dark-color)">
					Deixe sua <span className="text-(--main-color)">Avaliação</span>
				</h2>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block text-sm font-semibold mb-2 text-(--main-dark-color)">
							Nota (1 a 5 estrelas)
						</label>
						<div className="flex gap-3">
							{Array.from({ length: 5 }, (_, i) => (
								<button
									key={i + 1}
									type="button"
									onClick={() => setNota(i + 1)}
									className="transition-transform hover:scale-110"
								>
									<Image
										src={
											i < nota
												? "/assets/icons/star-full.png"
												: "/assets/icons/star.png"
										}
										alt={`Estrela ${i + 1}`}
										width={40}
										height={40}
									/>
								</button>
							))}
						</div>
					</div>

					<div>
						<label className="block text-sm font-semibold mb-2 text-(--main-dark-color)">
							Sua Avaliação
						</label>
						<textarea
							value={texto}
							onChange={(e) => setTexto(e.target.value.slice(0, 500))}
							placeholder="Compartilhe sua experiência..."
							className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-(--main-color) resize-none"
							rows={4}
							maxLength={500}
						/>
						<div className="text-xs text-gray-500 mt-1">
							{texto.length}/500 caracteres
						</div>
					</div>

					{error && <div className="text-red-500 text-sm">{error}</div>}

					<div className="flex gap-3 pt-4">
						<button
							type="button"
							onClick={onClose}
							className="flex-1 py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-semibold"
						>
							Cancelar
						</button>
						<button
							type="submit"
							disabled={loading}
							className="flex-1 py-2 px-4 bg-(--main-color) text-white rounded-lg hover:opacity-90 transition font-semibold disabled:opacity-50"
						>
							{loading ? "Enviando..." : "Enviar"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
