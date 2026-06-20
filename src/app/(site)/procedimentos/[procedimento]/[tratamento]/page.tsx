import { getProceduresList } from "@/components/Procedures/procedures";
import TreatmentButtons from "@/components/Procedures/Treatments";
import InfoTab from "@/components/Procedures/InfoTab";
import { redirect } from "next/navigation";

type PageProps = {
	params: Promise<{
		procedimento: string;
		tratamento: string;
	}>;
};

export default async function Procedures({ params }: PageProps) {
	const { procedimento, tratamento } = await params;

	const procedures = await getProceduresList();

	if (procedures.length === 0) {
		redirect("/");
	}

	const selectedProcedure =
		procedures.find((p) => p.slug === procedimento) ||
		procedures[0];

	const selectedTreatment =
		selectedProcedure.treatments.find(
			(t) => t.slug === tratamento
		) ||
		selectedProcedure.treatments[0];

	if (!selectedTreatment) {
		redirect("/");
	}

	return (
		<main>
			<TreatmentButtons
				procedures={procedures}
				procedure={selectedProcedure.name}
				treatments={selectedProcedure.treatments}
				treatment={selectedTreatment.name}
			/>

			<InfoTab treatment={selectedTreatment} />
		</main>
	);
}