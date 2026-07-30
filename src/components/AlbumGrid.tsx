import { projects } from "@/data/projects";
import { songs } from "@/data/songs";
import { getProjectsWithStats } from "@/utils/getProjectsWithStats";
import ProjectCard from "./ProjectCard";
import "./AlbumGrid.css";

export default function AlbumGrid() {
  const projectsWithStats = getProjectsWithStats(projects, songs);

  return (
    <div className="album-grid">
      {projectsWithStats.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}