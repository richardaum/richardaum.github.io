import { Duration } from "luxon";

export function durationToYearsAndMonths(_duration: Duration) {
  const duration = _duration.shiftToAll();
  const years = duration.years;
  const months = duration.months;

  const yearsString =
    years > 0 ? `${years} year${years !== 1 ? "s" : ""}` : null;
  const monthsString =
    months > 0 ? `${months} month${months !== 1 ? "s" : ""}` : null;

  return [yearsString, monthsString].filter((e) => e != null).join(" and ");
}
