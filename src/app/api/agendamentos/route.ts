import { query } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const { doutorId, exameId, data, horario, telefone } = await request.json();

		if (!doutorId || !exameId || !data || !horario || !telefone) {
			return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
		}

		const [hora, minuto] = horario.split(":").map(Number);
		let horaFim = hora;
		let minutoFim = minuto + 30;
		if (minutoFim >= 60) {
			horaFim += 1;
			minutoFim -= 60;
		}
		const horarioFim = `${String(horaFim).padStart(2, "0")}:${String(minutoFim).padStart(2, "0")}`;

		const sql = `
			INSERT INTO Agendamento (Doutor_Id, Exame_Id, Telefone, Horario_inicio, Horario_fim, Data)
			VALUES (?, ?, ?, ?, ?, ?)
		`;

		await query(sql, [doutorId, exameId, telefone, horario, horarioFim, data]);

		return NextResponse.json(
			{
				success: true,
				message: "Agendamento realizado com sucesso",
			},
			{ status: 201 },
		);
	} catch (error) {
		console.error("Erro ao criar agendamento:", error);
		return NextResponse.json({ error: "Erro ao criar agendamento" }, { status: 500 });
	}
}
