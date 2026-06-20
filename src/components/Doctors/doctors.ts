export type DoctorsList = {
    id?: number;
    name: string;
    graduation: string;
    image: string;
    description: string;
};

export async function getDoctorsList(): Promise<DoctorsList[]> {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        const response = await fetch(`${baseUrl}/api/doutores`, {
            cache: "no-store",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            console.error(`Erro ao buscar doutores: ${response.status}`);
            throw new Error(`Erro ao buscar doutores: ${response.status}`);
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Erro ao buscar doutores:", error);
        return [];
    }
}