import { Song } from '@/types/song';
import { Project } from '@/types/project';
import { useLanguage } from '@/i18n/LanguageContext';
import MusicNoteIcon from './icons/MusicNoteIcon';
import './SongDetailsModal.css';
import { assetUrl } from "@/utils/assetUrl";

interface SongDetailsModalProps {
  song: Song;
  project: Project;
  onClose: () => void;
}

export default function SongDetailsModal({
  song,
  project,
  onClose,
}: SongDetailsModalProps) {
  const { language, t } = useLanguage();

  const projectName = project.isNoProject ? t('noProjectName') : project.name;

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <div className='song-modal-overlay' onClick={handleOverlayClick}>
      <div className='song-modal'>
        <div className='song-modal__header'>
          <div className='song-modal__cover'>
            {project.coverSrc ? (
              <img src={assetUrl(project.coverSrc)} alt={song.title} />
            ) : (
              <MusicNoteIcon className='song-modal__placeholder-icon' />
            )}
          </div>
          <div className='song-modal__titles'>
            <p className='song-modal__title'>{song.title}</p>
            <p className='song-modal__subtitle'>
              {projectName} — {song.year}
            </p>
          </div>
          <button
            className='song-modal__close'
            onClick={onClose}
            aria-label='Close'
          >
            ×
          </button>
        </div>
        <p className='song-modal__description'>{song.details[language]}</p>
        {song.screenshotSrc && (
          <img
            className='song-modal__screenshot'
            src={assetUrl(song.screenshotSrc)}
            alt={song.title}
          />
        )}
      </div>
    </div>
  );
}
