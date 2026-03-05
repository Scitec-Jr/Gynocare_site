import { procedures } from "../Procedures/procedures"

type Speciality = {
    name: string;
    imageUrl: string;
    url: string;
    treatments: string[];
}

export const specialitiesList: Speciality[] = [
    {
        name: "Medicina interna",
        imageUrl: "/assets/images/placeholder2.png",
        url: "/procedimentos/medicina-interna",
        treatments: (procedures.filter(procedure => procedure.name === "Medicina Interna").flatMap(procedure => procedure.treatments).map(treatment => treatment.name))
    },
    {
        name: "Pediatria",
        imageUrl: "/assets/images/placeholder2.png",
        url: "/procedimentos/pediatria",
        treatments: (procedures.filter(procedure => procedure.name === "Pediatria").flatMap(procedure => procedure.treatments).map(treatment => treatment.name))
    },
    {
        name: "Ginecologia",
        imageUrl: "/assets/images/placeholder2.png",
        url: "/procedimentos/ginecologia",
        treatments: (procedures.filter(procedure => procedure.name === "Ginecologia").flatMap(procedure => procedure.treatments).map(treatment => treatment.name))
    },
    {
        name: "Obstetrícia",
        imageUrl: "/assets/images/placeholder2.png",
        url: "/procedimentos/obstetricia",
        treatments: (procedures.filter(procedure => procedure.name === "Obstetrícia").flatMap(procedure => procedure.treatments).map(treatment => treatment.name))
    },
    {
        name: "Medicina Fetal",
        imageUrl: "/assets/images/placeholder2.png",
        url: "/procedimentos/medicina-fetal",
        treatments: (procedures.filter(procedure => procedure.name === "Medicina Fetal").flatMap(procedure => procedure.treatments).map(treatment => treatment.name))
    },
    {
        name: "Músculo Esquelético",
        imageUrl: "/assets/images/placeholder2.png",
        url: "/procedimentos/musculo-esqueletico",
        treatments: (procedures.filter(procedure => procedure.name === "Músculo Esquelético").flatMap(procedure => procedure.treatments).map(treatment => treatment.name))
    }
]