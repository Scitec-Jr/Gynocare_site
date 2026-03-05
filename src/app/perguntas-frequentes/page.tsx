import InfoCards from "@/components/InfoCards"
import DropdownFAQ from "@/components/FAQ/DropdownFAQ"
import { faqAnswers } from "@/components/FAQ/faqAnswers"

export default function FAQ() {
    return (
        <main>
            <section className="max-w-360 mx-auto p-4 md:px-8">
                <h1 className="text-4xl text-(--main-dark-color) text-center md:text-left title">Perguntas <span className="text-(--main-color)">Frequentes</span></h1>
                <p className="text-zinc-400 title">Ficou com alguma dúvida?</p>
                <p className="mb-4 text-zinc-400 title">Dê uma olhada nas perguntas mais frequentes, talvez a resposta que você procura esteja aqui!</p>

                {faqAnswers.map((faq, index) => (
                    <DropdownFAQ key={index} title={faq.title} answers={faq.answers} />
                ))}
            </section>

            <InfoCards />
        </main>
    )
}