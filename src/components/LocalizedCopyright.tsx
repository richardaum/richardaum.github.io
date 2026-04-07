"use client";

import buildInfo from "@/data/build-info.json";
import { useTranslations } from "next-intl";

function formatBuildDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    }).format(date);
  } catch {
    return dateString;
  }
}

export function LocalizedCopyright() {
  const t = useTranslations("Home");
  const buildDate = formatBuildDate(buildInfo.buildDate);
  const buildYear = new Date(buildInfo.buildDate).getUTCFullYear();

  return (
    <p className="mb-4 mr-auto w-[calc(100%-96px)] whitespace-pre-wrap pl-6 text-xs lg:w-full lg:text-center">
      {t.rich("copyright", {
        nowrap: (children) => <span className="text-nowrap">{children}</span>,
        lastUpdate: (children) => <span className="opacity-50">{children}</span>,
        lastUpdateDate: buildDate,
        year: Number.isNaN(buildYear) ? new Date().getUTCFullYear() : buildYear,
      })}
    </p>
  );
}
