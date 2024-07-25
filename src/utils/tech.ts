import { Project, TechUsage } from "@/types/work";
import { DateTime, Duration, Interval } from "luxon";

export const calculateTechUsage = (projects: Project[]) => {
  const techUsageMap = new Map<string, TechUsage>();

  // get tech with overlapped intervals
  const techs = projects.reduce(
    (acc, project) => {
      project.techStack.forEach((tech) => {
        if (!acc[tech]) {
          acc[tech] = [];
        }
        const interval = Interval.fromDateTimes(
          DateTime.fromISO(project.duration.from),
          DateTime.fromISO(project.duration.to),
        );
        acc[tech].push(interval);
      });

      return acc;
    },
    {} as Record<string, Interval[]>,
  );

  // remove overlapped intervals for each tech
  Object.keys(techs).forEach((tech) => {
    const intervals = techs[tech];
    const mergedIntervals = Interval.merge(intervals);
    const totalDuration = Duration.fromMillis(
      mergedIntervals.reduce((acc, interval) => acc + interval.length(), 0),
    ).shiftToAll();
    techUsageMap.set(tech, {
      duration: totalDuration,
      projectsCount: intervals.length,
    });
  });

  return techUsageMap;
};

export const calculateTotalExperience = (projects: Project[]): Duration => {
  const intervals = projects.map((project) =>
    Interval.fromDateTimes(DateTime.fromISO(project.duration.from), DateTime.fromISO(project.duration.to)),
  );
  const mergedIntervals = Interval.merge(intervals);
  const totalDuration = Duration.fromMillis(
    mergedIntervals.reduce((acc, interval) => acc + interval.length(), 0),
  ).shiftToAll();
  return totalDuration;
};
