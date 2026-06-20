import { query } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

type AgendamentoResult = {
	Data: string;
	Horario_inicio: string;
};

type DoutorHorario = {
	DiaSemana: number;
	HoraInicio: string;
	HoraFim: string;
};

type DiaIndisponivel = {
	Data: string;
};

type Existe = {
	existe: number;
};

export async function GET(request: NextRequest) {
	try {
		const doutorId = request.nextUrl.searchParams.get("doutorId");
		const exameId = request.nextUrl.searchParams.get("exameId");

		if (!doutorId) {
			return NextResponse.json(
				{ error: "doutorId é obrigatório" },
				{ status: 400 }
			);
		}

		if (!exameId) {
			return NextResponse.json(
				{ error: "exameId é obrigatório" },
				{ status: 400 }
			);
		}

		// Verifica se o médico realiza o exame
		const realizaExame = await query<Existe>(
			`
			SELECT 1 AS existe
			FROM Doutor_Exame
			WHERE Doutor_Id = ? AND Exame_Id = ?
			LIMIT 1
			`,
			[doutorId, exameId]
		);

		if (realizaExame.length === 0) {
			return NextResponse.json(
				{ error: "Este doutor não realiza esse exame" },
				{ status: 400 }
			);
		}

		// Busca horários de trabalho
		const horariosTrabalho = await query<DoutorHorario>(
			`
			SELECT 
				DiaSemana,
				TIME_FORMAT(HoraInicio, '%H:%i') AS HoraInicio,
				TIME_FORMAT(HoraFim, '%H:%i') AS HoraFim
			FROM DoutorHorario
			WHERE DoutorId = ?
			`,
			[doutorId]
		);

		if (horariosTrabalho.length === 0) {
			return NextResponse.json({});
		}

		// Busca dias indisponíveis
		const diasIndisponiveisBanco = await query<DiaIndisponivel>(
			`
			SELECT DATE_FORMAT(Data, '%Y-%m-%d') AS Data
			FROM DoutorHorarioIndisponivel
			WHERE DoutorId = ?
			AND Data BETWEEN CURDATE() 
			AND DATE_ADD(CURDATE(), INTERVAL 90 DAY)
			`,
			[doutorId]
		);

		const diasIndisponiveis = new Set(
			diasIndisponiveisBanco.map(d => d.Data)
		);

		// Busca horários já ocupados
		const agendamentos = await query<AgendamentoResult>(
			`
			SELECT 
				DATE_FORMAT(Data, '%Y-%m-%d') AS Data,
				TIME_FORMAT(Horario_inicio, '%H:%i') AS Horario_inicio
			FROM Agendamento
			WHERE Doutor_Id = ?
			AND Data BETWEEN CURDATE()
			AND DATE_ADD(CURDATE(), INTERVAL 90 DAY)
			ORDER BY Data, Horario_inicio
			`,
			[doutorId]
		);

		const horariosOcupados = new Set(
			agendamentos.map(
				a => `${a.Data}|${a.Horario_inicio}`
			)
		);

		// Organiza os horários por dia da semana
		const agendaSemanal: Record<number, DoutorHorario[]> = {};

		for (const horario of horariosTrabalho) {
			if (!agendaSemanal[horario.DiaSemana]) {
				agendaSemanal[horario.DiaSemana] = [];
			}

			agendaSemanal[horario.DiaSemana].push(horario);
		}

		const disponibilidade: Record<string, string[]> = {};

		const hoje = new Date();
		const fim = new Date();
		fim.setDate(fim.getDate() + 90);

		for (
			let dia = new Date(hoje);
			dia <= fim;
			dia.setDate(dia.getDate() + 1)
		) {
			const dataAtual = dia.toISOString().split("T")[0];

			// Verifica férias, folgas, etc.
			if (diasIndisponiveis.has(dataAtual)) {
				continue;
			}

			const turnos = agendaSemanal[dia.getDay()];

			// Não trabalha neste dia da semana
			if (!turnos) {
				continue;
			}

			const horariosDia: string[] = [];

			for (const turno of turnos) {
				const [horaInicio, minutoInicio] =
					turno.HoraInicio.split(":").map(Number);

				const [horaFim, minutoFim] =
					turno.HoraFim.split(":").map(Number);

				const inicioMinutos = horaInicio * 60 + minutoInicio;
				const fimMinutos = horaFim * 60 + minutoFim;

				for (
					let minuto = inicioMinutos;
					minuto < fimMinutos;
					minuto += 30
				) {
					const hora = Math.floor(minuto / 60);
					const minutoFormatado = minuto % 60;

					const horario = `${String(hora).padStart(2, "0")}:${String(minutoFormatado).padStart(2, "0")}`;

					const chave = `${dataAtual}|${horario}`;

					if (!horariosOcupados.has(chave)) {
						horariosDia.push(horario);
					}
				}
			}

			if (horariosDia.length > 0) {
				disponibilidade[dataAtual] = horariosDia;
			}
		}

		return NextResponse.json(disponibilidade);

	} catch (error) {
		console.error("Erro ao buscar disponibilidade:", error);

		return NextResponse.json(
			{ error: "Erro ao buscar disponibilidade" },
			{ status: 500 }
		);
	}
}