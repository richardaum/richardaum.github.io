"use client";

import { useBuildMetaStore } from "@/stores/buildMeta";
import { useTranslations } from "next-intl";

export function LocalizedCopyright() {
  const t = useTranslations("Home");
  const { buildDate, buildYear } = useBuildMetaStore();

  return (
    <p className="mb-4 mr-auto w-[calc(100%-96px)] whitespace-pre-wrap pl-6 text-xs lg:w-full lg:text-center">
      {t.rich("copyright", {
        nowrap: (children) => <span className="text-nowrap">{children}</span>,
        lastUpdate: (children) => <span className="opacity-50">{children}</span>,
        lastUpdateDate: buildDate,
        year: buildYear,
      })}
    </p>
  );
}
