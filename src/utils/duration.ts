import { DateTime, Duration, Interval } from "luxon";

export function durationToYearsAndMonths(_duration?: Duration) {
  if (!_duration) throw new Error("Duration is required");

  const duration = _duration.shiftTo("years", "months", "days");
  const years = Math.floor(duration.years);
  const months = Math.floor(duration.months);
  const days = Math.floor(duration.days);

  const yearsString = years > 0 ? `${years} year${years !== 1 ? "s" : ""}` : null;
  const monthsString = months > 0 ? `${months} month${months !== 1 ? "s" : ""}` : null;

  const parts = [yearsString, monthsString].filter((e) => e != null);
  if (parts.length === 0) {
    return `${days} day${days !== 1 ? "s" : ""}`;
  }

  return parts.join(" and ");
}

export function fromToToDuration({ from, to }: { from: string; to: string }) {
  const toDateTime = DateTime.fromISO(to);
  const interval = Interval.fromDateTimes(DateTime.fromISO(from), toDateTime.isValid ? toDateTime : DateTime.now());
  const duration = Duration.fromMillis(interval.length()).shiftToAll();
  return duration;
}
