import { Song } from "@/types/song";

export function getProjectSongs(projectId: string, songs: Song[]): Song[] {
  return songs
    .filter((song) => song.projectId === projectId)
    .sort((a, b) => b.year - a.year);
}