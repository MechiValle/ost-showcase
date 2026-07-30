import { LocalizedText } from "./localizedText";

export interface Project {
  id: string;
  slug: string;
  name: string;
  description: LocalizedText;
  coverSrc: string | null;
  isNoProject: boolean;
}