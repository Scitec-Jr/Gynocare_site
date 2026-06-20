import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";

export default function SiteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            <main className="pt-44 md:pt-0">
                {children}
            </main>
            <Footer />
        </>
    );
}