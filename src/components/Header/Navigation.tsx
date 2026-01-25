import Link from "next/link";
import Image from "next/image";
import { navigationLinks } from "./navigationLinks";

export default function Navigation() {
    return (
        <nav className="flex items-center gap-4 lg:gap-8 p-4 md:px-8 text-(--main-color) title">
            <div className="mr-auto">
                <Image src={"/assets/global/logo.png"} alt={"Gynocare"} width={200} height={100} />
            </div>

            {navigationLinks.map((navLink) => (
                <Link key={navLink.href} href={navLink.href}>
                    {navLink.label}
                </Link>
            ))}
        </nav>
    )
}