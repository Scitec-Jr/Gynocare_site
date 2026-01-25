import "./globals.css";
import {inter, konkhmerSleokchher} from "../../public/fonts/fonts";
import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";

export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <html lang="pt" className={`${inter.variable} ${konkhmerSleokchher.variable}`} suppressHydrationWarning>
            <body className="pt-44 md:pt-0">
                <Header></Header>
                {children}
                <Footer></Footer>
            </body>
        </html>
    )
}