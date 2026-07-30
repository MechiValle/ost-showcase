import { Link } from "react-router-dom";
import { ProjectWithStats } from "@/types/projectWithStats";
import { useLanguage } from "@/i18n/LanguageContext";
import { formatSongCount } from "@/i18n/translations";
import MusicNoteIcon from "./icons/MusicNoteIcon";
import "./ProjectCard.css";
import { assetUrl } from "@/utils/assetUrl";

interface ProjectCardProps {
  project: ProjectWithStats;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { language, t } = useLanguage();
  const displayName = project.isNoProject ? t("noProjectName") : project.name;

  return (
    <Link to={`/project/${project.slug}`} className="project-card">
      <div className="project-card__cover">
        {project.coverSrc ? (
          <img src={assetUrl(project.coverSrc)} alt={displayName} />
        ) : (
          <MusicNoteIcon className="project-card__placeholder-icon" />
        )}
      </div>
      <p className="project-card__name">{displayName}</p>
      <p className="project-card__count">
        {formatSongCount(project.songCount, language)}
      </p>
    </Link>
  );
}