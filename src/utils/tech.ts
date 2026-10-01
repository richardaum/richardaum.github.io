import { Project, TechUsage } from "@/types/work";
import { DateTime, Duration, Interval } from "luxon";

// Projects that have not started yet (from > now) count as a zero-length interval.
const projectInterval = ({ duration }: Project, now: DateTime) => {
  const from = DateTime.fromISO(duration.from);
  const to = DateTime.fromISO(duration.to);
  const end = to.isValid ? to : now;
  return Interval.fromDateTimes(from, end < from ? from : end);
};

export const calculateTechUsage = (projects: Project[], now: DateTime = DateTime.now()) => {
  const techUsageMap = new Map<string, TechUsage>();

  // get tech with overlapped intervals
  const techs = projects.reduce(
    (acc, project) => {
      project.techStack.forEach((tech) => {
        if (!acc[tech]) {
          acc[tech] = [];
        }
        acc[tech].push(projectInterval(project, now));
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

export const calculateTotalExperience = (projects: Project[], now: DateTime = DateTime.now()): Duration => {
  const intervals = projects.map((project) => projectInterval(project, now));
  const mergedIntervals = Interval.merge(intervals);
  const totalDuration = Duration.fromMillis(
    mergedIntervals.reduce((acc, interval) => acc + interval.length(), 0),
  ).shiftToAll();
  return totalDuration;
};
