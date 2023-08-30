import { Inter, Poiret_One, Montaga, Croissant_One } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const poiret = Poiret_One({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poiret-one",
});

export const montaga = Montaga({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montaga",
});

export const croissant = Croissant_One({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-croissant",
});
