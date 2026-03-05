import Image from "next/image";
import Link from "next/link";
import InfoCards from "@/components/InfoCards";
import Carousel from "@/components/Carousel";
import MedicalCareCard from "@/components/MedicalCare/MedicalCareCard";
import TestimonialFormWrapper from "@/components/TestimonialFormWrapper";

export default function Home() {
	return (
		<main>
			<section className="relative h-[calc(100vh-180px)] max-h-120 max-w-360 mx-auto mb-4">
				<Image src={"/assets/images/banner.png"} alt="Banner" width={1200} height={400} className="w-full h-full" />
				<div className="absolute inset-0 w-full h-full bg-(--main-dark-color) opacity-50"></div>

				<Link href={"/agendar"} className="absolute bottom-8 left-8 p-4 rounded-xl bg-(--main-color) text-white title shadow shadow-black">
					Marcar consulta
				</Link>
			</section>

			<section className="max-w-360 mx-auto mb-8 p-4 md:px-8">
				<h1 className="mb-4 text-2xl text-(--main-dark-color) text-center title">
					Quem <span className="text-(--main-color)">somos</span>
				</h1>

				<div className="flex justify-center md:justify-between flex-wrap gap-4 max-w-352 mx-auto mb-4">
					<div className="max-w-40 w-full">
						<Image src={"/assets/images/placeholder2.png"} alt="Placeholder" width={400} height={300} className="w-full" />
					</div>

					<div className="max-w-40 w-full">
						<Image src={"/assets/images/placeholder2.png"} alt="Placeholder" width={400} height={300} className="w-full" />
					</div>

					<div className="max-w-40 w-full">
						<Image src={"/assets/images/placeholder2.png"} alt="Placeholder" width={400} height={300} className="w-full" />
					</div>

					<div className="max-w-40 w-full">
						<Image src={"/assets/images/placeholder2.png"} alt="Placeholder" width={400} height={300} className="w-full" />
					</div>
				</div>

				<div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
					<div className="flex-1 text-center md:text-left">
						<p>Na Gynocare, entendemos que cuidar da saúde é um ato de amor-próprio. Nascemos do desejo de criar um espaço onde cada mulher se sinta segura, compreendida e verdadeiramente acolhida. Mais do que realizar exames, nossa missão é oferecer uma jornada de cuidado completa, com precisão, tecnologia de ponta e, acima de tudo, um atendimento humano e gentil. Nossa equipe é formada por especialistas dedicados que acreditam que a confiança é a base de qualquer diagnóstico. Por isso, investimos em um ambiente confortável e em uma comunicação clara e transparente, garantindo que você tenha tranquilidade em cada etapa do seu cuidado. Seu bem-estar é a nossa prioridade. Bem-vinda à Gynocare.</p>
					</div>

					<div className="relative flex justify-end flex-1 ps-8 pb-8">
						<Image src={"/assets/images/placeholder1.png"} alt="Placeholder" width={400} height={400} />

						<Image src={"/assets/images/placeholder2.png"} alt="Placeholder" width={200} height={200} className="absolute bottom-0 left-0 w-1/2 aspect-square" />
					</div>
				</div>
			</section>

			<section className="max-w-360 mx-auto mb-8 p-4 md:px-8">
				<h2 className="mb-4 text-2xl text-(--main-dark-color) text-center title">
					Nossos <span className="text-(--main-color)">Médicos</span>
				</h2>

				<Carousel>
					<div className="min-w-full md:min-w-auto items-center gap-4 md:flex-[0_0_100%] lg:flex-[0_0_50%] px-4">
						<div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-(--main-dark-color) rounded-xl">
							<div>
								<Image src={"/assets/images/placeholder2.png"} alt="Médico" width={200} height={200} />
							</div>

							<div className="text-white font-bold">
								<h3 className="mb-4">Nome médico</h3>
								<h3>Área de atuação</h3>
							</div>
						</div>
					</div>

					<div className="min-w-full md:min-w-auto items-center gap-4 md:flex-[0_0_100%] lg:flex-[0_0_50%] px-4">
						<div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-(--main-dark-color) rounded-xl">
							<div>
								<Image src={"/assets/images/placeholder2.png"} alt="Médico" width={200} height={200} />
							</div>

							<div className="text-white font-bold">
								<h3 className="mb-4">Nome médico</h3>
								<h3>Área de atuação</h3>
							</div>
						</div>
					</div>

					<div className="min-w-full md:min-w-auto items-center gap-4 md:flex-[0_0_100%] lg:flex-[0_0_50%] px-4">
						<div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-(--main-dark-color) rounded-xl">
							<div>
								<Image src={"/assets/images/placeholder2.png"} alt="Médico" width={200} height={200} />
							</div>

							<div className="text-white font-bold">
								<h3 className="mb-4">Nome médico</h3>
								<h3>Área de atuação</h3>
							</div>
						</div>
					</div>

					<div className="min-w-full md:min-w-auto items-center gap-4 md:flex-[0_0_100%] lg:flex-[0_0_50%] px-4">
						<div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-(--main-dark-color) rounded-xl">
							<div>
								<Image src={"/assets/images/placeholder2.png"} alt="Médico" width={200} height={200} />
							</div>

							<div className="text-white font-bold">
								<h3 className="mb-4">Nome médico</h3>
								<h3>Área de atuação</h3>
							</div>
						</div>
					</div>
				</Carousel>

				<Link href={"/nossos-medicos"} className="block w-fit mx-auto py-2 px-4 md:py-4 bg-(--main-color) md:text-xl text-white title rounded-full md:rounded-xl">
					Saiba mais
				</Link>
			</section>

			<section className="relative max-w-360 mx-auto mb-8 py-16 px-4 md:py-8 md:px-8 bg-(--main-dark-color)">
				<h2 className="relative mb-4 text-2xl text-(--main-color) text-center title z-index-10">
					Nossas <span className="text-white">Especialidades</span>
				</h2>

				<div className="flex flex-wrap justify-center gap-4 md:gap-8 max-w-300 mx-auto">
					<Image src={"/assets/images/placeholder1.png"} alt="Placeholder" width={400} height={300} className="absolute inset-0 md:static md:block md:max-w-72 w-full h-full opacity-20 md:opacity-100" />

					<Image src={"/assets/images/placeholder1.png"} alt="Placeholder" width={400} height={300} className="hidden md:block max-w-72 w-full" />

					<Image src={"/assets/images/placeholder1.png"} alt="Placeholder" width={400} height={300} className="hidden md:block max-w-72 w-full" />

					<Image src={"/assets/images/placeholder1.png"} alt="Placeholder" width={400} height={300} className="hidden md:block max-w-72 w-full" />

					<Image src={"/assets/images/placeholder1.png"} alt="Placeholder" width={400} height={300} className="hidden md:block max-w-72 w-full" />

					<Link href={"/especialidades"} className="relative flex items-center justify-center py-2 px-4 md:max-w-72 md:w-full md:aspect-square bg-(--main-color) md:bg-(--main-light-color) text-white title rounded-full md:rounded-none shadow-black shadow md:shadow-none z-index-10">
						<span className="md:text-2xl">Veja Todas</span>
					</Link>
				</div>
			</section>

			<section className="max-w-360 mx-auto mb-8 p-4 md:px-8">
				<h2 className="mb-4 text-2xl text-(--main-dark-color) text-center title">
					Depoimento de <span className="text-(--main-color)">Pacientes</span>
				</h2>

				<TestimonialFormWrapper />
			</section>

			<section className="relative max-w-360 mx-auto py-16 px-4 md:py-8 md:px-8 bg-(--main-dark-color)">
				<h2 className="relative mb-4 text-2xl text-(--main-color) text-center title z-10">
					Nossos <span className="text-white">Procedimentos</span>
				</h2>

				<Image src={"/assets/images/placeholder1.png"} alt="Placeholder" width={400} height={300} className="absolute inset-0 w-full h-full opacity-20" />

				<Link href={"/procedimentos"} className="relative block w-fit mx-auto py-2 px-4 md:py-4 bg-(--main-color) md:text-xl text-white title rounded-full md:rounded-xl z-10">
					Saiba mais
				</Link>
			</section>

			<hr className="max-w-360 w-4/5 mx-auto mb-8 opacity-5 border" />

			<section className="max-w-360 mx-auto mb-8 p-4 md:px-8">
				<h2 className="mb-4 text-2xl text-(--main-dark-color) text-center title">
					Convênios <span className="text-(--main-color)">Aceitos</span>
				</h2>

				<Carousel showDots={false}>
					{Array.from({ length: 39 }, (_, i) => (
						<div key={i + 1} className="min-w-auto items-center gap-4 md:flex-[0_0_25%] lg:flex-[0_0_10%] p-4">
							<MedicalCareCard medicalCareId={i + 1} />
						</div>
					))}
				</Carousel>

				<Link href={"/procedimentos"} className="block w-fit mx-auto py-2 px-4 bg-(--main-color) text-white title rounded-xl">
					Saiba mais
				</Link>
			</section>

			<InfoCards />
		</main>
	);
}
