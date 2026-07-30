import { Project } from "./project";

export interface ProjectWithStats extends Project {
  songCount: number;
  latestYear: number;
}