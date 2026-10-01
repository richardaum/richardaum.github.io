import { recentWorkProjects } from "@/data/projects";
import { clsx } from "@/utils/tailwind";
import { IconExternalLink, IconLink } from "@tabler/icons-react";
import { getTranslations } from "next-intl/server";
import { TechTooltipText, WorkedFor } from "./LiveDuration";

export async function RecentWork() {
  const t = await getTranslations("Home");

  return (
    <section className="border-l-4 border-greyTones-500 pl-4">
      <h2 className="mb-6 font-display text-lg text-greyTones-600">{t("recentWork.title")}</h2>
      <section className="flex flex-col gap-8 pb-8">
        {recentWorkProjects.map((project) => (
          <article key={project.id} className="flex flex-col gap-3">
            <div className="flex flex-col">
              <h3 className="flex items-center font-semibold">
                <div
                  className={clsx(
                    "-ml-6 size-3 rounded-[4px]",
                    project.duration.to !== "current" ? "bg-redPink-500" : "bg-green-600",
                  )}
                />
                <span className="flex gap-1 pl-3">
                  {t(`recentWork.${project.id}.title`)}
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
            <p>
              {t.rich(`recentWork.${project.id}.description`, {
                a: (children) => (
                  <a href={project.linkedin} target="_blank" rel="noreferrer" className="font-semibold">
                    {children}
                    <IconExternalLink className="inline size-4 align-text-top" />
                  </a>
                ),
              })}
            </p>
            <p className="flex flex-wrap gap-1 font-light">
              {project.techStack.map((technology, index) => (
                <span key={index}>
                  <TechTooltipText technology={technology} scope="recent" />
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
