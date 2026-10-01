"use client";

import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandSteam,
  IconDownload,
} from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { TotalExperience } from "./LiveDuration";
import { LocalizedCopyright } from "./LocalizedCopyright";

const resume = "/resume.pdf";

export function MobileNavPanel({ children }: { children?: React.ReactNode }) {
  const t = useTranslations("Home");

  return (
    <div className="flex h-full flex-col justify-between gap-8 text-brownBeige-600">
      <div className="ml-auto hidden">
        <a
          className="m-2 flex items-center gap-4 rounded-xl bg-darkColors-900/20 p-3 text-greyTones-300"
          href={resume}
          rel="noreferrer"
          target="_blank"
        >
          {t("downloadCV")} <IconDownload />
        </a>
      </div>

      {children}

      <div className="relative z-10 m-4 flex flex-col items-center gap-8 rounded-xl bg-brownBeige-500/80 pt-4">
        <TotalExperience />
        <div className="flex gap-3">
          <a href="https://linkedin.com/in/richardaum" rel="noreferrer" target="_blank">
            <IconBrandLinkedin />
          </a>
          <a href="https://github.com/richardaum" rel="noreferrer" target="_blank">
            <IconBrandGithub />
          </a>
          <a href="https://discordapp.com/users/richardaum" rel="noreferrer" target="_blank">
            <IconBrandDiscord />
          </a>
          <a href="https://steamcommunity.com/id/richardaum" rel="noreferrer" target="_blank">
            <IconBrandSteam />
          </a>
        </div>

        <LocalizedCopyright />
      </div>
    </div>
  );
}
