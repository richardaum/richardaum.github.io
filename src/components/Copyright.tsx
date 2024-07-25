"use client";

import { useTranslations } from "next-intl";

export function Copyright() {
  const t = useTranslations("Panel");

  return (
    <p className="mb-4 mr-auto w-[calc(100%-96px)] whitespace-pre-wrap pl-6 text-xs lg:w-full lg:text-center">
      {t.rich("copyright", {
        nowrap: (children) => <span className="text-nowrap">{children}</span>,
        year: new Date().getFullYear(),
      })}
    </p>
  );
}
