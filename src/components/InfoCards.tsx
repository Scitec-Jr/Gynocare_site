import Image from "next/image";

export default function InfoCards() {
    return (
        <section className="flex flex-wrap justify-center gap-8 max-w-360 mx-auto mb-8 p-4 md:px-8">
            <div className="flex flex-col items-center max-w-80 min-w-40 flex-1">
                <Image src={"/assets/icons/schedule.png"} alt="Agendar" width={52} height={52} className="mb-4"/>

                <h2 className="mb-4 text-(--main-color) text-center"><span className="text-(--main-dark-color)">MARQUE</span> SUA CONSULTA</h2>

                <a href="https://wa.me/5561981768838" target="_blank" className="text-(--main-color) font-semibold">Clique aqui</a>
                <p className="text-zinc-500 text-center">para marcar sua consulta pelo Whatsapp - (61) 98176-8838</p>
            </div>

            <div className="flex flex-col items-center max-w-80 min-w-40 flex-1">
                <Image src={"/assets/icons/medTel.png"} alt="Ligar" width={52} height={52} className="mb-4"/>

                <h2 className="mb-4 text-(--main-color) text-center"><span className="text-(--main-dark-color)">CENTRAL</span> DE RELACIONAMENTO</h2>

                <a href="https://wa.me/556133887310" target="_blank" className="text-(--main-color) font-semibold">(61) 3388-7310</a>
                <p className="text-zinc-500 text-center">Ligue e marque sua consulta</p>
            </div>

            <div className="flex flex-col items-center max-w-80 min-w-40 flex-1">
                <Image src={"/assets/icons/clock.png"} alt="Horários" width={52} height={52} className="mb-4"/>

                <h2 className="mb-4 text-(--main-color) text-center"><span className="text-(--main-dark-color)">HORÁRIO</span> DE ATENDIMENTO</h2>

                <p className="text-zinc-500"><span className="text-(--main-color) font-semibold text-center">Seg - Sex</span> - 8hs às 18hs</p>
                <p className="text-zinc-500"><span className="text-(--main-color) font-semibold text-center">Sábados</span> - 8hs às 12hs</p>
            </div>
        </section>
    )
}