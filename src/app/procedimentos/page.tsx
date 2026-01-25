import { redirect } from "next/navigation";
import { procedures } from "@/components/Procedures/procedures";

export default function ProceduresPage() {
	const procedure = procedures[0];
	const treatment = procedure.treatments[0];

	redirect(`/procedimentos/${procedure.slug}/${treatment.slug}`);
}
