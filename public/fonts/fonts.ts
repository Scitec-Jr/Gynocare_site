import {Inter, Konkhmer_Sleokchher} from "next/font/google";

export const inter = Inter({
    weight: ["100", "200", "300", "400", "500", "600", "700"],
    display: "swap",
    variable: "--font-text"
});

export const konkhmerSleokchher = Konkhmer_Sleokchher({
    weight: "400",
    display: "swap",
    variable: "--font-title"
});