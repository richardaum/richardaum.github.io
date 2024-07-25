"use client";

import { projects } from "@/data/projects";
import { durationToYearsAndMonths, fromToToDuration } from "@/utils/duration";
import { calculateTechUsage } from "@/utils/tech";
import { IconExternalLink, IconLink } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Tooltip } from "react-tippy";
import { FadeInSection } from "./FadeInSection";

const techUsage = calculateTechUsage(projects);

export function RecentWork() {
  const t = useTranslations("Home");
  const ref = useRef<HTMLDivElement>(null);
  const [alreadyScrolled, setAlreadyScrolled] = useState(false);
  const [atScrollTop, setAtScrollTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (!alreadyScrolled) {
        setAlreadyScrolled(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [alreadyScrolled]);

  useEffect(() => {
    setAtScrollTop(window.scrollY === 0);
  }, []);

  const enabled = !atScrollTop || alreadyScrolled;

  return (
    <div ref={ref}>
      <FadeInSection amount="some" enabled={enabled}>
        <section className="border-l-4 border-greyTones-500 pl-4">
          <h2 className="mb-6 font-display text-lg text-greyTones-600">{t("recentWork.title")}</h2>
          <section className="flex flex-col gap-8 pb-8">
            {projects.map((project, index) => (
              <FadeInSection key={index} enabled={enabled}>
                <article className="flex flex-col gap-3">
                  <div className="flex flex-col">
                    <h3 className="flex items-center font-semibold">
                      <div className="-ml-6 size-3 rounded-[4px] bg-redPink-500" />
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
                      {t("workedFor", {
                        duration: durationToYearsAndMonths(fromToToDuration(project.duration)),
                      })}
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
                      const duration = durationToYearsAndMonths(techUsage.get(technology)?.duration);
                      const projects = techUsage.get(technology)?.projectsCount;
                      return (
                        <span key={index}>
                          <button className="underline decoration-dashed decoration-1 underline-offset-4">
                            {/* @ts-expect-error children mismatch */}
                            <Tooltip
                              title={`${t("techTooltip", { duration, projects, tech })}`}
                              arrow
                              position="bottom"
                            >
                              {technology}
                            </Tooltip>
                          </button>
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
