"use client";

import Image from "next/image";
import Link from "next/link";
import Chat from "./Chat";
import { navigationLinks } from "./Header/navigationLinks";

export default function Footer() {
	return (
		<footer className="bg-(--main-dark-color) text-white pt-8 p-4 md:px-8">
			<div className="flex flex-col md:flex-row justify-between gap-4 md:gap-8 max-w-360 mx-auto">
				<div className="flex justify-center items-center">
					<Image src={"/assets/global/logo2.png"} alt="Gynocare" width={300} height={150} className="mb-8" />
				</div>

				<div className="hidden md:flex flex-col">
					<h2 className="text-lg font-semibold">Navegação</h2>

					{navigationLinks.map((navLink) => (
						<Link key={navLink.href} href={navLink.href}>
							{navLink.label}
						</Link>
					))}
				</div>

				<div>
					<div className="flex flex-col mb-2">
						<h2 className="text-lg font-semibold">Central de Relacionamento</h2>

						<a href="https://wa.me/556133887310" target="_blank" className="underline">
							(61) 3388-7310
						</a>
						<a href="https://wa.me/5561981768838" target="_blank" className="underline">
							(61) 98176-8838
						</a>
						<a href="mailto:clinicagynocare.df@gmail.com" target="_blank" className="underline">
							clinicagynocare.df@gmail.com
						</a>
					</div>

					<div className="flex flex-col mb-2">
						<h2 className="text-lg font-semibold">Horário de Atendimento</h2>

						<p>Seg - Sex - 8h às 18h</p>
						<p>Sábados - 8h às 12h</p>
					</div>

					<div>
						<h2 className="text-lg font-semibold">Endereço</h2>
						<p className="max-w-80">Avenida Independência, Quadra 2, Bloco G - Planaltina/DF CEP: 73310-317</p>
					</div>
				</div>
			</div>

			<div className="max-w-360 mx-auto py-4">
				<small>© 2020 - CLÍNICA GYNOCARE - Todos os Direitos Reservados.</small>
			</div>

			<a href="tel:+556133887310" target="_blank" className="fixed bottom-6 right-28 sm:bottom-8 sm:right-28 z-40 p-3 sm:p-4 bg-(--main-color) rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all active:scale-95 cursor-pointer">
				<Image src={"/assets/icons/ringTel.png"} alt={"Contato"} width={32} height={32} />
			</a>

			<Chat />
		</footer>
	);
}
