import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const results = await query("SELECT Id, Nome FROM Procedimento ORDER BY Nome");
		return NextResponse.json(results);
	} catch (error) {
		console.error("Erro ao buscar procedimentos:", error);
		return NextResponse.json({ error: "Erro ao buscar procedimentos" }, { status: 500 });
	}
}
