import { useEffect, useState } from "react";
import { Song } from "@/types/song";
import { assetUrl } from "@/utils/assetUrl";

export function useSongDurations(songs: Song[]): Record<string, number> {
  const [durations, setDurations] = useState<Record<string, number>>({});

  useEffect(() => {
    const audios: HTMLAudioElement[] = [];

    songs.forEach((song) => {
      const audio = new Audio(assetUrl(song.audioSrc));
      const handleLoadedMetadata = () => {
        setDurations((prev) => ({ ...prev, [song.id]: audio.duration }));
      };
      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
      audios.push(audio);
    });

    return () => {
      audios.forEach((audio) => {
        audio.src = "";
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [songs]);

  return durations;
}