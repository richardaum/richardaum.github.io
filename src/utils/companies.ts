import { CompanyFragment } from "@/types/graphql";
import { DateTime, Duration } from "luxon";
import { durationToYearsAndMonths } from "./duration";

export function calculateTotalYears(companies: CompanyFragment[]) {
  const duration = companies
    .reduce((acc, company) => {
      const startDate = company?.startDate
        ? DateTime.fromISO(company.startDate)
        : null;

      const endDate = company?.endDate
        ? DateTime.fromISO(company.endDate)
        : null;

      if (!startDate || !endDate) return acc;

      return acc.plus(endDate.diff(startDate));
    }, Duration.fromMillis(0))
    .shiftToAll();

  return {
    duration: durationToYearsAndMonths(duration),
    roundedYears: Math.round(duration.as("years")),
  };
}
