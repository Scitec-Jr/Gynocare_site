export type Treatments = {
    slug: string
    name: string
    information: string
    preparation: string
}

export type Procedure = {
    slug: string
    name: string
    treatments: Treatments[]
}

export const procedures: Procedure[] = [
    {
<<<<<<< HEAD
        slug: "ecografias-pediatricas",
        name: "Ecografias Pediátricas",
        treatments: [
            {
                slug: "abdome-infantil-para-refluxo",
                name: "Abdome infantil para refluxo",
                information: "Esse exame avalia se o conteúdo do estômago está voltando para o esôfago, o que chamamos de refluxo. Ele é feito com o bebê ou criança acordados, geralmente logo após uma mamada ou ingestão de líquido. A ecografia permite observar o funcionamento do estômago e da junção com o esôfago em tempo real, de forma segura e sem radiação. É especialmente útil em casos de regurgitação frequente, choro excessivo, perda de peso ou irritabilidade após as refeições.",
                preparation: "a criança deve trazer mamadeira ou alimento líquido habitual, pois o exame é realizado durante ou após a alimentação."
            },
            {
                slug: "abdome-total-infantil",
                name: "Abdome total infantil",
                information: "A ecografia de abdome infantil é um exame de imagem que permite avaliar com detalhes os órgãos internos da criança, como fígado, rins, bexiga, intestinos, baço, pâncreas e vesícula biliar. É indicada para investigar dores abdominais, vômitos, distensão da barriga, alterações urinárias, presença de nódulos, massas, infecções ou malformações. É um exame indolor, sem uso de radiação, ideal para crianças de todas as idades e muito importante no diagnóstico precoce de diversas condições.",
                preparation: "jejum de aproximadamente 3 horas, conforme idade da criança. (consultar perguntas mais frequentes)"
            },
            {
                slug: "aparelho-urinario",
                name: "Aparelho urinário",
                information: "Este exame avalia rins, ureteres, bexiga. É muito utilizado em crianças para investigar infecções urinárias de repetição, malformações congênitas, alterações na micção, dor abdominal ou inchaço. Ajuda a identificar problemas como dilatação nos rins, refluxo urinário, má-formação das vias urinárias ou cálculo renal. É um exame indolor, rápido e essencial para o diagnóstico precoce de alterações urinárias na infância.",
                preparation: "ingestão de líquidos antes do exame para manter a bexiga cheia."
            },
            {
                slug: "avaliacao-de-sinovite-transitoria",
                name: "Avaliação de sinovite transitória",
                information: "A ecografia é um exame muito útil na avaliação da sinovite transitória, uma inflamação temporária da membrana que reveste as articulações, mais comum no quadril de crianças entre 3 e 10 anos. Ela é geralmente provocada por infecções virais leves e pode causar dor, claudicação (mancar) ou recusa em andar. A ultrassonografia permite visualizar o aumento de líquido na articulação, típico dessa condição, ajudando a diferenciar de outras causas mais graves, como artrite séptica. É um exame seguro, rápido e essencial para o acompanhamento clínico e para orientar a conduta médica com tranquilidade para os pais.",
                preparation: "não necessita preparo."
            },
            {
                slug: "bolsa-testicular",
                name: "Bolsa testicular",
                information: "A ecografia testicular é um exame fundamental para avaliar os testículos, epidídimos e cordões espermáticos em meninos de todas as idades. É indicada em casos de dor, inchaço, assimetrias, trauma, suspeita de torção testicular, presença de caroços ou dúvidas quanto ao posicionamento dos testículos (criptorquidia). O estudo com Doppler permite avaliar o fluxo sanguíneo local, sendo especialmente útil na investigação de varicocele, inflamações e no acompanhamento do desenvolvimento puberal, ao observar mudanças vasculares típicas da puberdade. Trata-se de um exame rápido, seguro e essencial para preservar a saúde reprodutiva masculina desde cedo.",
                preparation: "não necessita preparo."
=======
        slug: "medicina-interna",
        name: "Medicina Interna",
        treatments: [
            {
                slug: "transfontanelar",
                name: "Transfontanelar",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "suturas-cranianas",
                name: "Suturas Cranianas",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
>>>>>>> 68d0fc457e0dcc02901ce7e333b3b016119605c7
            },
            {
                slug: "cervical",
                name: "Cervical",
<<<<<<< HEAD
                information: "A ecografia cervical em crianças permite a avaliação detalhada das estruturas do pescoço, como linfonodos (gânglios), glândulas salivares, tireoide, músculos e vasos sanguíneos. É muito útil na investigação de inchaços, caroços, infecções, assimetrias cervicais e alterações visíveis na região. Tem papel importante também no diagnóstico do torcicolo congênito, que é o encurtamento ou rigidez de um músculo do pescoço,  causando inclinação da cabeça desde o nascimento. Trata-se de um exame seguro, indolor e sem radiação, essencial para orientar o tratamento precoce e evitar sequelas posturais.",
                preparation: "não necessita preparo."
            },
            {
                slug: "coluna",
                name: "Coluna",
                information: "A ecografia da coluna em recém-nascidos e lactentes é um exame importante para avaliar a medula espinhal e as estruturas do canal vertebral enquanto a ossificação posterior ainda não está completa. É indicada na investigação de alterações congênitas, como disrafismos espinhais, medula presa, lipomas, cistos ou alterações cutâneas na região lombossacra. É um exame seguro, indolor e sem radiação, com grande utilidade no diagnóstico precoce de alterações neurológicas e estruturais.",
                preparation: "não necessita preparo."
            },
            {
                slug: "mamaria-infantil",
                name: "Mamária infantil",
                information: "A ecografia mamária em crianças e adolescentes é utilizada para avaliar alterações nas mamas, como nódulos, assimetrias, dor ou crescimento precoce. É indicada tanto em meninas quanto em meninos, especialmente durante a puberdade, para distinguir entre alterações benignas, como o desenvolvimento glandular normal, e possíveis cistos ou inflamações. É um exame indolor, sem radiação, que oferece segurança e precisão, ajudando a tranquilizar a família e orientar o pediatra ou endocrinologista sobre a conduta mais adequada.",
                preparation: "não necessita preparo."
            },
            {
                slug: "pelvica-infantil",
                name: "Pélvica infantil",
                information: "A ecografia pélvica infantil é usada para avaliar os órgãos da pelve em meninas, como útero, ovários e bexiga, e em meninos, quando necessário, para estudar estruturas próximas. É especialmente indicada em casos de puberdade precoce ou tardia, dor abdominal, alterações hormonais ou suspeita de cistos, massas e malformações. O exame é feito com a bexiga cheia, de forma indolor, e fornece informações importantes sobre o desenvolvimento e funcionamento dos órgãos reprodutivos e urinários.",
                preparation: "ingestão de líquidos para manter a bexiga cheia."
            },
            {
                slug: "quadril-rn-displasia-do-desenvolvimento)",
                name: "Quadril (RN – displasia do desenvolvimento)",
                information: "A ecografia de quadril em recém-nascidos é um exame essencial para detectar precocemente a Displasia do Desenvolvimento do Quadril (DDQ), uma condição em que a articulação entre o fêmur e o osso do quadril não se forma corretamente. É indicada especialmente em bebês com fatores de risco (como parto pélvico, histórico familiar ou bebês do sexo feminino) ou quando há suspeita clínica de instabilidade na articulação. É um exame indolor, sem radiação e altamente eficaz quando realizado nos primeiros meses de vida. O diagnóstico precoce permite tratamento conservador e evita complicações futuras, como dor e dificuldade para caminhar.",
                preparation: "não necessita preparo."
            },
            {
                slug: "regiao-inguinal-bilateral",
                name: "Região inguinal bilateral",
                information: "A ecografia da região inguinal é especialmente útil para avaliar hérnias inguinais, linfonodos aumentados, dor ou abaulamentos locais. Em crianças, ajuda a identificar hérnias com conteúdo intestinal ou gorduroso, além de acompanhar casos pós-operatórios ou diferenciar hérnias de outras massas superficiais. É um exame simples, dinâmico, indolor e muito importante para o diagnóstico correto da região inguinal.",
                preparation: "não necessita preparo."
            },
            {
                slug: "suturas-cranianas",
                name: "Suturas cranianas",
                information: "A ultrassonografia das suturas cranianas é um exame utilizado para avaliar as suturas do crânio do bebê, que são as articulações naturais entre os ossos da cabeça. Permite verificar se essas suturas estão abertas e se o crescimento craniano está ocorrendo de forma adequada. É indicada principalmente quando há alterações no formato da cabeça, assimetrias cranianas ou suspeita de craniossinostose (fechamento precoce das suturas). Trata-se de um exame seguro, rápido, indolor e sem radiação, ideal para recém-nascidos e lactentes.",
                preparation: "não necessita preparo."
=======
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
>>>>>>> 68d0fc457e0dcc02901ce7e333b3b016119605c7
            },
            {
                slug: "tireoide",
                name: "Tireoide",
<<<<<<< HEAD
                information: "A ecografia da tireoide em crianças avalia o tamanho, a forma e a estrutura dessa glândula localizada na parte anterior do pescoço. É indicada quando há suspeita de alterações hormonais, aumento visível da região (bócio), nódulos, histórico familiar de doenças da tireoide ou doenças autoimunes, como a tireoidite de Hashimoto. O exame é rápido, não invasivo e indolor, sendo fundamental para acompanhar o crescimento e a saúde hormonal infantil com segurança e precisão.",
                preparation: "não necessita preparo."
            },
            {
                slug: "transfontanela",
                name: "Transfontanela",
                information: "A ecografia de transfontanela é um exame feito em bebês, geralmente até ao redor de 9 meses, enquanto as “molinhas” (fontanelas) da cabeça ainda estão abertas. Por meio delas, é possível visualizar o cérebro do bebê sem precisar de sedação ou radiação. Serve para avaliar o desenvolvimento neurológico, investigar malformações, sangramentos, infecções ou alterações no fluxo sanguíneo cerebral. É um exame seguro, rápido e indolor, muito útil no acompanhamento do recém-nascido, principalmente em prematuros.",
                preparation: "não necessita preparo."
            },
        ]
    },
    {
        slug: "ecografias-obstetricas",
        name: "Ecografias Obstétricas",
        treatments: [
            {
                slug: "avaliacao-do-colo-uterino",
                name: "Avaliação do colo uterino",
                information: "A ecografia para avaliação do colo uterino durante a gestação é feita, preferencialmente, por via transvaginal, e tem como objetivo principal verificar o comprimento do colo uterino e detectar sinais de risco para parto prematuro. É indicada especialmente em mulheres com histórico de partos prematuros, cirurgias uterinas prévias ou sintomas sugestivos de encurtamento do colo. O exame é rápido, indolor e muito importante para a prevenção de complicações, permitindo intervenções precoces, como o uso de progesterona ou cerclagem, quando necessário.",
                preparation: "geralmente realizado por via transvaginal, sem preparo específico."
            },
            {
                slug: "gestacional",
                name: "Gestacional",
                information: "A ultrassonografia gestacional pode ser realizada em diferentes fases da gravidez para avaliar o desenvolvimento do bebê e as condições do útero e da placenta. Permite confirmar a presença da gestação, acompanhar o crescimento fetal, avaliar líquido amniótico, posição da placenta e bem-estar do bebê. É um exame seguro, indolor e fundamental para o acompanhamento da gestação, auxiliando o médico a monitorar a evolução da gravidez em cada fase.",
                preparation: "geralmente não é necessário preparo específico. É importante, trazer o cartão de pré-natal e ecografias anteriores."
            },
            {
                slug: "gestacional-com-doppler",
                name: "Gestacional com Doppler",
                information: "O Doppler obstétrico é uma técnica complementar à ultrassonografia que avalia o fluxo sanguíneo entre a mãe, a placenta e o bebê, principalmente nas artérias uterinas, umbilicais e cerebrais fetais. Ele é fundamental para monitorar a oxigenação e nutrição do bebê, especialmente em gestações com risco de pré-eclâmpsia, restrição de crescimento fetal, hipertensão, diabetes ou gestações múltiplas. O exame é seguro, não invasivo e ajuda a identificar precocemente situações que possam exigir um acompanhamento mais próximo ou intervenção médica, protegendo a saúde da mãe e do bebê.",
                preparation: "geralmente não é necessário preparo específico. É importante, trazer o cartão de pré-natal e ecografias anteriores."
            },
            {
                slug: "gestacional-inicial",
                name: "Gestacional inicial",
                information: "A ecografia no início da gestação (geralmente entre 5 e 12 semanas) tem papel fundamental para confirmar se a gravidez está se desenvolvendo no útero e se o embrião apresenta batimentos cardíacos. Ela permite estimar a idade gestacional com precisão, avaliar o número de embriões, detectar possíveis sangramentos ou alterações iniciais e tranquilizar a gestante quanto à viabilidade da gravidez. Pode ser feita por via abdominal ou, com maior sensibilidade, por via transvaginal. É segura, indolor e essencial para um bom acompanhamento pré-natal desde o início.",
                preparation: "geralmente não necessita preparo específico. É importante, trazer o cartão de pré-natal e ecografias anteriores."
            },
            {
                slug: "morfologico-1-trimestre",
                name: "Morfológico 1º trimestre",
                information: "A ecografia morfológica do 1º trimestre é realizada aproximadamente entre 11 e 14 semanas de gestação e é um dos exames mais importantes do pré-natal. Ela avalia de forma detalhada a anatomia inicial do bebê, o desenvolvimento dos órgãos, a placenta, o colo do útero, além dos fluxos de algumas estruturas, fornecendo detalhes importantes da anatomia fetal. Além disso, avalia marcadores, podem ajudar a estimar o risco de síndromes genéticas. Também auxilia na avaliação do risco para pré-eclâmpsia. É um exame não invasivo, feito por via abdominal ou transvaginal, que contribui para a detecção precoce de alterações e para um acompanhamento mais seguro da gestação.",
                preparation: "geralmente não é necessário preparo específico. É importante, trazer o cartão de pré-natal e ecografias anteriores."
            },
            {
                slug: "morfologico-2-trimestre",
                name: "Morfológico 2º trimestre",
                information: "A ecografia morfológica do 2º trimestre é realizada entre 20 e 24 semanas de gestação (20 a 22 semanas em gestações gemelares) e é considerada o principal exame de avaliação anatômica fetal. Ela permite observar, com riqueza de detalhes, o desenvolvimento dos principais órgãos e estruturas do bebê: cérebro, face, coração, coluna, pulmões, rins, estômago, membros, além da placenta, líquido amniótico e colo do útero. Também pode identificar sinais de risco para parto prematuro e malformações estruturais. É um exame completo, indolor, feito por via abdominal, com complementação via transvaginal, que proporciona informações fundamentais para a saúde do bebê e tranquilidade à família.",
                preparation: "geralmente não é necessário preparo específico. É importante, trazer o cartão de pré-natal e ecografias anteriores."
            },
            {
                slug: "neurossonografia-fetal",
                name: "Neurossonografia fetal",
                information: "A neurossonografia é uma ultrassonografia especializada do sistema nervoso central do bebê. Ela permite avaliar com detalhes o encéfalo, os ventrículos, as estruturas cerebrais profundas e a circulação, sendo essencial na investigação de malformações, hemorragias, infecções congênitas (como toxoplasmose e citomegalovírus) ou alterações do desenvolvimento neurológico. Trata-se de um exame seguro, indolor e de alta sensibilidade, que fornece informações valiosas para o diagnóstico precoce e acompanhamento neurológico da criança.",
                preparation: "geralmente não é necessário preparo específico. É importante, trazer o cartão de pré-natal e ecografias anteriores."
            },
        ]
    },
    {
        slug: "ecografias-ginecologicas-pelve",
        name: "Ecografias Ginecológicas (Pelve)",
        treatments: [
            {
                slug: "avaliacao-de-diu-3d",
                name: "Avaliação de DIU 3D",
                information: "A ultrassonografia 3D para avaliação do DIU (dispositivo intrauterino) é um exame moderno e altamente preciso, que permite visualizar o posicionamento exato do DIU dentro da cavidade uterina, inclusive em cortes coronais, impossíveis na imagem 2D convencional. É indicada para verificar se o DIU está corretamente implantado, especialmente em casos de dor, sangramento, dificuldade para localizar os fios ou controle de rotina após a inserção. Trata-se de um exame rápido, seguro, indolor e extremamente útil para garantir a eficácia do método contraceptivo e a segurança da paciente.",
                preparation: "pode ser necessário leve enchimento da bexiga."
            },
            {
                slug: "contagem-de-foliculos",
                name: "Contagem de folículos",
                information: "A contagem de folículos antrais é realizada por meio da ultrassonografia transvaginal e permite avaliar a chamada reserva ovariana, ou seja, a quantidade aproximada de óvulos disponíveis nos ovários. Esse exame é especialmente importante para mulheres que estão planejando engravidar, investigando dificuldades para concepção ou acompanhando tratamentos de fertilidade. Durante o exame, são identificados e contados pequenos folículos presentes nos ovários, que correspondem aos óvulos em fase inicial de desenvolvimento. É um exame seguro, rápido e que fornece informações importantes para orientar o planejamento reprodutivo e a conduta médica.",
                preparation: "preferencialmente realizado nos primeiros dias do ciclo menstrual (geralmente entre o 2º e o 5º dia). Não é necessário outro preparo específico. Se possível, trazer exames ginecológicos ou ecografias anteriores."
            },
            {
                slug: "doppler-ginecologico",
                name: "Doppler ginecológico",
                information: "O Doppler ginecológico é uma modalidade da ultrassonografia que avalia o fluxo sanguíneo nos órgãos pélvicos femininos, como útero e ovários. É especialmente útil no acompanhamento de miomas, tumores, cistos complexos, endometriose e alterações vasculares, ajudando a diferenciar lesões benignas e suspeitas, além de auxiliar em tratamentos hormonais ou de fertilidade. Trata-se de um exame seguro, indolor e altamente informativo, que complementa a ultrassonografia convencional com dados sobre a vascularização das estruturas estudadas.",
                preparation: "geralmente sem preparo específico."
            },
            {
                slug: "transabdominal",
                name: "Transabdominal",
                information: "A ultrassonografia pélvica é um exame realizado por via abdominal para avaliar os principais órgãos do sistema reprodutor feminino: útero, ovários, endométrio e anexos. É indicada para investigar cólicas, alterações menstruais, sangramentos, miomas, cistos ovarianos, pólipos, endometriose, infertilidade ou simplesmente para o acompanhamento ginecológico de rotina. Trata-se de um exame não invasivo, seguro e de fácil realização, que fornece informações valiosas para o diagnóstico e acompanhamento da saúde da mulher em todas as fases da vida.",
                preparation: "bexiga cheia."
            },
            {
                slug: "transvaginal",
                name: "Transvaginal",
                information: "A ultrassonografia transvaginal é um exame ginecológico realizado com uma sonda fina introduzida na vagina, permitindo uma visualização mais próxima e detalhada dos órgãos pélvicos: útero, endométrio, ovários, trompas (quando dilatadas) e colo do útero. É indicada para investigar alterações menstruais, dor pélvica, sangramentos anormais, cistos, miomas, pólipos, além de ser essencial no acompanhamento de tratamentos hormonais, fertilidade e nas fases iniciais da gestação. Trata-se de um exame seguro, indolor e de alta precisão, feito com total cuidado e respeito à paciente, oferecendo informações fundamentais para o diagnóstico ginecológico e obstétrico.",
                preparation: "esvaziar a bexiga antes do exame."
            },
            {
                slug: "transvaginal-3d",
                name: "Transvaginal 3D",
                information: "A ultrassonografia transvaginal em 3D é uma técnica avançada que permite visualizar o útero e outras estruturas pélvicas de forma mais detalhada e em três dimensões. Ela é especialmente útil na avaliação da anatomia uterina, podendo ajudar na identificação de alterações como malformações uterinas, pólipos, miomas ou alterações da cavidade uterina. Essa tecnologia permite ao médico analisar a estrutura do útero com maior precisão, contribuindo para diagnósticos mais completos e melhor planejamento de tratamentos. É um exame seguro, indolor e realizado com o mesmo cuidado e conforto da ultrassonografia transvaginal convencional.",
                preparation: "geralmente não é necessário preparo específico. Se possível, trazer exames ginecológicos ou ecografias anteriores."
            },
            {
                slug: "transpubiana",
                name: "Transpubiana",
                information: "A ultrassonografia transpubiana é um exame utilizado para avaliar estruturas da pelve inferior, especialmente a uretra e a bexiga. É frequentemente indicada na investigação de perdas urinárias, escapes ou gotejamento de urina, além da avaliação de possíveis malformações do trato urinário. Por meio do exame, é possível analisar a posição da bexiga, o comportamento da uretra e determinados ângulos anatômicos que auxiliam o médico na identificação de alterações no suporte da bexiga ou no funcionamento da uretra. Trata-se de um exame seguro, rápido e não invasivo, que contribui para a investigação das causas da perda urinária e para o acompanhamento clínico, auxiliando na definição da melhor conduta médica com mais segurança e tranquilidade para a paciente.",
                preparation: "geralmente não é necessário preparo específico. Se possível, trazer exames urológicos ou ecografias anteriores."
            },
        ]
    },
    {
        slug: "ecografias-urologicas-masculinas",
        name: "Ecografias Urológicas / Masculinas",
        treatments: [
            {
                slug: "bolsa-testicular",
                name: "Bolsa testicular",
                information: "A ultrassonografia testicular é o principal exame para avaliar os testículos, epidídimos e estruturas ao redor, sendo indicada em casos de dor, inchaço, nódulos, trauma ou suspeita de torção testicular. Também é utilizada para investigar varicocele, hidrocele, cistos, infecções e, com o Doppler, permite avaliar o fluxo sanguíneo, o que é essencial em situações de urgência. É um exame rápido, indolor e extremamente preciso, fundamental para o diagnóstico seguro das condições testiculares em homens de todas as idades.",
                preparation: "não necessita preparo."
            },
            {
                slug: "prostata-via-abdominal",
                name: "Próstata (via abdominal)",
                information: "A ultrassonografia da próstata por via abdominal é um exame não invasivo realizado com a bexiga cheia, que permite avaliar o tamanho, a forma e a estrutura da próstata, além de medir o volume urinário residual após a micção. É indicada principalmente para homens com queixas como jato urinário fraco, sensação de esvaziamento incompleto, aumento do número de micções ou desconforto ao urinar, ajudando no diagnóstico de hiperplasia prostática benigna e outras alterações. É um exame simples, rápido e confortável, que fornece informações iniciais importantes para o cuidado urológico masculino.",
                preparation: "bexiga cheia."
            },
            {
                slug: "rins-e-vias-urinarias-com-residuo-pos-miccional",
                name: "Rins e vias urinárias com resíduo pós-miccional",
                information: "A ultrassonografia dos rins e vias urinárias permite avaliar, com detalhes, os rins, pelves renais e ureteres (quando dilatados), além da bexiga. É indicada para investigar dor lombar, infecção urinária de repetição, sangue na urina, suspeita de cálculos, dilatações, cistos, malformações e doenças renais crônicas. É um exame indolor, rápido e seguro, essencial tanto para diagnósticos iniciais quanto para acompanhamento de alterações já conhecidas no sistema urinário.",
                preparation: "bexiga cheia."
            },
        ]
    },
    {
        slug: "ecografias-gerais-e-de-partes-moles",
        name: "Ecografias Gerais e de Partes Moles",
        treatments: [
            {
                slug: "abdome-superior-e-abdome-total",
                name: "Abdome superior e abdome total",
                information: "A ultrassonografia de abdome total é um exame completo que avalia diversos órgãos da cavidade abdominal, como fígado, vesícula biliar, vias biliares, pâncreas, baço, rins, bexiga, adrenais e grandes vasos, além de identificar líquido livre ou massas. É indicada para investigar dores abdominais, náuseas, alterações nos exames laboratoriais, palpação de massas, aumento de órgãos, entre outros sintomas, sendo um dos exames mais solicitados na prática clínica. Trata-se de um exame não invasivo, rápido e indolor, que oferece uma visão ampla da saúde abdominal, contribuindo para diagnósticos precoces e acompanhamento de diversas doenças.",
                preparation: "jejum de 6 a 8 horas."
            },
            {
                slug: "axilas",
                name: "Axilas",
                information: "A ultrassonografia das axilas é utilizada para avaliar os linfonodos (gânglios linfáticos) e outras estruturas da região axilar, sendo um exame importante tanto em situações de rotina quanto em investigações específicas. É indicada para investigar nódulos, dor, inchaço, infecções, suspeita de linfonodos aumentados ou alterações relacionadas à mama, especialmente em pacientes com histórico de câncer de mama ou infecções recorrentes. O exame permite analisar o formato, tamanho e vascularização dos linfonodos, ajudando a diferenciar causas benignas e suspeitas com sensibilidade e segurança. Trata-se de um exame rápido, indolor e livre de radiação, que contribui para diagnósticos mais precisos e acompanhamentos clínicos eficazes.",
                preparation: "não necessita preparo."
            },
            {
                slug: "hernias",
                name: "Hérnias",
                information: "A ultrassonografia é uma ferramenta precisa e não invasiva para identificar e caracterizar hérnias abdominais e inguinais, avaliando seu conteúdo, localização e comportamento dinâmico, como o aumento com esforço ou manobra de Valsalva. É indicada em casos de dor local, abaulamentos, desconforto abdominal ou inguinal, e também no acompanhamento de hérnias já conhecidas ou no planejamento cirúrgico. Permite diferenciar hérnias de outras lesões de partes moles, identificar sinais de encarceramento e avaliar se há comprometimento de alças intestinais ou gordura intra-abdominal. É um exame seguro, rápido e essencial para o diagnóstico correto de hérnias e definição da melhor conduta médica.",
                preparation: "não necessita preparo."
            },
            {
                slug: "mama",
                name: "Mama",
                information: "A ultrassonografia mamária é um exame fundamental para a avaliação da saúde das mamas, sendo indicada para mulheres de todas as idades, especialmente em casos de dor, nódulos, secreções ou alterações percebidas no autoexame ou na mamografia. O exame permite diferenciar nódulos sólidos de cistos, acompanhar lesões benignas e auxiliar na detecção precoce de alterações suspeitas. Também é utilizada na avaliação das mamas masculinas, especialmente em casos de ginecomastia, dor, aumento do volume mamário ou presença de nódulos, oferecendo um diagnóstico seguro e não invasivo. É um exame rápido, indolor, sem radiação e com alta sensibilidade, essencial para o acompanhamento da saúde mamária em homens e mulheres.",
                preparation: "não necessita preparo. É muito importante trazer exames anteriores (mamografias e ecografias)"
            },
            {
                slug: "parede-abdominal",
                name: "Parede abdominal",
                information: "A ultrassonografia da parede abdominal é indicada para investigar dores, nódulos, abaulamentos, hematomas, hérnias ou alterações visíveis na superfície abdominal. Esse exame permite avaliar camadas musculares, tecido subcutâneo, cicatrizes cirúrgicas e possíveis coleções líquidas ou infecções locais, como abscessos. Também é fundamental na investigação de hérnias incisionais e traumas. Por ser um exame dinâmico, pode ser realizado com manobras, como esforço ou tosse, para verificar alterações que só aparecem com aumento da pressão intra-abdominal. É rápido, indolor e muito útil para diagnósticos precisos, ajudando a diferenciar alterações superficiais de patologias mais profundas.",
                preparation: "não necessita preparo."
            },
            {
                slug: "pescoco-e-regiao-cervical",
                name: "Pescoço e região cervical",
                information: "A ultrassonografia cervical avalia com precisão os linfonodos, glândulas salivares, tireoide, paratireoides, músculos e vasos do pescoço. É indicada para investigar inchaços, nódulos, dor, alterações na voz, dificuldade para engolir ou sinais de infecção e inflamação. Também é muito útil no acompanhamento de doenças da tireoide e na avaliação de torcicolo congênito em crianças. Permite identificar alterações benignas e suspeitas, diferenciar cistos de estruturas sólidas e acompanhar respostas a tratamentos ou a evolução de lesões. É um exame seguro, indolor, sem radiação, essencial na prática clínica e de grande valor em crianças e adultos.",
                preparation: "não necessita preparo."
            },
            {
                slug: "regiao-inguinal",
                name: "Região inguinal",
                information: "A ultrassonografia da região inguinal é especialmente útil para avaliar hérnias inguinais e femorais, linfonodos aumentados, dor ou nódulos locais, além de alterações vasculares ou inflamatórias. É indicada em casos de desconforto, inchaço, abaulamento, sensação de peso na virilha ou suspeita de hérnias, sendo também muito utilizada no acompanhamento pós-operatório e em pacientes com infecções locais ou doenças linfoproliferativas. Permite distinguir hérnias verdadeiras de outras causas de massa, verificar o comportamento dinâmico com manobras de esforço e avaliar se há sinais de encarceramento ou complicações. É um exame simples, indolor e essencial na investigação de queixas inguinais em homens e mulheres.",
                preparation: "não necessita preparo."
            },
            {
                slug: "rins-e-vias-urinarias",
                name: "Rins e vias urinárias",
                information: "A ultrassonografia dos rins e vias urinárias permite avaliar, com detalhes, os rins, pelves renais e ureteres (quando dilatados), além da bexiga. É indicada para investigar dor lombar, infecção urinária de repetição, sangue na urina, suspeita de cálculos, dilatações, cistos, malformações e doenças renais crônicas. É um exame indolor, rápido e seguro, essencial tanto para diagnósticos iniciais quanto para acompanhamento de alterações já conhecidas no sistema urinário.",
                preparation: "bexiga cheia."
            },
            {
                slug: "tireoide",
                name: "Tireoide",
                information: "A ultrassonografia da tireoide é o principal exame de imagem para avaliar essa glândula localizada na parte anterior do pescoço, responsável por regular funções importantes do organismo por meio dos hormônios tireoidianos. É indicada para investigar nódulos, aumento da glândula (bócio), dores, alterações hormonais, histórico familiar de doenças tireoidianas ou acompanhamento de doenças já diagnosticadas. Permite identificar características dos nódulos, cistos, inflamações (tireoidite) e alterações vasculares, com precisão e sem riscos à saúde. É um exame rápido, indolor e de alta sensibilidade, fundamental para o cuidado endocrinológico moderno.",
                preparation: "não necessita preparo."
=======
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "abdome-superior",
                name: "Abdome Superior",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "sinovite-transitoria",
                name: "Sinovite Transitória",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "aparelho-urinario",
                name: "Aparelho Urinário",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "prostata",
                name: "Próstata",
                information: "Teste aqui",
                preparation: "Lorem ipsum"
            },
            {
                slug: "abdome-total",
                name: "Abdome Total",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "bolsa-testicular",
                name: "Bolsa Testicular",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "regiao-inguinal",
                name: "Região Inguinal",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "parede-abdominal",
                name: "Parede Abdominal",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
>>>>>>> 68d0fc457e0dcc02901ce7e333b3b016119605c7
            },
        ]
    },
    {
<<<<<<< HEAD
        slug: "ecografias-musculoesqueleticas",
        name: "Ecografias Musculoesqueléticas",
        treatments: [
            {
                slug: "lesoes-traumaticas-e-inflamatorias",
                name: "Lesões traumáticas e inflamatórias",
                information: "A ecografia é um recurso valioso para investigar lesões causadas por traumas (quedas, pancadas, entorses) e processos inflamatórios agudos ou crônicos nos tecidos moles. É utilizada para identificar edemas, hematomas, rupturas musculares, tendinites, bursites, abscessos e sinovites, além de auxiliar na avaliação da evolução das lesões e na resposta ao tratamento. Permite examinar com clareza a profundidade e extensão da lesão, distinguindo entre processos inflamatórios e traumáticos, além de poder guiar procedimentos como drenagens ou infiltrações. Trata-se de um exame rápido, indolor, acessível e livre de radiação, essencial para ortopedistas, clínicos e reumatologistas no diagnóstico e acompanhamento dessas condições.",
                preparation: "não necessita preparo."
            },
            {
                slug: "punho",
                name: "Punho",
                information: "A ultrassonografia de articulações como joelhos, ombros, tornozelos, cotovelos, punhos e mãos permite visualizar com precisão os tendões, ligamentos, bursas, cápsulas articulares e líquido sinovial, sendo uma ferramenta valiosa para diagnóstico e acompanhamento clínico. É indicada para avaliar dores articulares, inchaços, restrições de movimento, traumas, tendinites, bursites, derrames articulares, lesões ligamentares, artrites e sinovites. Por ser um exame dinâmico, possibilita a análise da articulação em movimento e durante manobras específicas, algo que exames estáticos como a radiografia não oferecem. É seguro, livre de radiação, rápido e confortável, ideal para investigação de lesões ortopédicas, reumatológicas e esportivas, em adultos e crianças.",
                preparation: "não necessita preparo."
            },
            {
                slug: "ombros",
                name: "Ombros",
                information: "A ultrassonografia de articulações como joelhos, ombros, tornozelos, cotovelos, punhos e mãos permite visualizar com precisão os tendões, ligamentos, bursas, cápsulas articulares e líquido sinovial, sendo uma ferramenta valiosa para diagnóstico e acompanhamento clínico. É indicada para avaliar dores articulares, inchaços, restrições de movimento, traumas, tendinites, bursites, derrames articulares, lesões ligamentares, artrites e sinovites. Por ser um exame dinâmico, possibilita a análise da articulação em movimento e durante manobras específicas, algo que exames estáticos como a radiografia não oferecem. É seguro, livre de radiação, rápido e confortável, ideal para investigação de lesões ortopédicas, reumatológicas e esportivas, em adultos e crianças.",
                preparation: "não necessita preparo."
            },
            {
                slug: "tendoes",
                name: "Tendões",
                information: "A ecografia musculoesquelética é um exame altamente especializado que permite avaliar, em tempo real, tendões, músculos, articulações, ligamentos, bursas e fáscias. É indicada para investigar dores, inchaços, limitação de movimentos, lesões por esforço repetitivo, traumas, bursites, tendinites, rupturas e artrites. Com excelente resolução para estruturas superficiais, esse exame permite observar inflamações, líquido articular, alterações da vascularização e movimentação durante manobras específicas, o que o torna ideal para avaliação funcional e dinâmica. É indolor, não invasivo e não usa radiação, sendo muito utilizado em ortopedia, reumatologia e medicina esportiva.",
                preparation: "não necessita preparo."
            },
            {
                slug: "tornozelos",
                name: "Tornozelos",
                information: "A ultrassonografia de articulações como joelhos, ombros, tornozelos, cotovelos, punhos e mãos permite visualizar com precisão os tendões, ligamentos, bursas, cápsulas articulares e líquido sinovial, sendo uma ferramenta valiosa para diagnóstico e acompanhamento clínico. É indicada para avaliar dores articulares, inchaços, restrições de movimento, traumas, tendinites, bursites, derrames articulares, lesões ligamentares, artrites e sinovites. Por ser um exame dinâmico, possibilita a análise da articulação em movimento e durante manobras específicas, algo que exames estáticos como a radiografia não oferecem. É seguro, livre de radiação, rápido e confortável, ideal para investigação de lesões ortopédicas, reumatológicas e esportivas, em adultos e crianças.",
                preparation: "não necessita preparo."
=======
        slug: "pediatria",
        name: "Pediatria",
        treatments: [
            {
                slug: "transfontanelar",
                name: "Transfontanelar",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "suturas-cranianas",
                name: "Suturas Cranianas",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "cervical",
                name: "Cervical",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "tireoide",
                name: "Tireoide",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "abdome-superior",
                name: "Abdome Superior",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "sinovite-transitoria",
                name: "Sinovite Transitória",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "aparelho-urinario",
                name: "Aparelho Urinário",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "prostata",
                name: "Próstata",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "abdome-total",
                name: "Abdome Total",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "bolsa-testicular",
                name: "Bolsa Testicular",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "regiao-inguinal",
                name: "Região Inguinal",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "parede-abdominal",
                name: "Parede Abdominal",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
        ]
    },
    {
        slug: "ginecologia",
        name: "Ginecologia",
        treatments: [
            {
                slug: "transfontanelar",
                name: "Transfontanelar",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "suturas-cranianas",
                name: "Suturas Cranianas",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "cervical",
                name: "Cervical",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "tireoide",
                name: "Tireoide",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "abdome-superior",
                name: "Abdome Superior",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "sinovite-transitoria",
                name: "Sinovite Transitória",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "aparelho-urinario",
                name: "Aparelho Urinário",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "prostata",
                name: "Próstata",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "abdome-total",
                name: "Abdome Total",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "bolsa-testicular",
                name: "Bolsa Testicular",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "regiao-inguinal",
                name: "Região Inguinal",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "parede-abdominal",
                name: "Parede Abdominal",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
        ]
    },
    {
        slug: "obstetricia",
        name: "Obstetrícia",
        treatments: [
            {
                slug: "transfontanelar",
                name: "Transfontanelar",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "suturas-cranianas",
                name: "Suturas Cranianas",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "cervical",
                name: "Cervical",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "tireoide",
                name: "Tireoide",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "abdome-superior",
                name: "Abdome Superior",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "sinovite-transitoria",
                name: "Sinovite Transitória",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "aparelho-urinario",
                name: "Aparelho Urinário",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "prostata",
                name: "Próstata",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "abdome-total",
                name: "Abdome Total",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "bolsa-testicular",
                name: "Bolsa Testicular",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "regiao-inguinal",
                name: "Região Inguinal",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "parede-abdominal",
                name: "Parede Abdominal",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
        ]
    },
    {
        slug: "medicina-fetal",
        name: "Medicina Fetal",
        treatments: [
            {
                slug: "transfontanelar",
                name: "Transfontanelar",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "suturas-cranianas",
                name: "Suturas Cranianas",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "cervical",
                name: "Cervical",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "tireoide",
                name: "Tireoide",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "abdome-superior",
                name: "Abdome Superior",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "sinovite-transitoria",
                name: "Sinovite Transitória",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "aparelho-urinario",
                name: "Aparelho Urinário",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "prostata",
                name: "Próstata",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "abdome-total",
                name: "Abdome Total",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "bolsa-testicular",
                name: "Bolsa Testicular",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "regiao-inguinal",
                name: "Região Inguinal",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "parede-abdominal",
                name: "Parede Abdominal",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
        ]
    },
    {
        slug: "musculo-esqueletico",
        name: "Músculo Esquelético",
        treatments: [
            {
                slug: "transfontanelar",
                name: "Transfontanelar",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "suturas-cranianas",
                name: "Suturas Cranianas",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "cervical",
                name: "Cervical",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "tireoide",
                name: "Tireoide",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "abdome-superior",
                name: "Abdome Superior",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "sinovite-transitoria",
                name: "Sinovite Transitória",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "aparelho-urinario",
                name: "Aparelho Urinário",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "prostata",
                name: "Próstata",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "abdome-total",
                name: "Abdome Total",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "bolsa-testicular",
                name: "Bolsa Testicular",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "regiao-inguinal",
                name: "Região Inguinal",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
            },
            {
                slug: "parede-abdominal",
                name: "Parede Abdominal",
                information: "Lorem Ipsum",
                preparation: "Lorem ipsum"
>>>>>>> 68d0fc457e0dcc02901ce7e333b3b016119605c7
            },
        ]
    },
]