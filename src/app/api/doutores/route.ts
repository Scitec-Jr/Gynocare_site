import { query } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	try {
		const exameId = request.nextUrl.searchParams.get("exameId");

		let results;

		if (exameId) {
			results = await query(
				"SELECT DISTINCT d.Id, d.Nome FROM Doutor d INNER JOIN Doutor_Exame de ON d.Id = de.Doutor_Id WHERE de.Exame_Id = ? ORDER BY d.Nome",
				[exameId]
			);
		} else {
			results = await query(
				"SELECT Id, Nome FROM Doutor ORDER BY Nome"
			);
		}

		return NextResponse.json(results);
	} catch (error) {
		console.error("Erro ao buscar doutores:", error);
		return NextResponse.json({ error: "Erro ao buscar doutores" }, { status: 500 });
	}
}
