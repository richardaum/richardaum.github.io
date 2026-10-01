"use client";

import { sideProjects } from "@/data/projects";
import { clsx } from "@/utils/tailwind";
import { IconLink } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { TechTooltipText, WorkedFor } from "./LiveDuration";

export function SideProjects() {
  const t = useTranslations("Home");

  return (
    <section className="border-l-4 border-greyTones-500 pl-4">
      <h2 className="mb-6 font-display text-lg text-greyTones-600">{t("sideProjects.title")}</h2>
      <section className="flex flex-col gap-8 pb-8">
        {sideProjects.map((project) => (
          <article key={project.id} className="relative flex flex-col gap-3">
            {"peerlistUrl" in project && project.peerlistUrl && project.peerlistBadge && (
              <a href={project.peerlistUrl} target="_blank" rel="noreferrer" className="absolute right-0 top-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={project.peerlistBadge} alt="Live on Peerlist" width={150} height={40} />
              </a>
            )}
            <div className="flex flex-col">
              <h3 className="flex items-center font-semibold">
                <div
                  className={clsx(
                    "-ml-6 size-3 rounded-[4px]",
                    project.duration.to !== "current" ? "bg-redPink-500" : "bg-green-600",
                  )}
                />
                <span className="flex gap-1 pl-3">
                  {t(`sideProjects.${project.id}.title`)}
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noreferrer">
                      <IconLink className="text-redPink-500" />
                    </a>
                  )}
                </span>
              </h3>
              <span className="text-sm text-greyTones-600">
                <WorkedFor from={project.duration.from} to={project.duration.to} />
              </span>
            </div>
            <p>{t(`sideProjects.${project.id}.description`)}</p>
            <p className="flex flex-wrap gap-1 font-light">
              {project.techStack.map((technology, index) => (
                <span key={index}>
                  <TechTooltipText technology={technology} scope="side" />
                  {index < project.techStack.length - 1 && ", "}
                </span>
              ))}
            </p>
          </article>
        ))}
      </section>
    </section>
  );
}
