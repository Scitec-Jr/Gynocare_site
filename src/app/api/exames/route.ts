import { query } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	try {
		const procedimentoId = request.nextUrl.searchParams.get("procedimentoId");

		let results;

		if (procedimentoId) {
			results = await query(
				"SELECT DISTINCT Id, Nome FROM Exame WHERE Procedimento_Id = ? ORDER BY Nome",
				[procedimentoId]
			);
		} else {
			results = await query(
				"SELECT DISTINCT Id, Nome FROM Exame ORDER BY Nome"
			);
		}

		return NextResponse.json(results);
	} catch (error) {
		console.error("Erro ao buscar exames:", error);
		return NextResponse.json({ error: "Erro ao buscar exames" }, { status: 500 });
	}
}
