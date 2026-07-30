export type Language = "en" | "es";

export const translations = {
  en: {
    siteTitle: "Mechi Valle",
    heroTitle: "Mercedes Valle",
    heroSubtitle: "Hobby musician",
    heroDescription:
      "Original music written and produced for video games. Most of it born during Global Game Jam, the rest just for the love of making it.",
    openPlayer: "Open player",
    backToAlbums: "Back to albums",
    noProjectName: "No Project",
  },
  es: {
    siteTitle: "Mechi Valle",
    heroTitle: "Mercedes Valle",
    heroSubtitle: "Música aficionada",
    heroDescription:
      "Música original compuesta y producida para videojuegos, la mayoría nacida durante la Global Game Jam, el resto solo por el gusto de hacerla.",
    openPlayer: "Abrir reproductor",
    backToAlbums: "Volver a álbumes",
    noProjectName: "Sin Proyecto",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

export function formatSongCount(count: number, language: Language): string {
  if (language === "es") {
    return count === 1 ? "1 canción" : `${count} canciones`;
  }
  return count === 1 ? "1 song" : `${count} songs`;
}