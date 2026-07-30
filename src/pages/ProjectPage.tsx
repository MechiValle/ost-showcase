import { useState, useMemo } from 'react';
import SongDetailsModal from '@/components/SongDetailsModal';
import { useParams, Link } from 'react-router-dom';
import { projects } from '@/data/projects';
import { songs } from '@/data/songs';
import { useLanguage } from '@/i18n/LanguageContext';
import { usePlayer } from '@/player/PlayerContext';
import { getProjectSongs } from '@/utils/getProjectSongs';
import { useSongDurations } from '@/hooks/useSongDurations';
import { formatTime } from '@/player/formatTime';
import PlayIcon from '@/components/icons/PlayIcon';
import PauseIcon from '@/components/icons/PauseIcon';
import MusicNoteIcon from '@/components/icons/MusicNoteIcon';
import './ProjectPage.css';

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const { language, t } = useLanguage();
  const { currentSong, isPlaying, playSong, togglePlayPause } = usePlayer();

  const project = projects.find((p) => p.slug === slug);

  const [selectedSong, setSelectedSong] = useState<
    (typeof projectSongs)[number] | null
  >(null);

  const projectSongs = useMemo(
    () => (project ? getProjectSongs(project.id, songs) : []),
    [project],
  );
  const durations = useSongDurations(projectSongs);

  if (!project) {
    return <p style={{ padding: '1.5rem' }}>Project not found.</p>;
  }

  const displayName = project.isNoProject ? t('noProjectName') : project.name;
  const years = projectSongs.map((song) => song.year);
  const minYear = years.length ? Math.min(...years) : null;
  const maxYear = years.length ? Math.max(...years) : null;
  const yearLabel =
    minYear === null
      ? ''
      : minYear === maxYear
        ? `${minYear}`
        : `${minYear} — ${maxYear}`;

  const handleRowPlayClick = (song: (typeof projectSongs)[number]) => {
    if (currentSong?.id === song.id) {
      togglePlayPause();
    } else {
      playSong(song, projectSongs, project);
    }
  };

  return (
    <div className='project-page'>
      <Link to='/' className='project-page__back'>
        {t('backToAlbums')}
      </Link>

      <div className='project-page__header'>
        <div className='project-page__cover'>
          {project.coverSrc ? (
            <img src={project.coverSrc} alt={displayName} />
          ) : (
            <MusicNoteIcon className='project-page__placeholder-icon' />
          )}
        </div>
        <div>
          <h1 className='project-page__name'>{displayName}</h1>
          <p className='project-page__year'>{yearLabel}</p>
          <p className='project-page__description'>
            {project.description[language]}
          </p>
        </div>
      </div>

      <div className='project-page__table'>
        <div className='project-page__row project-page__row--header'>
          <span />
          <span>Title</span>
          <span>Year</span>
          <span>Time</span>
        </div>
        {projectSongs.map((song) => {
          const isActive = currentSong?.id === song.id;
          return (
            <div
              key={song.id}
              className={`project-page__row ${
                isActive ? 'project-page__row--active' : ''
              }`}
            >
              <button
                className='project-page__play-button'
                onClick={() => handleRowPlayClick(song)}
                aria-label={isActive && isPlaying ? 'Pause' : 'Play'}
              >
                {isActive && isPlaying ? <PauseIcon /> : <PlayIcon />}
              </button>
              <span
                className='project-page__title project-page__title--clickable'
                onClick={() => setSelectedSong(song)}
              >
                {song.title}
              </span>
              <span className='project-page__meta'>{song.year}</span>
              <span className='project-page__meta'>
                {durations[song.id] !== undefined
                  ? formatTime(durations[song.id])
                  : '--:--'}
              </span>
            </div>
          );
        })}
      </div>
      {selectedSong && (
        <SongDetailsModal
          song={selectedSong}
          project={project}
          onClose={() => setSelectedSong(null)}
        />
      )}
    </div>
  );
}
