import { Project } from "@/types/project";
import { Song } from "@/types/song";
import { ProjectWithStats } from "@/types/projectWithStats";

export function getProjectsWithStats(
  projects: Project[],
  songs: Song[]
): ProjectWithStats[] {
  const withStats = projects.map((project) => {
    const projectSongs = songs.filter((song) => song.projectId === project.id);
    const years = projectSongs.map((song) => song.year);
    const latestYear = years.length > 0 ? Math.max(...years) : 0;

    return {
      ...project,
      songCount: projectSongs.length,
      latestYear,
    };
  });

  return withStats.sort((a, b) => b.latestYear - a.latestYear);
}