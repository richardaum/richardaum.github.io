import resume from "@/assets/files/resume.pdf";
import { projects } from "@/data/projects";
import { calculateTotalExperience } from "@/utils/tech";
import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandSteam,
  IconDownload,
  IconMail,
} from "@tabler/icons-react";
import { Copyright } from "./Copyright";

const totalExperience = calculateTotalExperience(projects);

export function NavPanel({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col justify-between gap-8 text-brownBeige-600">
      <div className="ml-auto">
        <a className="m-2 flex items-center gap-4 p-2" href={resume} rel="noreferrer" target="_blank">
          Download CV <IconDownload />
        </a>
      </div>

      {children}

      <div className="relative z-10 m-4 flex flex-col items-center gap-8 rounded-xl bg-brownBeige-500/80 pt-4">
        <div className="w-[150px] border-b-4 border-current text-right font-display">
          <p className="text-4xl">+{totalExperience.shiftTo("years").years.toFixed(0)} years</p>
          <p className="text-lg">Expert</p>
        </div>
        <div className="flex gap-3">
          <a href="https://linkedin.com/in/richardaum">
            <IconBrandLinkedin />
          </a>
          <a href="mailto:richard.lopes92@gmail.com">
            <IconMail />
          </a>
          <a href="https://github.com/richardaum">
            <IconBrandGithub />
          </a>
          <a href="https://discordapp.com/users/richardaum">
            <IconBrandDiscord />
          </a>
          <a href="https://steamcommunity.com/id/richardaum">
            <IconBrandSteam />
          </a>
        </div>

        <Copyright />
      </div>
    </div>
  );
}
