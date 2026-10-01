import { Duration } from "luxon";

export type Project = {
  id: string;
  duration: { from: string; to: string };
  techStack: string[];
  hidden?: boolean;
};

export type TechUsage = {
  duration: Duration;
  projectsCount: number;
};
