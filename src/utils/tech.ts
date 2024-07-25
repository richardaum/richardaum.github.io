import { DateRange, Project, TechUsage, TechUsageResult } from "@/types/work";

const dateRangeOverlap = (range1: DateRange, range2: DateRange): number => {
  const start1 = new Date(range1.from);
  const end1 = new Date(range1.to);
  const start2 = new Date(range2.from);
  const end2 = new Date(range2.to);

  const latestStart = new Date(Math.max(start1.getTime(), start2.getTime()));
  const earliestEnd = new Date(Math.min(end1.getTime(), end2.getTime()));

  const overlap = (earliestEnd.getTime() - latestStart.getTime()) / (1000 * 60 * 60 * 24) + 1;
  return Math.max(0, overlap); // Ensure no negative overlap
};

const mergeDateRanges = (ranges: DateRange[]): DateRange[] => {
  ranges.sort((a, b) => new Date(a.from).getTime() - new Date(b.from).getTime());

  const merged: DateRange[] = [ranges[0]];

  for (let i = 1; i < ranges.length; i++) {
    const lastMerged = merged[merged.length - 1];
    const current = ranges[i];

    if (new Date(lastMerged.to) >= new Date(current.from)) {
      lastMerged.to = new Date(Math.max(new Date(lastMerged.to).getTime(), new Date(current.to).getTime()))
        .toISOString()
        .split("T")[0];
    } else {
      merged.push(current);
    }
  }

  return merged;
};

export const calculateTechUsage = (projects: Project[]): TechUsageResult => {
  const techUsage: { [key: string]: TechUsage } = {};

  projects.forEach((project) => {
    const { from, to } = project.duration || {};
    if (!from || !to) return;

    project.techStack.forEach((tech) => {
      if (!techUsage[tech]) {
        techUsage[tech] = { dateRanges: [] };
      }
      techUsage[tech].dateRanges.push({ from, to });
    });
  });

  const result: TechUsageResult = {};

  Object.keys(techUsage).forEach((tech) => {
    const mergedRanges = mergeDateRanges(techUsage[tech].dateRanges);
    const totalDays = mergedRanges.reduce((sum, range) => {
      return sum + dateRangeOverlap(range, range);
    }, 0);

    result[tech] = {
      totalDays,
      projectsCount: techUsage[tech].dateRanges.length,
    };
  });

  return result;
};

export const calculateTotalExperience = (projects: Project[]): number => {
  const allDateRanges: DateRange[] = [];

  projects.forEach((project) => {
    const duration = project.duration;
    if (duration) {
      allDateRanges.push(duration);
    }
  });

  const mergedRanges = mergeDateRanges(allDateRanges);
  const totalDays = mergedRanges.reduce((sum, range) => {
    return sum + dateRangeOverlap(range, range);
  }, 0);

  const totalYears = Math.ceil(totalDays / 365);
  return totalYears;
};
