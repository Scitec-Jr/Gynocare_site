export type Treatment = {
    id: number;
    slug: string;
    name: string;
    information: string;
    preparation: string;
};

export type Procedure = {
    id: number;
    slug: string;
    name: string;
    treatments: Treatment[];
};

type ProcedureApi = {
    id: number;
    name: string;
    slug: string;
};

type ExamApi = {
    id: number;
    name: string;
    slug: string;
    information: string;
    preparation: string;
    procedureId: number;
};

export async function getProceduresList(): Promise<Procedure[]> {
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

        const procedures: ProcedureApi[] = proceduresData.data;
        const exams: ExamApi[] = examsData.data;

        return procedures.map((procedure) => ({
            id: procedure.id,
            slug: procedure.slug,
            name: procedure.name,
            treatments: exams
                .filter((exam) => exam.procedureId === procedure.id)
                .map((exam) => ({
                    id: exam.id,
                    slug: exam.slug,
                    name: exam.name,
                    information: exam.information,
                    preparation: exam.preparation,
                })),
        }));
    } catch (error) {
        console.error("Erro ao buscar procedimentos:", error);
        return [];
    }
}