"use client";

import { projects } from "@/data/projects";
import { durationToYearsAndMonths, fromToToDuration } from "@/utils/duration";
import { calculateTechUsage } from "@/utils/tech";
import { IconExternalLink, IconLink } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { Tooltip } from "react-tippy";

const techUsage = calculateTechUsage(projects);

export function RecentWork() {
  const t = useTranslations("RecentWork");

  return (
    <div className="relative ml-2">
      <section className="border-l-4 border-greyTones-500 pl-5">
        <h2 className="mb-6 font-display text-lg text-greyTones-600">Recent Work</h2>
        <section className="flex flex-col gap-8 pb-8">
          {projects.map((project, index) => (
            <article className="flex flex-col gap-3" key={index}>
              <div className="flex flex-col">
                <h3 className="flex items-center font-semibold">
                  <div className="absolute -left-1 z-10 size-3 rounded-[4px] bg-redPink-500"></div>
                  <span className="flex gap-1">
                    {t(`${project.id}.title`)}
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noreferrer">
                        <IconLink className="text-redPink-500" />
                      </a>
                    )}
                  </span>
                </h3>
                <span className="text-sm text-greyTones-600">
                  Worked for around {durationToYearsAndMonths(fromToToDuration(project.duration))}
                </span>
              </div>

              <p>
                {t.rich(`${project.id}.description`, {
                  a: (children) => (
                    <a href={project.linkedin} target="_blank" rel="noreferrer" className="font-semibold">
                      {children}
                      <IconExternalLink className="inline size-4 align-text-top" />
                    </a>
                  ),
                })}
              </p>
              <p className="flex flex-wrap gap-1 font-light">
                {project.techStack.map((technology, index) => {
                  const tech = technology;
                  const duration = durationToYearsAndMonths(techUsage.get(technology)?.duration);
                  const projects = techUsage.get(technology)?.projectsCount;

                  return (
                    <span key={index}>
                      <button className="underline decoration-dashed decoration-1 underline-offset-4">
                        {/* @ts-expect-error children mismatch */}
                        <Tooltip title={`${t("tooltip", { duration, projects, tech })}`} arrow position="bottom">
                          {technology}
                        </Tooltip>
                      </button>
                      {index < project.techStack.length - 1 && ", "}
                    </span>
                  );
                })}
              </p>
            </article>
          ))}
        </section>
      </section>
    </div>
  );
}
