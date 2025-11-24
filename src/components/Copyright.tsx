"use client";

import { useTranslations } from "next-intl";
import buildInfo from "@/data/build-info.json";

function formatBuildDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    }).format(date);
  } catch {
    return dateString;
  }
}

export function Copyright() {
  const t = useTranslations("Home");
  const buildDate = formatBuildDate(buildInfo.buildDate);

  return (
    <p className="mb-4 mr-auto w-[calc(100%-96px)] whitespace-pre-wrap pl-6 text-xs lg:w-full lg:text-center">
      {t.rich("copyright", {
        nowrap: (children) => <span className="text-nowrap">{children}</span>,
        lastUpdate: (children) => <span className="opacity-50">{children}</span>,
        lastUpdateDate: buildDate,
        year: new Date().getFullYear(),
      })}
    </p>
  );
}
