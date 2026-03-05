import { query } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
	try {
		const avaliacoes = await query(
			"SELECT Id, Nota, Texto, Status FROM Avaliacao WHERE Status = true ORDER BY Criado_em DESC"
		);

		return NextResponse.json(avaliacoes);
	} catch (error) {
		console.error("Erro ao buscar avaliações:", error);
		return NextResponse.json({ error: "Erro ao buscar avaliações" }, { status: 500 });
	}
}

export async function POST(request: NextRequest) {
	try {
		const { nota, texto, status } = await request.json();

		if (!nota || !texto || status === undefined) {
			return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
		}

		if (nota < 1 || nota > 5) {
			return NextResponse.json({ error: "Nota deve estar entre 1 e 5" }, { status: 400 });
		}

		if (texto.length > 500) {
			return NextResponse.json({ error: "Texto não pode exceder 500 caracteres" }, { status: 400 });
		}

		const sql = `
			INSERT INTO Avaliacao (Nota, Texto, Status)
			VALUES (?, ?, ?)
		`;

		await query(sql, [nota, texto, status]);

		return NextResponse.json(
			{
				success: true,
				message: "Avaliação cadastrada com sucesso",
			},
			{ status: 201 },
		);
	} catch (error) {
		console.error("Erro ao criar avaliação:", error);
		return NextResponse.json({ error: "Erro ao criar avaliação" }, { status: 500 });
	}
}
