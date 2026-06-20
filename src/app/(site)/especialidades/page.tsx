import SpecialityCard from "@/components/Specialities/SpecialityCard";
import InfoCards from "@/components/InfoCards";
import { getSpecialitiesList } from "@/components/Specialities/specialities";

export default async function Specialities() {
    const specialitiesList = await getSpecialitiesList();

    return (
        <main>
            <section className="max-w-360 mx-auto py-4">
                <h1 className="mb-4 text-4xl text-(--main-color) title px-4 md:px-8">
                    Especialidades
                </h1>

                {specialitiesList.map((speciality) => (
                    <SpecialityCard
                        key={speciality.id}
                        name={speciality.name}
                        imageUrl={speciality.imageUrl}
                        url={speciality.url}
                        treatments={speciality.treatments}
                    />
                ))}
            </section>

            <InfoCards />
        </main>
    );
}