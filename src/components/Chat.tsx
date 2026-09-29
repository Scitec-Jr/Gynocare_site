"use client";

import { useState, useRef, useLayoutEffect } from "react";
import Image from "next/image";

type Mensagem = {
	id: number;
	texto: string;
	remetente: "usuario" | "bot";
	timestamp: Date;
};

export default function Chat() {
	const [aberto, setAberto] = useState(false);
	const [mensagens, setMensagens] = useState<Mensagem[]>([
		{
			id: 1,
			texto: "Olá! 👋 Sou o assistente da Gynocare. Posso ajudá-lo com dúvidas sobre horários de atendimento, procedimentos, exames, doutores ou agendamentos. Como posso ajudá-lo?",
			remetente: "bot",
			timestamp: new Date(),
		},
	]);
	const [inputMensagem, setInputMensagem] = useState("");
	const [enviando, setEnviando] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const scrollParaBaixo = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useLayoutEffect(() => {
		scrollParaBaixo();
	}, [mensagens]);

	const enviarMensagem = async () => {
		if (!inputMensagem.trim()) return;

		const mensagemUsuarioAtual = inputMensagem;
		const novaMensagemUsuario: Mensagem = {
			id: Date.now(),
			texto: mensagemUsuarioAtual,
			remetente: "usuario",
			timestamp: new Date(),
		};

		setMensagens((prev) => [...prev, novaMensagemUsuario]);
		setInputMensagem("");
		setEnviando(true);

		try {
			const response = await fetch("/api/chat", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ message: mensagemUsuarioAtual }),
			});
			const resultado = await response.json();

			if (!response.ok || typeof resultado.response !== "string") {
				throw new Error("Não foi possível obter uma resposta do chat.");
			}

			setMensagens((prev) => [...prev, {
				id: Date.now() + 1,
				texto: resultado.response,
				remetente: "bot",
				timestamp: new Date(),
			}]);
		} catch (error) {
			console.error("Erro ao enviar mensagem:", error);
			setMensagens((prev) => [...prev, {
				id: Date.now() + 1,
				texto: "Desculpe, não consegui responder agora. Tente novamente em instantes.",
				remetente: "bot",
				timestamp: new Date(),
			}]);
		} finally {
			setEnviando(false);
		}
	};

	return (
		<>
			<button onClick={() => setAberto(!aberto)} className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 p-3 sm:p-4 bg-(--main-color) rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all active:scale-95 cursor-pointer" aria-label="Abrir chat">
				<Image src={"/assets/icons/bot.png"} alt={"Chatbot"} width={32} height={32} />
			</button>

			{aberto && (
				<div className="fixed inset-0 sm:inset-auto sm:bottom-20 sm:right-6 z-50 flex items-end sm:items-start h-full sm:h-auto">
					<div className="sm:hidden absolute inset-0 bg-black/30" onClick={() => setAberto(false)} />

					<div className="relative w-full sm:w-96 h-1/2 sm:h-auto bg-white flex flex-col rounded-t-2xl sm:rounded-lg shadow-2xl sm:max-h-96">
						<div className="bg-(--main-color) text-white p-4 rounded-t-2xl sm:rounded-t-lg flex justify-between items-center shrink-0">
							<div>
								<h3 className="font-semibold text-sm sm:text-base">Suporte Gynocare</h3>
								<p className="text-xs opacity-90">Online agora</p>
							</div>
							<button onClick={() => setAberto(false)} className="text-white hover:bg-(--main-color)/80 p-2 rounded transition-all active:scale-90 cursor-pointer">
								X
							</button>
						</div>

						<div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3">
							{mensagens.map((msg) => (
								<div key={msg.id} className={`flex ${msg.remetente === "usuario" ? "justify-end" : "justify-start"}`}>
									<div className={`max-w-[85%] sm:max-w-xs px-3 sm:px-4 py-2 rounded-lg text-sm whitespace-pre-wrap ${msg.remetente === "usuario" ? "bg-(--main-color) text-white rounded-br-none" : "bg-slate-100 text-slate-900 rounded-bl-none"}`}>
										<p>{msg.texto}</p>
										<p className="text-xs opacity-70 mt-1">
											{msg.timestamp.toLocaleTimeString("pt-BR", {
												hour: "2-digit",
												minute: "2-digit",
											})}
										</p>
									</div>
								</div>
							))}
							{enviando && (
								<div className="flex justify-start">
									<div className="bg-slate-100 text-slate-900 px-3 sm:px-4 py-2 rounded-lg rounded-bl-none">
										<div className="flex space-x-2">
											<div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
											<div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce animation-delay-100"></div>
											<div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce animation-delay-200"></div>
										</div>
									</div>
								</div>
							)}
							<div ref={messagesEndRef} />
						</div>

						<div className="border-t border-slate-200 p-3 sm:p-4 flex gap-2 shrink-0 bg-white rounded-b-2xl sm:rounded-b-lg">
							<input type="text" value={inputMensagem} onChange={(e) => setInputMensagem(e.target.value)} onKeyUp={(e) => e.key === "Enter" && enviarMensagem()} placeholder="Digite..." className="flex-1 px-3 py-2 border border-slate-200 rounded-lg focus:border-(--main-color) focus:outline-none text-sm focus:ring-1 focus:ring-(--main-color)/20 text-black" disabled={enviando} />
							<button onClick={enviarMensagem} disabled={enviando || !inputMensagem.trim()} className="bg-(--main-color) text-white px-3 sm:px-4 py-2 rounded-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium active:scale-95 cursor-pointer">
								<span className="hidden sm:inline">Enviar</span>
								<span className="sm:hidden">➤</span>
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
