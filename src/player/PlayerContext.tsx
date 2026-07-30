import {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Song } from "@/types/song";
import { Project } from "@/types/project";
import { assetUrl } from "@/utils/assetUrl";

interface PlayerContextValue {
  currentSong: Song | null;
  currentProject: Project | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  hasNext: boolean;
  playSong: (song: Song, playlist: Song[], project: Project) => void;
  togglePlayPause: () => void;
  seekTo: (time: number) => void;
  playNext: () => void;
  playPrevious: () => void;
}

const PlayerContext = createContext<PlayerContextValue | undefined>(
  undefined
);

const PREVIOUS_DOUBLE_PRESS_WINDOW_MS = 1500;

export function PlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const playlistRef = useRef<Song[]>([]);
  const lastPreviousPressRef = useRef<number>(0);

  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const getIndexInPlaylist = () => {
    if (!currentSong) return -1;
    return playlistRef.current.findIndex((song) => song.id === currentSong.id);
  };

  const playSong = (song: Song, playlist: Song[], project: Project) => {
    playlistRef.current = playlist;
    setCurrentProject(project);
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const playNext = () => {
    const index = getIndexInPlaylist();
    if (index === -1) return;
    const next = playlistRef.current[index + 1];
    if (next && currentProject) {
      playSong(next, playlistRef.current, currentProject);
    } else {
      setIsPlaying(false);
    }
  };

  const playPrevious = () => {
    const index = getIndexInPlaylist();
    if (index === -1) return;
    const previous = playlistRef.current[index - 1];
    const now = Date.now();
    const isDoublePress =
      now - lastPreviousPressRef.current < PREVIOUS_DOUBLE_PRESS_WINDOW_MS;

    if (previous && isDoublePress && currentProject) {
      playSong(previous, playlistRef.current, currentProject);
      lastPreviousPressRef.current = 0;
    } else {
      seekTo(0);
      lastPreviousPressRef.current = now;
    }
  };

  const seekTo = (time: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = time;
    setCurrentTime(time);
  };

  const togglePlayPause = () => {
    if (!currentSong) return;
    setIsPlaying((prev) => !prev);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;
    audio.src = assetUrl(currentSong.audioSrc);
    audio.currentTime = 0;
    setCurrentTime(0);
    setDuration(0);
    if (isPlaying) {
      audio.play().catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => playNext();

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong, currentProject]);

  const index = getIndexInPlaylist();
  const hasNext = index !== -1 && index < playlistRef.current.length - 1;

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        currentProject,
        isPlaying,
        currentTime,
        duration,
        hasNext,
        playSong,
        togglePlayPause,
        seekTo,
        playNext,
        playPrevious,
      }}
    >
      {children}
      <audio ref={audioRef} />
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
}