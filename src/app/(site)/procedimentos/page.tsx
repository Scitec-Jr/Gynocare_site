import { redirect } from "next/navigation";
import { getProceduresList } from "@/components/Procedures/procedures";

export default async function ProceduresPage() {
	const procedures = await getProceduresList();

	if (procedures.length === 0 || procedures[0].treatments.length === 0) {
		redirect("/");
	}

	const procedure = procedures[0];
	const treatment = procedure.treatments[0];

	redirect(`/procedimentos/${procedure.slug}/${treatment.slug}`);
}