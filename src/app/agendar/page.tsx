"use client";

import { useEffect, useState } from "react";

type Procedimento = { Id: number; Nome: string };
type Exame = { Id: number; Nome: string };
type Doutor = { Id: number; Nome: string };
type DisponibilidadeData = Record<string, string[]>;

export default function Agendamento() {
	const [procedimentos, setProcedimentos] = useState<Procedimento[]>([]);
	const [exames, setExames] = useState<Exame[]>([]);
	const [doutores, setDoutores] = useState<Doutor[]>([]);

	const [procedimentoId, setProcedimentoId] = useState<number | null>(null);
	const [exameId, setExameId] = useState<number | null>(null);
	const [doutorId, setDoutorId] = useState<number | null>(null);

	const [disponibilidades, setDisponibilidades] = useState<DisponibilidadeData>({});
	const [dataSelecionada, setDataSelecionada] = useState<string | null>(null);
	const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(null);
	const [mesSelecionado, setMesSelecionado] = useState<string | null>(null);
	const [telefone, setTelefone] = useState<string>("");

	useEffect(() => {
		fetch("/api/procedimentos")
			.then((res) => res.json())
			.then((data) => setProcedimentos(data));
	}, []);

	useEffect(() => {
		if (!procedimentoId) return;

		const controller = new AbortController();

		fetch(`/api/exames?procedimentoId=${procedimentoId}`, {
			signal: controller.signal,
		})
			.then((res) => res.json())
			.then((data) => {
				setExames(data);
				setExameId(null);
				setDoutores([]);
				setDisponibilidades({});
				setDataSelecionada(null);
				setHorarioSelecionado(null);
			})
			.catch((error) => {
				if (error.name !== "AbortError") {
					console.error("Erro ao buscar exames:", error);
				}
			});

		return () => controller.abort();
	}, [procedimentoId]);

	useEffect(() => {
		if (!exameId) return;

		const controller = new AbortController();

		fetch(`/api/doutores?exameId=${exameId}`, {
			signal: controller.signal,
		})
			.then((res) => res.json())
			.then((data) => {
				setDoutores(data);
				setDoutorId(null);
				setDisponibilidades({});
				setDataSelecionada(null);
				setHorarioSelecionado(null);
			})
			.catch((error) => {
				if (error.name !== "AbortError") {
					console.error("Erro ao buscar doutores:", error);
				}
			});

		return () => controller.abort();
	}, [exameId]);

	useEffect(() => {
		if (!doutorId || !exameId) return;

		const controller = new AbortController();

		fetch(`/api/disponibilidade?doutorId=${doutorId}&exameId=${exameId}`, {
			signal: controller.signal,
		})
			.then((res) => res.json())
			.then((data: DisponibilidadeData) => {
				setDisponibilidades(data);
				setDataSelecionada(null);
				setHorarioSelecionado(null);
				const primeiraMes = Object.keys(data).sort()[0];
				if (primeiraMes) {
					setMesSelecionado(primeiraMes.substring(0, 7));
				}
			})
			.catch((error) => {
				if (error.name !== "AbortError") {
					console.error("Erro ao buscar disponibilidade:", error);
				}
			});

		return () => controller.abort();
	}, [doutorId, exameId]);

	const formatarData = (dataString: string): string => {
		const [ano, mes, dia] = dataString.split("-");
		return new Date(parseInt(ano), parseInt(mes) - 1, parseInt(dia)).toLocaleDateString("pt-BR", {
			weekday: "short",
			day: "2-digit",
			month: "short",
		});
	};

	const formatarMes = (mesCodigo: string): string => {
		const [ano, mes] = mesCodigo.split("-");
		return new Date(parseInt(ano), parseInt(mes) - 1).toLocaleDateString("pt-BR", {
			month: "long",
			year: "numeric",
		});
	};

	const datas = Object.keys(disponibilidades).sort();

	const datasPorMes = datas.reduce(
		(acc, data) => {
			const mes = data.substring(0, 7);
			if (!acc[mes]) acc[mes] = [];
			acc[mes].push(data);
			return acc;
		},
		{} as Record<string, string[]>,
	);

	const mesesDisponuveis = Object.keys(datasPorMes).sort();
	const indicesMesAtual = mesesDisponuveis.indexOf(mesSelecionado || "");
	const mesAtualData = mesSelecionado ? datasPorMes[mesSelecionado] : [];

	const irParaMes = (direcao: "anterior" | "proximo") => {
		if (mesSelecionado) {
			const indiceAtual = mesesDisponuveis.indexOf(mesSelecionado);
			if (direcao === "anterior" && indiceAtual > 0) {
				setMesSelecionado(mesesDisponuveis[indiceAtual - 1]);
				setDataSelecionada(null);
				setHorarioSelecionado(null);
			} else if (direcao === "proximo" && indiceAtual < mesesDisponuveis.length - 1) {
				setMesSelecionado(mesesDisponuveis[indiceAtual + 1]);
				setDataSelecionada(null);
				setHorarioSelecionado(null);
			}
		}
	};

	const horariosDisponiveis = dataSelecionada ? disponibilidades[dataSelecionada] || [] : [];

	const confirmarAgendamento = async () => {
		if (!doutorId || !exameId || !dataSelecionada || !horarioSelecionado || !telefone) return;

		try {
			const response = await fetch("/api/agendamentos", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					doutorId,
					exameId,
					data: dataSelecionada,
					horario: horarioSelecionado,
					telefone,
				}),
			});

			if (!response.ok) {
				alert("Erro ao confirmar agendamento. Tente novamente.");
				return;
			}

			const nomeExame = exames.find((e) => e.Id === exameId)?.Nome || "";
			const nomeProcedimento = procedimentos.find((p) => p.Id === procedimentoId)?.Nome || "";
			const nomeMedico = doutores.find((d) => d.Id === doutorId)?.Nome || "";
			const dataFormatada = formatarData(dataSelecionada);

			const mensagemWhatsApp = `${nomeExame} - ${nomeProcedimento} marcado com ${nomeMedico} para ${dataFormatada} - ${horarioSelecionado}`;
			const linkWhatsApp = `https://wa.me/5511992063054?text=${encodeURIComponent(mensagemWhatsApp)}`;

			const [ano, mes, dia] = dataSelecionada.split("-");
			const [hora, minuto] = horarioSelecionado.split(":");
			const dateStart = `${ano}${mes}${dia}T${hora}${minuto}00`;
			const dataFim = new Date(parseInt(ano), parseInt(mes) - 1, parseInt(dia), parseInt(hora), parseInt(minuto) + 30);
			const dateEnd = `${dataFim.getFullYear()}${String(dataFim.getMonth() + 1).padStart(2, "0")}${String(dataFim.getDate()).padStart(2, "0")}T${String(dataFim.getHours()).padStart(2, "0")}${String(dataFim.getMinutes()).padStart(2, "0")}00`;

			const tituloEvento = `${nomeExame} - ${nomeProcedimento}`;
			const descricaoEvento = `Consulta com ${nomeMedico}\n${dataFormatada} - ${horarioSelecionado}`;

			const linkGoogleCalendar = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(tituloEvento)}&dates=${dateStart}/${dateEnd}&details=${encodeURIComponent(descricaoEvento)}&location=Gynocare`;

			window.open(linkWhatsApp, "_blank");
			window.open(linkGoogleCalendar, "_blank");

			alert("✅ Agendamento confirmado! Você será redirecionado para WhatsApp e Google Calendar.");

			setProcedimentoId(null);
			setExameId(null);
			setDoutorId(null);
			setDataSelecionada(null);
			setHorarioSelecionado(null);
			setMesSelecionado(null);
			setDisponibilidades({});
			setTelefone("");
		} catch (error) {
			console.error("Erro ao confirmar agendamento:", error);
			alert("Erro ao processar agendamento. Tente novamente.");
		}
	};

	return (
		<main className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-12 px-4">
			<section className="max-w-4xl mx-auto mb-8">
				<div className="mb-12 text-center">
					<h1 className="text-5xl font-bold text-(--main-color) mb-3">Agendar Consulta</h1>
					<p className="text-slate-600 text-lg">
						Escolha seu <span className="font-semibold text-(--main-color)">procedimento</span>, <span className="font-semibold text-(--main-color)">exame</span> e <span className="font-semibold text-(--main-color)">médico</span>
					</p>
				</div>

				<div className="space-y-6">
					<div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-l-(--main-color) transition-all hover:shadow-lg">
						<label className="block text-sm font-semibold text-slate-700 mb-3">📋 Selecione o Procedimento</label>
						<select className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-(--main-color) focus:outline-none focus:ring-2 focus:ring-(--main-color)/10 transition-all bg-white text-slate-900" onChange={(e) => setProcedimentoId(Number(e.target.value))} defaultValue="">
							<option value="" disabled>
								Clique para selecionar...
							</option>
							{procedimentos.map((p) => (
								<option key={p.Id} value={p.Id}>
									{p.Nome}
								</option>
							))}
						</select>
					</div>

					{exames.length > 0 && (
						<div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-l-(--main-color) transition-all hover:shadow-lg animate-in fade-in duration-300">
							<label className="block text-sm font-semibold text-slate-700 mb-3">🔬 Selecione o Exame</label>
							<select className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-(--main-color) focus:outline-none focus:ring-2 focus:ring-(--main-color)/10 transition-all bg-white text-slate-900" onChange={(e) => setExameId(Number(e.target.value))} defaultValue="">
								<option value="" disabled>
									Clique para selecionar...
								</option>
								{exames.map((e) => (
									<option key={e.Id} value={e.Id}>
										{e.Nome}
									</option>
								))}
							</select>
						</div>
					)}

					{doutores.length > 0 && (
						<div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-l-(--main-color) transition-all hover:shadow-lg animate-in fade-in duration-300">
							<label className="block text-sm font-semibold text-slate-700 mb-3">👨‍⚕️ Selecione o Médico</label>
							<select className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-(--main-color) focus:outline-none focus:ring-2 focus:ring-(--main-color)/10 transition-all bg-white text-slate-900" onChange={(e) => setDoutorId(Number(e.target.value))} defaultValue="">
								<option value="" disabled>
									Clique para selecionar...
								</option>
								{doutores.map((d) => (
									<option key={d.Id} value={d.Id}>
										{d.Nome}
									</option>
								))}
							</select>
						</div>
					)}

					{doutorId && exameId && datas.length > 0 && (
						<div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-l-(--main-color) transition-all animate-in fade-in duration-300">
							<label className="block text-sm font-semibold text-slate-700 mb-4">📅 Selecione Data e Horário</label>

							<div className="mb-6">
								<div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
									<button onClick={() => irParaMes("anterior")} disabled={indicesMesAtual <= 0} className="px-3 py-2 rounded-lg border-2 border-slate-200 text-slate-700 hover:border-(--main-color) disabled:opacity-50 disabled:cursor-not-allowed transition-all">
										← Anterior
									</button>
									<h3 className="text-lg font-semibold text-slate-900 capitalize">{mesSelecionado ? formatarMes(mesSelecionado) : ""}</h3>
									<button onClick={() => irParaMes("proximo")} disabled={indicesMesAtual >= mesesDisponuveis.length - 1} className="px-3 py-2 rounded-lg border-2 border-slate-200 text-slate-700 hover:border-(--main-color) disabled:opacity-50 disabled:cursor-not-allowed transition-all">
										Próximo →
									</button>
								</div>

								<div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2">
									{mesAtualData.map((data) => (
										<button
											key={data}
											onClick={() => {
												setDataSelecionada(data);
												setHorarioSelecionado(null);
											}}
											className={`p-3 rounded-lg font-medium transition-all duration-200 border-2 text-center ${dataSelecionada === data ? "border-(--main-color) bg-(--main-color) text-white shadow-lg" : "border-slate-200 bg-slate-50 text-slate-700 hover:border-(--main-color) hover:bg-(--main-color)/5"}`}
										>
											<div className="text-xs opacity-75">{formatarData(data).split(" ")[0]}</div>
											<div className="text-sm font-bold">{data.split("-")[2]}</div>
										</button>
									))}
								</div>
							</div>

							{dataSelecionada && horariosDisponiveis.length > 0 && (
								<div className="animate-in fade-in duration-300">
									<p className="text-xs font-medium text-slate-600 mb-3">HORÁRIOS DISPONÍVEIS EM {dataSelecionada}:</p>
									<div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
										{horariosDisponiveis.map((horario) => (
											<button key={horario} onClick={() => setHorarioSelecionado(horario)} className={`p-2 rounded-lg font-medium transition-all duration-200 border-2 text-center text-sm ${horarioSelecionado === horario ? "border-(--main-color) bg-(--main-color) text-white shadow-lg" : "border-slate-200 bg-slate-50 text-slate-700 hover:border-(--main-color) hover:bg-(--main-color)/5"}`}>
												{horario}
											</button>
										))}
									</div>
								</div>
							)}

							{dataSelecionada && horariosDisponiveis.length === 0 && (
								<div className="text-center py-8 text-slate-500">
									<p className="text-sm">Nenhum horário disponível para este dia.</p>
								</div>
							)}
						</div>
					)}

					{dataSelecionada && horarioSelecionado && (
						<div className="bg-linear-to-r from-(--main-color)/10 to-(--main-color)/5 rounded-lg p-6 border-2 border-(--main-color) animate-in fade-in duration-300">
							<h3 className="font-semibold text-slate-900 mb-4 text-lg">✅ Resumo do Agendamento</h3>
							<div className="space-y-3 text-sm text-slate-700 mb-6">
								<div className="flex justify-between bg-white bg-opacity-50 p-3 rounded">
									<span className="font-medium">Procedimento:</span>
									<span>{procedimentos.find((p) => p.Id === procedimentoId)?.Nome}</span>
								</div>
								<div className="flex justify-between bg-white bg-opacity-50 p-3 rounded">
									<span className="font-medium">Exame:</span>
									<span>{exames.find((e) => e.Id === exameId)?.Nome}</span>
								</div>
								<div className="flex justify-between bg-white bg-opacity-50 p-3 rounded">
									<span className="font-medium">Médico:</span>
									<span>{doutores.find((d) => d.Id === doutorId)?.Nome}</span>
								</div>
								<div className="flex justify-between bg-white bg-opacity-50 p-3 rounded">
									<span className="font-medium">Data:</span>
									<span>{formatarData(dataSelecionada)}</span>
								</div>
								<div className="flex justify-between bg-white bg-opacity-50 p-3 rounded">
									<span className="font-medium">Horário:</span>
									<span>{horarioSelecionado}</span>
								</div>
							</div>
							<div className="mb-4">
								<label className="block text-sm font-semibold text-slate-700 mb-2">📞 Telefone</label>
								<input type="tel" placeholder="Digite o seu telefone, apenas números" value={telefone} onChange={(e) => setTelefone(e.target.value.replace(/\D/g, ""))} className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-(--main-color) focus:outline-none focus:ring-2 focus:ring-(--main-color)/10 transition-all" maxLength={11} />
							</div>
							<button onClick={confirmarAgendamento} disabled={!telefone} className="w-full bg-(--main-color) text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
								Confirmar Agendamento
							</button>
						</div>
					)}

					{doutorId && exameId && datas.length === 0 && (
						<div className="bg-white rounded-lg shadow-md p-8 text-center border-l-4 border-l-(--main-color)">
							<p className="text-slate-600">⚠️ Nenhuma data disponível para este médico nos próximos 3 meses.</p>
						</div>
					)}
				</div>
			</section>
            <section className="max-w-4xl mx-auto">
                <p className="font-bold">
                    Prezado paciente, <br /><br />
                    Gostaríamos de informar que, para garantir a eficiência e organização do nosso atendimento, pedimos que você confirme sua consulta/exame com antecedência mínima de 12 horas. <br /><br />
                    Caso você não confirme, não se preocupe! Você ainda será atendido, se chegar com 15 minutos de antecedência, caso não seja possível,  seu horário poderá ser oferecido a outro paciente que esteja na lista de espera e, posteriormente, você será encaixado em outro horário disponível. <br /><br />
                    Agradecemos sua compreensão e colaboração. Se tiver alguma dúvida ou precisar confirmar sua consulta/exame, por favor não hesite em entrar em contato conosco pelo telefone (61) 3388-7320 ou (61) 98276-8838.
                </p>
            </section>
		</main>
	);
}
