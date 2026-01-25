import Image from "next/image";
import Link from "next/link";
import Navigation from "./Navigation";
import MobileNavigation from "./MobileNavigation";

export default function Header() {
    return (
        <header className="fixed top-0 md:static w-full">
            <div className="max-w-360 mx-auto">
                <div className="flex items-center gap-4 md:gap-8 p-4 md:px-8 bg-(--main-dark-color)">
                    <a href="">
                        <Image src={"/assets/icons/instagram.png"} alt={"Instagram"} width={24} height={24} />
                    </a>

                    <a href="">
                        <Image src={"/assets/icons/facebook.png"} alt={"Facebook"} width={24} height={24} />
                    </a>

                    <a href="">
                        <Image src={"/assets/icons/linkedin.png"} alt={"Linkedin"} width={24} height={24} />
                    </a>

                    <a href="">
                        <Image src={"/assets/icons/tel.png"} alt={"Telefone"} width={24} height={24} />
                    </a>

                    <Link href={"/agendar"} className="ms-auto py-2 px-4 bg-(--main-light-color) rounded-full text-(--main-dark-color) title">Agendamento</Link>
                </div>

                {/* Nav Mobile */}
                <div className="block md:hidden">
                    <MobileNavigation></MobileNavigation>
                </div>

                {/* Nav */}
                <div className="hidden md:block">
                    <Navigation></Navigation>
                </div>
            </div>
        </header>
    )
}