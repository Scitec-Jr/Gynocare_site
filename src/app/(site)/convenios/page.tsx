import MedicalCareCard from "@/components/MedicalCare/MedicalCareCard";

export default function MedicalCare() {
    return (
        <main>
            <section className="max-w-360 mx-auto p-4 md:px-8">
                <h1 className="text-4xl text-(--main-dark-color) text-center md:text-left title">Convênios <span className="text-(--main-color)">Aceitos</span></h1>
                <p className="mb-4 text-zinc-500 text-center md:text-left">Confira abaixos todos os <span className="text-(--main-color)">convênios aceitos</span> pela Clínica Gynocare</p>

                <div className="flex flex-wrap justify-center gap-4 max-w-160 mx-auto">
                    {Array.from({length: 39}, (_, i) => (
                        <MedicalCareCard key={i + 1} medicalCareId={i + 1} />
                    ))}
                </div>
            </section>
        </main>
    )
}