import { DateTime, Duration } from "luxon";

export function durationToYearsAndMonths(_duration: Duration) {
  const duration = _duration.shiftToAll();
  const years = duration.years;
  const months = duration.months;

  const yearsString = years > 0 ? `${years} year${years !== 1 ? "s" : ""}` : null;
  const monthsString = months > 0 ? `${months} month${months !== 1 ? "s" : ""}` : null;

  return [yearsString, monthsString].filter((e) => e != null).join(" and ");
}

export function durationToYears(_duration: Duration) {
  const duration = _duration.shiftTo("years");
  const rawYears = duration.years;
  const years = rawYears.toFixed(1);
  return `${years} year${Number(years) !== 1 ? "s" : ""}`;
}

export function fromToToDuration({ from, to }: { from: string; to: string }) {
  return Duration.fromObject({ years: DateTime.fromISO(to).diff(DateTime.fromISO(from), "years").years });
}
