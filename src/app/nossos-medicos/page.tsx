import InfoCards from "@/components/InfoCards"
import DoctorCard from "@/components/Doctors/DoctorCard"
import { doctorsList } from "@/components/Doctors/doctors"

export default function OurDoctors() {
    return (
        <main>
            <section className="max-w-360 mx-auto p-4 md:px-8">
                <h1 className="mb-4 text-4xl text-(--main-dark-color) title">Nossos <span className="text-(--main-color)">Médicos</span></h1>

                {doctorsList.map((doctor, index) => (
                    <DoctorCard key={index} name={doctor.name} graduation={doctor.graduation} image={doctor.image} description={doctor.description} />
                ))}
            </section>

            <InfoCards />
        </main>
    )
}