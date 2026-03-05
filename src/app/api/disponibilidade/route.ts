import { query } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

type AgendamentoResult = {
	Data: string;
	Horario_inicio: string;
};

export async function GET(request: NextRequest) {
	try {
		const doutorId = request.nextUrl.searchParams.get("doutorId");
		const exameId = request.nextUrl.searchParams.get("exameId");

		if (!doutorId) {
			return NextResponse.json({ error: "doutorId é obrigatório" }, { status: 400 });
		}

		if (!exameId) {
			return NextResponse.json({ error: "exameId é obrigatório" }, { status: 400 });
		}

		// Buscar agendamentos do doutor nos próximos 3 meses
		const agendamentos = await query<AgendamentoResult>(
			`SELECT DATE_FORMAT(Data, '%Y-%m-%d') as Data, TIME_FORMAT(Horario_inicio, '%H:%i') as Horario_inicio
			 FROM Agendamento 
			 WHERE Doutor_Id = ? AND Data >= CURDATE() AND Data <= DATE_ADD(CURDATE(), INTERVAL 90 DAY)
			 ORDER BY Data, Horario_inicio`,
			[doutorId]
		);

		// Gerar horários disponíveis (8:00 até 17:00, a cada 30 minutos)
		const horariosDisponiveis: Record<string, string[]> = {};
		const hoje = new Date();
		const fim = new Date();
		fim.setDate(fim.getDate() + 90);

		// Criar set de horários ocupados
		const horariosOcupados = new Set(
			agendamentos.map((a) => `${a.Data}|${a.Horario_inicio}`)
		);

		// Gerar todos os horários de cada data
		for (let d = new Date(hoje); d <= fim; d.setDate(d.getDate() + 1)) {
			const dataStr = d.toISOString().split("T")[0];

			// Gerar horários de 8:00 até 17:00 a cada 30 minutos
			const horarios: string[] = [];
			for (let hora = 8; hora < 17; hora++) {
				for (let minuto = 0; minuto < 60; minuto += 30) {
					const horarioStr = `${String(hora).padStart(2, "0")}:${String(minuto).padStart(2, "0")}`;
					const chave = `${dataStr}|${horarioStr}`;

					// Só adicionar se não estiver ocupado
					if (!horariosOcupados.has(chave)) {
						horarios.push(horarioStr);
					}
				}
			}

			// Só adicionar datas que têm horários disponíveis
			if (horarios.length > 0) {
				horariosDisponiveis[dataStr] = horarios;
			}
		}

		return NextResponse.json(horariosDisponiveis);
	} catch (error) {
		console.error("Erro ao buscar disponibilidade:", error);
		return NextResponse.json({ error: "Erro ao buscar disponibilidade" }, { status: 500 });
	}
}
