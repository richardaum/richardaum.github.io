"use client";

import { visibleProjects, visibleRecentWorkProjects, visibleSideProjects } from "@/data/projects";
import { useNow } from "@/hooks/useNow";
import { durationToYearsAndMonths, fromToToDuration } from "@/utils/duration";
import { calculateTechUsage, calculateTotalExperience } from "@/utils/tech";
import { DateTime } from "luxon";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { Tooltip } from "./Tooltip";
import { TooltipText } from "./TooltipText";

// Leaf components: only the text that depends on "now" is rendered on the client.

const scopes = { all: visibleProjects, recent: visibleRecentWorkProjects, side: visibleSideProjects };

function formatMonthYear(date: string) {
  return DateTime.fromISO(date).toLocaleString({ month: "long", year: "numeric" });
}

export function WorkedFor({ from, to }: { from: string; to: string }) {
  const t = useTranslations("Home");
  const now = useNow();

  if (DateTime.fromISO(from) > now) {
    return (
      <TooltipText
        text={t("startsOn", { date: formatMonthYear(from) })}
        tooltip={DateTime.fromISO(from).toLocaleString(DateTime.DATE_FULL)}
      />
    );
  }

  return (
    <TooltipText
      text={t("workedFor", { duration: durationToYearsAndMonths(fromToToDuration({ from, to }, now)) })}
      tooltip={t("durationTooltip", {
        from: formatMonthYear(from),
        to: to === "current" ? "current" : formatMonthYear(to),
      })}
    />
  );
}

export function TechTooltipText({ technology, scope }: { technology: string; scope: keyof typeof scopes }) {
  const t = useTranslations("Home");
  const now = useNow();
  const usage = useMemo(() => calculateTechUsage(scopes[scope], now).get(technology), [scope, technology, now]);

  if (!usage) return <>{technology}</>;

  return (
    <TooltipText
      text={technology}
      tooltip={t("techTooltip", {
        duration: durationToYearsAndMonths(usage.duration),
        projects: usage.projectsCount,
        tech: technology,
      })}
    />
  );
}

export function TechDuration({ technology }: { technology: string }) {
  const now = useNow();
  const usage = useMemo(() => calculateTechUsage(visibleProjects, now).get(technology), [technology, now]);
  if (!usage) return null;

  const { years, months } = usage.duration.shiftTo("years", "months");
  const units = [
    { value: Math.floor(years), label: "year" },
    { value: Math.floor(months), label: "month" },
  ].filter(({ value }) => value > 0);

  if (units.length === 0) return <>Less than a month</>;

  return <>{units.map(({ value, label }) => `${value} ${label}${value === 1 ? "" : "s"}`).join(" and ")}</>;
}

export function TotalExperience({ withTooltip = false }: { withTooltip?: boolean }) {
  const t = useTranslations("Home");
  const now = useNow();
  const total = useMemo(() => calculateTotalExperience(visibleProjects, now), [now]);
  const detailed = total.shiftTo("years", "months", "days");

  const content = (
    <div className="w-[150px] border-b-4 border-current text-right font-display">
      <p className="text-4xl">{t("totalExperience", { years: total.shiftTo("years").years.toFixed(0) })}</p>
      <p className="text-lg">{t("seniority")}</p>
    </div>
  );

  if (!withTooltip) return content;

  return (
    <Tooltip
      content={t("experienceBreakdownTooltip", {
        years: Math.floor(detailed.years),
        months: Math.floor(detailed.months),
        days: Math.floor(detailed.days),
      })}
    >
      {content}
    </Tooltip>
  );
}
