export type Speciality = {
	id: number;
	name: string;
	imageUrl: string;
	url: string;
	treatments: string[];
};

type Procedure = {
	id: number;
	name: string;
	slug: string;
};

type Exam = {
	id: number;
	name: string;
	slug: string;
	procedureId: number;
};

export async function getSpecialitiesList(): Promise<Speciality[]> {
	try {
		const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

		const [proceduresResponse, examsResponse] = await Promise.all([
			fetch(`${baseUrl}/api/procedimentos?limit=100`, {
				cache: "no-store",
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}),
			fetch(`${baseUrl}/api/exames?limit=1000`, {
				cache: "no-store",
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}),
		]);

		if (!proceduresResponse.ok) {
			throw new Error(`Erro ao buscar procedimentos: ${proceduresResponse.status}`);
		}

		if (!examsResponse.ok) {
			throw new Error(`Erro ao buscar exames: ${examsResponse.status}`);
		}

		const proceduresData = await proceduresResponse.json();
		const examsData = await examsResponse.json();

		const procedures: Procedure[] = proceduresData.data;
		const exams: Exam[] = examsData.data;

		return procedures.map((procedure) => ({
			id: procedure.id,
			name: procedure.name,
			imageUrl: procedure.id % 2 === 0 ? "/assets/images/ecografia.jpeg" : "/assets/images/ecografia2.jpeg",
			url: `/procedimentos/${procedure.slug}`,
			treatments: exams.filter((exam) => exam.procedureId === procedure.id).map((exam) => exam.name),
		}));
	} catch (error) {
		console.error("Erro ao buscar especialidades:", error);
		return [];
	}
}
