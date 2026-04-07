import { projects } from "@/data/projects";
import { calculateTotalExperience } from "@/utils/tech";
import { IconBrandDiscord, IconBrandGithub, IconBrandLinkedin, IconBrandSteam } from "@tabler/icons-react";
import { getTranslations } from "next-intl/server";
import { Copyright } from "./Copyright";
import { DownloadCV } from "./DownloadCV";
import { Tooltip } from "./Tooltip";

const totalExperience = calculateTotalExperience(projects);
const resume = "/resume.pdf";

export async function NavPanel({ children }: { children?: React.ReactNode }) {
  const t = await getTranslations("Home");
  const totalExperienceInYears = totalExperience.shiftTo("years").years.toFixed(0);
  const totalExperienceDetailed = totalExperience.shiftTo("years", "months", "days");
  const experienceTooltip = t("experienceBreakdownTooltip", {
    years: Math.floor(totalExperienceDetailed.years),
    months: Math.floor(totalExperienceDetailed.months),
    days: Math.floor(totalExperienceDetailed.days),
  });
  return (
    <div className="flex h-full flex-col justify-between gap-8 text-brownBeige-600">
      <div className="ml-auto">
        <a
          className="m-2 flex items-center gap-4 rounded-xl bg-darkColors-900/20 p-3 text-greyTones-300"
          href={resume}
          rel="noreferrer"
          target="_blank"
        >
          <DownloadCV />
        </a>
      </div>

      {children}

      <div className="relative z-10 m-4 flex flex-col items-center gap-8 rounded-xl bg-brownBeige-500/80 pt-4">
        <Tooltip content={experienceTooltip}>
          <div className="w-[150px] border-b-4 border-current text-right font-display">
            <p className="text-4xl">{t("totalExperience", { years: totalExperienceInYears })}</p>
            <p className="text-lg">{t("seniority")}</p>
          </div>
        </Tooltip>
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
        <Copyright />
      </div>
    </div>
  );
}
