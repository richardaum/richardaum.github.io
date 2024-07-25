export type Project = {
  id: string;
  duration?: { from: string; to: string };
  techStack: string[];
};

export type DateRange = {
  from: string;
  to: string;
};

export type TechUsage = {
  dateRanges: DateRange[];
};

export type TechUsageResult = {
  [key: string]: {
    totalDays: number;
    projectsCount: number;
  };
};
