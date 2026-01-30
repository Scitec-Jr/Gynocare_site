import Image from "next/image";

export default function MedicalCareCard({medicalCareId}: {medicalCareId: number}) {
	return (
		<div className="w-30 h-20 p-2 rounded-xl shadow-black shadow">
			<Image src={`/assets/images/convenios/convenio${medicalCareId}.png`} alt="Convênio" width={300} height={100} className="w-full h-full object-contain" />
		</div>
	);
}
