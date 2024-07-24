"use client";

import { projects } from "@/data/projects";
import { IconLink } from "@tabler/icons-react";

export function RecentWork() {
  return (
    <div className="relative ml-2">
      <section className="border-l-4 border-greyTones-500 pl-5">
        <h2 className="mb-6 font-display text-lg text-greyTones-600">Recent Work</h2>
        <section className="flex flex-col gap-8 pb-8">
          {projects.map((project, index) => (
            <article className="flex flex-col gap-3" key={index}>
              <h3 className="flex items-center font-semibold">
                <div className="absolute -left-1 z-10 size-3 rounded-[4px] bg-redPink-500"></div>
                <span className="flex gap-1">
                  {project.title}
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noreferrer">
                      <IconLink className="text-redPink-500" />
                    </a>
                  )}
                </span>
              </h3>
              <p>{project.description}</p>
              <p className="font-light">
                {project.techStack.map((technology, index) => (
                  <span key={index} className="inline">
                    <button className="underline decoration-dashed decoration-1 underline-offset-4">
                      {technology}
                    </button>
                    {index < project.techStack.length - 1 && ", "}
                  </span>
                ))}
              </p>
            </article>
          ))}
        </section>
      </section>
    </div>
  );
}
