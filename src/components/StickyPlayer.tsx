import { useState } from "react";
import { usePlayer } from "@/player/PlayerContext";
import { useLanguage } from "@/i18n/LanguageContext";
import { formatTime } from "@/player/formatTime";
import PlayIcon from "./icons/PlayIcon";
import PauseIcon from "./icons/PauseIcon";
import PrevIcon from "./icons/PrevIcon";
import NextIcon from "./icons/NextIcon";
import "./StickyPlayer.css";

export default function StickyPlayer() {
  const {
    currentSong,
    currentProject,
    isPlaying,
    currentTime,
    duration,
    hasNext,
    togglePlayPause,
    seekTo,
    playNext,
    playPrevious,
  } = usePlayer();
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  if (!currentSong || !currentProject) return null;

  const projectName = currentProject.isNoProject
    ? t("noProjectName")
    : currentProject.name;

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleBarClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    const rect = event.currentTarget.getBoundingClientRect();
    const clickRatio = (event.clientX - rect.left) / rect.width;
    seekTo(clickRatio * duration);
  };

  const stopPropagation = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const handleMiniClick = () => setIsExpanded(true);
  const handleExpandedContainerClick = () => setIsExpanded(false);

  return (
    <div
      className={`sticky-player ${
        isExpanded ? "sticky-player--expanded" : ""
      }`}
    >
      <div className="sticky-player__mini-view" onClick={handleMiniClick}>
        <p className="sticky-player__mini-title">{currentSong.title}</p>
        <div className="sticky-player__mini-bar" onClick={handleBarClick}>
          <div
            className="sticky-player__mini-bar-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <button
          className="sticky-player__control sticky-player__control--main"
          onClick={(event) => {
            stopPropagation(event);
            togglePlayPause();
          }}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
      </div>

      <div
        className="sticky-player__expanded-view"
        onClick={handleExpandedContainerClick}
      >
        <div className="sticky-player__info">
          <p className="sticky-player__song">{currentSong.title}</p>
          <p className="sticky-player__project">{projectName}</p>
        </div>

        <div className="sticky-player__controls">
          <button
            className="sticky-player__control"
            onClick={(event) => {
              stopPropagation(event);
              playPrevious();
            }}
            aria-label="Previous"
          >
            <PrevIcon />
          </button>
          <button
            className="sticky-player__control sticky-player__control--main"
            onClick={(event) => {
              stopPropagation(event);
              togglePlayPause();
            }}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button
            className="sticky-player__control"
            onClick={(event) => {
              stopPropagation(event);
              playNext();
            }}
            disabled={!hasNext}
            aria-label="Next"
          >
            <NextIcon />
          </button>
        </div>

        <div className="sticky-player__progress">
          <span className="sticky-player__time">
            {formatTime(currentTime)}
          </span>
          <div className="sticky-player__bar" onClick={handleBarClick}>
            <div
              className="sticky-player__bar-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="sticky-player__time">{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}