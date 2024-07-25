import { DateTime, Duration, Interval } from "luxon";

export function durationToYearsAndMonths(_duration?: Duration) {
  if (!_duration) throw new Error("Duration is required");

  const duration = _duration.shiftToAll();
  const years = duration.years;
  const months = duration.months;

  const yearsString = years > 0 ? `${years} year${years !== 1 ? "s" : ""}` : null;
  const monthsString = months > 0 ? `${months} month${months !== 1 ? "s" : ""}` : null;

  return [yearsString, monthsString].filter((e) => e != null).join(" and ");
}

export function fromToToDuration({ from, to }: { from: string; to: string }) {
  const toDateTime = DateTime.fromISO(to);
  const interval = Interval.fromDateTimes(DateTime.fromISO(from), toDateTime.isValid ? toDateTime : DateTime.now());
  const duration = Duration.fromMillis(interval.length()).shiftToAll();
  return duration;
}
