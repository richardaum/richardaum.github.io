import { IconDownload } from "@tabler/icons-react";
import { getTranslations } from "next-intl/server";

export async function DownloadCV() {
  const t = await getTranslations("Home");
  return (
    <>
      {t("downloadCV")} <IconDownload />
    </>
  );
}
