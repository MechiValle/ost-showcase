import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "el-regimen",
    slug: "el-regimen",
    name: "El Regimen",
    description: {
      en: "Arcade video game introduced during the 2025 Global Game Jam.",
      es: "Videojuego de arcade presentado en la Global Game Jam 2025. ",
    },
    coverSrc: "/screenshots/regimen-logo.png",
    isNoProject: false,
  },
  {
    id: "balance",
    slug: "balance",
    name: "Balance!",
    description: {
      en: "Arcade video game introduced during the 2020 Global Game Jam.",
      es: "Videojuego de arcade presentado en la Global Game Jam 2020. ",
    },
    coverSrc: "/screenshots/balance_portrait.png",
    isNoProject: false,
  },
  {
    id: "no-project",
    slug: "no-project",
    name: "No Project",
    description: {
      en: "Songs made for their own sake, or with an imaginary game or animation in mind.",
      es: "Canciones hechas por el gusto de hacerlas, o pensando en un juego o animación imaginarios.",
    },
    coverSrc: null,
    isNoProject: true,
  },

    {
    id: "roots",
    slug: "roots",
    name: "Upside Down",
    description: {
      en: "Strategy video game introduced during the 2023 Global Game Jam.",
      es: "Videojuego de estrategia presentado en la Global Game Jam 2023. ",
    },
    coverSrc: "/screenshots/roots-logo.jpg",
    isNoProject: false,
  },
  {
    id: "silicon-wars",
    slug: "silicon-wars",
    name: "Silicon Wars",
    description: {
      en: "Tower defense game with robots developed during 2019 as part of the 'Creative Industries' competition of the Govt. of Santa Fe. Winner of the competition.",
      es: "Juego de tower defense con robots desarrollado durante el año 2019 en el marco del concurso 'Industrias Creativas' del Gobierno de Santa Fe. Ganador del concurso.",
    },
    coverSrc: "/screenshots/silicon-wars-logo.jpg",
    isNoProject: false,
  },
  {
    id: "megalomaniac",
    slug: "megalomaniac",
    name: "Megalomaniac",
    description: {
      en: "Fighting video game introduced during the 2017 Global Game Jam.",
      es: "Videojuego de pelea presentado en la Global Game Jam 2017. ",
    },
    coverSrc: "/screenshots/megalomaniac-logo.jpg",
    isNoProject: false,
  },
  {
    id: "cover-songs",
    slug: "cover-songs",
    name: "Covers",
    description: {
      en: "Instrumental versions of old songs.",
      es: "Versiones instrumentales libres de canciones viejas.",
    },
    coverSrc: null,
    isNoProject: false,
  },
];