import { doctorsService } from "@/services/doctors.service";
import { examsService } from "@/services/exams.service";
import { proceduresService } from "@/services/procedures.service";

export async function gerarRespostaChat(mensagem: string): Promise<string> {
	const textoLower = mensagem.toLowerCase();

	if (textoLower.includes("horário") || textoLower.includes("horario") || textoLower.includes("funciona") || textoLower.includes("aberto") || textoLower.includes("abre") || textoLower.includes("fecha")) {
		return "⏰ Nossos horários de atendimento são de segunda a sexta, das 08:00 às 17:00. Como posso ajudá-lo mais?";
	}

	if (textoLower.includes("procedimento") || textoLower.includes("procedimentos") || textoLower.includes("serviço") || textoLower.includes("serviços")) {
		const { data: procedimentos } = await proceduresService.getAllProcedures();
		if (procedimentos.length > 0) {
			const listaProcedimentos = procedimentos.map((procedimento) => `• ${procedimento.name}`).join("\n");
			return `📋 Nossos procedimentos disponíveis são:\n\n${listaProcedimentos}\n\nGostaria de saber mais sobre algum deles ou fazer um agendamento?`;
		}
		return "Desculpe, não consegui carregar a lista de procedimentos. Tente novamente mais tarde.";
	}

	if (textoLower.includes("exame") || textoLower.includes("exames") || textoLower.includes("teste")) {
		const { data: exames } = await examsService.getAllExams();
		if (exames.length > 0) {
			const listaExames = exames.map((exame) => `• ${exame.name}`).join("\n");
			return `🔬 Contamos com os seguintes exames:\n\n${listaExames}\n\nDeseja fazer um agendamento?`;
		}
		return "Desculpe, não consegui carregar a lista de exames. Tente novamente mais tarde.";
	}

	if (textoLower.includes("doutor") || textoLower.includes("doutora") || textoLower.includes("médico") || textoLower.includes("medico") || textoLower.includes("especialista")) {
		const { data: doutores } = await doctorsService.getAllDoctors();
		if (doutores.length > 0) {
			const listaDoutores = doutores.map((doutor) => `• ${doutor.name}`).join("\n");
			return `👨‍⚕️ Nossos médicos disponíveis são:\n\n${listaDoutores}\n\nGostaria de fazer um agendamento com algum deles?`;
		}
		return "Desculpe, não consegui carregar a lista de médicos. Tente novamente mais tarde.";
	}

	if (textoLower.includes("agendamento") || textoLower.includes("agendar") || textoLower.includes("marcar") || textoLower.includes("consulta") || textoLower.includes("quero agendar")) {
		return `📅 Ótimo! Para agendar uma consulta, acesse nossa página de agendamento!\n\n🔗 Acesse:https://gynocare.com/agendar\n\n📝. Ou clique em **Agendamento** no topo dessa página. Na página você pode:\n1. Selecionar o procedimento\n2. Escolher o exame\n3. Selecionar o médico\n4. Escolher a data e horário\n5. Confirmar com seu telefone\n\n💬 No final, você receberá uma mensagem de confirmação e poderá sincronizar com seu Google Calendar!\n\n📞 Se tiver dúvidas ou preferir conversar conosco, entre em contato:\n**(61)  99898-1009**\n\nEstou aqui para ajudar! Tem mais alguma dúvida?`;
	}

	return `Desculpe, não entendi bem sua pergunta. 🤔\n\nPosso ajudá-lo com:\n• 🕒 Horários de atendimento\n• 📋 Procedimentos disponíveis\n• 🔬 Exames\n• 👨‍⚕️ Médicos\n• 📅 Como fazer um agendamento\n\nComo posso ajudá-lo?`;
}