"use client";
import { At } from "@/types/array";
import { GetSinglePageQuery, GetSkillsQuery, SkillsSectionFragment, WorkFragment } from "@/types/graphql";
import { cn } from "@/utils/tailwind";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, Inline, INLINES } from "@contentful/rich-text-types";
import { Search } from "lucide-react";
import Image from "next/image";
import React from "react";
import { ButtonSwitch } from "./ui/ButtonSwitch";
import { Input } from "./ui/input";
import { enableMapSet, produce } from "immer";
import { kebabCase } from "lodash";
import { SkillDictionary } from "@/utils/skills";

enableMapSet();

type Skill = At<GetSkillsQuery, "skillCollection.items">;

export const SkillsSection = ({ section, skills }: { section: SkillsSectionFragment; skills: SkillDictionary }) => {
  const [query, setQuery] = React.useState<string>("");
  const [selectedSkill, setSelectedSkill] = React.useState<Skill | null>(null);
  const [filteredSkillsGroup, setFilteredSkillsGroup] = React.useState(new Set<string>());

  const toggleSkillGroup = (group: string) => {
    setFilteredSkillsGroup(
      produce(filteredSkillsGroup, (draft) => {
        if (draft.has(group)) draft.delete(group);
        else draft.add(group);
      }),
    );
  };

  const skillsList = Array.from(skills.values());
  const selectSkillProjects = selectedSkill?.linkedFrom?.workCollection?.items ?? [];

  return (
    <div
      className="col-span-2 grid min-h-screen auto-rows-min grid-cols-subgrid gap-x-6 px-8 pt-[100px]"
      id={kebabCase(section.title!)}
    >
      <div className="col-span-2 mb-16 grid grid-cols-subgrid">
        <h2 className="text-5xl">{section.title}</h2>
        <div className="rounded-l-2xl text-neutral-500">{section.description}</div>
      </div>

      <div className="col-span-2 grid grid-cols-subgrid">
        <div>
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="mb-5 w-2/3"
            leftIcon={<Search className="opacity-30 peer-focus:opacity-100" />}
            type="text"
            placeholder="Search..."
          />
          <div className="mb-6 flex flex-wrap gap-3">
            <ButtonSwitch
              onClick={() => toggleSkillGroup("frontend")}
              active={filteredSkillsGroup.has("frontend")}
              value="frontend"
            >
              Frontend
            </ButtonSwitch>
            <ButtonSwitch
              onClick={() => toggleSkillGroup("backend")}
              active={filteredSkillsGroup.has("backend")}
              value="backend"
            >
              Backend
            </ButtonSwitch>
            <ButtonSwitch
              onClick={() => toggleSkillGroup("soft skill")}
              active={filteredSkillsGroup.has("soft skill")}
              value="soft skill"
            >
              Soft skills
            </ButtonSwitch>
            <ButtonSwitch
              onClick={() => toggleSkillGroup("other")}
              active={filteredSkillsGroup.has("other")}
              value="other"
            >
              Others
            </ButtonSwitch>
            {(filteredSkillsGroup.size > 0 || query) && (
              <button
                onClick={() => {
                  setQuery("");
                  setFilteredSkillsGroup(new Set<string>());
                }}
                className={cn("ml-auto rounded-full border-2 border-white px-4 py-1 text-sm")}
              >
                Clear filters
              </button>
            )}
          </div>
          <ul className="grid grid-cols-9 justify-between gap-8">
            {skillsList.map((skill) => {
              return (
                <li key={skill.sys.id} title={skill.name!}>
                  <button
                    className={cn(
                      "mr-3 rounded-full outline-8",
                      skill.sys.id === selectedSkill?.sys.id && "outline-indigo-400",
                    )}
                    onClick={() =>
                      setSelectedSkill((previousSkill) => (previousSkill?.sys.id === skill.sys.id ? null : skill))
                    }
                  >
                    {skill.icon ? (
                      <Image
                        className="size-12 w-auto min-w-12 transition-all hover:scale-125"
                        src={skill.icon.image?.url!}
                        alt={skill.icon.description!}
                        width={skill.icon.image?.width!}
                        height={skill.icon.image?.height!}
                      />
                    ) : (
                      <div className="flex size-12 items-center justify-center rounded-full bg-indigo-400">
                        {skill.name![0]}
                      </div>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          {selectedSkill && (
            <div>
              <h3 className="mb-4 text-4xl">{selectedSkill.name}</h3>

              <ul className="mb-8 flex flex-wrap gap-2">
                {selectedSkill.tagsCollection?.items
                  .filter((t) => t != null)
                  .map((tag) => (
                    <li key={tag.sys.id} className="rounded-full bg-indigo-500 px-4 py-0.5 text-sm">
                      {tag.label}
                    </li>
                  ))}
              </ul>

              {documentToReactComponents(selectedSkill.description?.json, {
                preserveWhitespace: true,
                renderNode: {
                  [BLOCKS.UL_LIST]: (_, children) => <ul className="mb-4 ml-5 list-disc">{children}</ul>,
                },
              })}

              {selectSkillProjects.length > 0 && (
                <div>
                  Related work:&nbsp;
                  <ul className="inline">
                    {selectSkillProjects
                      .filter((w) => w != null)
                      .map((work, index, list) => (
                        <li className="inline" key={work.sys.id}>
                          <a href={`#${work.slug}`} className="text-indigo-400">
                            {work.name}
                          </a>
                          {index < list.length - 1 ? ", " : ""}
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
