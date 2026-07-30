import { LocalizedText } from "./localizedText";

export interface Song {
  id: string;
  title: string;
  projectId: string;
  year: number;
  audioSrc: string;
  screenshotSrc?: string | null;
  details: LocalizedText;
}