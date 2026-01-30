import Image from "next/image";
import Link from "next/link";

export default function DoctorCard({name, graduation, image, description}: {name: string; graduation: string; image: string; description: string}) {
    return (
        <div className="mb-8">
            <h2 className="mb-4 text-2xl text-(--main-dark-color) title">Doutor <span className="text-(--main-color)">{name}</span></h2>

            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 mx-4 md:mx-8 mb-4">
                <div className="flex-1">
                    <h3 className="font-semibold">Sobre o doutor</h3>
                    <p className="zinc-500">{graduation}</p>

                    <p>{description}</p>
                </div>

                <div className="flex-1">
                    <Image src={image} alt="Doutor" width={400} height={400} />
                </div>
            </div>

            <Link href={"/agendar"} className="ms-4 md:ms-8 py-2 px-4 bg-(--main-color) text-white rounded-xl">Marcar Consulta</Link>
        </div>
    )
}