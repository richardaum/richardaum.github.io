import { projects } from "@/data/projects";
import { skillCategories, skillCategoryLabels, skillCategoryOrder, type SkillCategory } from "@/data/skillCategories";
import { calculateTechUsage } from "@/utils/tech";
import { Duration } from "luxon";
import { getTranslations } from "next-intl/server";

function formatDuration(duration: Duration) {
  const shiftedDuration = duration.shiftTo("years", "months");
  const units = [
    { value: Math.floor(shiftedDuration.years), label: "year" },
    { value: Math.floor(shiftedDuration.months), label: "month" },
  ].filter(({ value }) => value > 0);

  if (units.length === 0) return "Less than a month";

  return units.map(({ value, label }) => `${value} ${label}${value === 1 ? "" : "s"}`).join(" and ");
}

export async function Technologies() {
  const t = await getTranslations("Home");
  const technologies = Array.from(calculateTechUsage(projects)).sort(
    ([, first], [, second]) => second.duration.as("milliseconds") - first.duration.as("milliseconds"),
  );
  const technologyGroups = skillCategoryOrder
    .map((category) => [category, technologies.filter(([technology]) => skillCategories[technology]?.[0] === category)] as const)
    .filter(([, group]) => group.length > 0);

  return (
    <section className="border-l-4 border-greyTones-500 pl-4">
      <h2 className="mb-6 font-display text-lg text-greyTones-600">{t("technologies.title")}</h2>
      <div className="flex flex-col gap-8">
        {technologyGroups.map(([category, group]) => (
          <div key={category}>
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-greyTones-600">
              {skillCategoryLabels[category as SkillCategory]}
            </h3>
            <div className="flex flex-col">
              {group.map(([technology, usage]) => (
                <div key={technology} className="flex items-baseline justify-between gap-6 py-2">
                  <span className="flex items-center gap-3 font-semibold">
                    <span aria-hidden="true" className="-ml-6 size-3 shrink-0 rounded-[4px] bg-redPink-500" />
                    <span>{technology}</span>
                  </span>
                  <span className="shrink-0 text-right text-sm text-greyTones-600">
                    {formatDuration(usage.duration)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
