import SpecialityCard from "@/components/Specialities/SpecialityCard"
import InfoCards from "@/components/InfoCards"
import { specialitiesList } from "@/components/Specialities/specialities"

export default function Specialities() {
    return (
        <main>
            <section className="max-w-360 mx-auto py-4">
                <h1 className="mb-4 text-4xl text-(--main-color) title px-4 md:px-8">Especialidades</h1>

                {specialitiesList.map((speciality, index) => (
                    <SpecialityCard key={index} name={speciality.name} imageUrl={speciality.imageUrl} url={speciality.url} treatments={speciality.treatments} />
                ))}
            </section>

            <InfoCards />
        </main>
    )
}