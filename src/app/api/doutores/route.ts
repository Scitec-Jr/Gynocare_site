import { query } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface DoutorFromDB {
	Id: number;
	Nome: string;
}

interface DoutorFormatado {
	id: number;
	name: string;
	graduation: string;
	image: string;
	description: string;
}

export async function getAll(): Promise<DoutorFormatado[]> {
	try {
		const results = await query<DoutorFromDB>(
			"SELECT Id, Nome FROM Doutor ORDER BY Nome"
		);

		const doutores = results.map((doutor) => ({
			id: doutor.Id,
			name: doutor.Nome,
			graduation: "",
			image: "/assets/images/placeholder2.png",
			description: "",
		}));

		return doutores;
	} catch (error) {
		console.error("Erro ao buscar doutores:", error);
		return [];
	}
}

export async function GET(request: NextRequest) {
	try {
		const exameId = request.nextUrl.searchParams.get("exameId");

		let results: DoutorFromDB[] = [];

		if (exameId) {
			results = await query<DoutorFromDB>(
				"SELECT DISTINCT d.Id, d.Nome FROM Doutor d INNER JOIN Doutor_Exame de ON d.Id = de.Doutor_Id WHERE de.Exame_Id = ? ORDER BY d.Nome",
				[exameId]
			);

			return NextResponse.json(results);
		} else {
			const doutores = await getAll();
			return NextResponse.json(doutores);
		}
	} catch (error) {
		console.error("Erro ao buscar doutores:", error);
		return NextResponse.json({ error: "Erro ao buscar doutores" }, { status: 500 });
	}
}
