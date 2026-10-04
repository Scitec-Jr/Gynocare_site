import { NextRequest, NextResponse } from "next/server";
import { gerarRespostaChat } from "@/services/chat.service";

export async function POST(request: NextRequest) {
	const body: unknown = await request.json().catch(() => null);

	if (
		typeof body !== "object" ||
		body === null ||
		!("message" in body) ||
		typeof body.message !== "string" ||
		!body.message.trim() ||
		body.message.length > 1000 ||
		("context" in body && typeof body.context !== "string") ||
		("context" in body && typeof body.context === "string" && body.context.length > 1200)
	) {
		return NextResponse.json(
			{ error: "Envie uma mensagem válida." },
			{ status: 400 }
		);
	}

	try {
		const contextoAssistente = "context" in body && typeof body.context === "string"
			? body.context
			: undefined;
		const response = await gerarRespostaChat(body.message, contextoAssistente);
		return NextResponse.json({ response });
	} catch (error) {
		console.error("Erro ao gerar resposta do chat:", error);
		return NextResponse.json(
			{ error: "Não foi possível gerar uma resposta agora." },
			{ status: 500 }
		);
	}
}