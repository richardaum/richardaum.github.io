"use client";
import { IconDownload } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

export function DownloadCV() {
  const t = useTranslations("Home");
  return (
    <>
      {t("downloadCV")} <IconDownload />
    </>
  );
}
