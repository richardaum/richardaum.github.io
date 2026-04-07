import { projects } from "@/data/projects";
import { durationToYearsAndMonths, fromToToDuration } from "@/utils/duration";
import { clsx } from "@/utils/tailwind";
import { calculateTechUsage } from "@/utils/tech";
import { IconExternalLink, IconLink } from "@tabler/icons-react";
import { DateTime } from "luxon";
import { getTranslations } from "next-intl/server";
import { FadeInSection } from "./FadeInSection";
import { TooltipText } from "./TooltipText";

const techUsage = calculateTechUsage(projects);

export async function RecentWork() {
  const t = await getTranslations("Home");

  return (
    <div>
      <FadeInSection amount="some" enabled>
        <section className="border-l-4 border-greyTones-500 pl-4">
          <h2 className="mb-6 font-display text-lg text-greyTones-600">{t("recentWork.title")}</h2>
          <section className="flex flex-col gap-8 pb-8">
            {projects.map((project, index) => (
              <FadeInSection key={index} enabled>
                <article className="flex flex-col gap-3">
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
                      <TooltipText
                        text={t("workedFor", {
                          duration: durationToYearsAndMonths(fromToToDuration(project.duration)),
                        })}
                        tooltip={t("durationTooltip", {
                          from: DateTime.fromISO(project.duration.from).toLocaleString({
                            month: "long",
                            year: "numeric",
                          }),
                          to:
                            project.duration.to === "current"
                              ? "current"
                              : DateTime.fromISO(project.duration.to).toLocaleString({
                                  month: "long",
                                  year: "numeric",
                                }),
                        })}
                        className=""
                      />
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
                    {project.techStack.map((technology, index) => {
                      const tech = technology;
                      const usage = techUsage.get(technology);
                      if (!usage) {
                        return (
                          <span key={index}>
                            {technology}
                            {index < project.techStack.length - 1 && ", "}
                          </span>
                        );
                      }
                      const duration = durationToYearsAndMonths(usage.duration);
                      const projects = usage.projectsCount;
                      return (
                        <span key={index}>
                          <TooltipText text={technology} tooltip={t("techTooltip", { duration, projects, tech })} />
                          {index < project.techStack.length - 1 && ", "}
                        </span>
                      );
                    })}
                  </p>
                </article>
              </FadeInSection>
            ))}
          </section>
        </section>
      </FadeInSection>
    </div>
  );
}
