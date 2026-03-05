import { procedures } from "@/components/Procedures/procedures";
import TreatmentButtons from "@/components/Procedures/Treatments";
import InfoTab from "@/components/Procedures/InfoTab";

export default async function Procedures({params}: {params: Promise<{procedimento: string, tratamento: string}>}) {
    const {procedimento, tratamento} = await params;
    const selectedProcedure = procedures.find((p) => p.slug === procedimento);
    const selectedTreatment = selectedProcedure?.treatments.find((t) => t.slug === tratamento);

	return (
		<main>
			<TreatmentButtons procedures={procedures} procedure={selectedProcedure?.name || procedures[0].name} treatments={selectedProcedure?.treatments || procedures[0].treatments} treatment={selectedTreatment?.name || procedures[0].treatments[0].name} />
            <InfoTab treatment={selectedTreatment || procedures[0].treatments[0]}></InfoTab>
		</main>
	);
}
