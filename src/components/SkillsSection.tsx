import { SkillsSectionFragment } from "@/types/graphql";
import { Search } from "lucide-react";
import Image from "next/image";
import { Input } from "./ui/input";

export const SkillsSection = ({ skills }: { skills: SkillsSectionFragment }) => {
  const list = skills.skillsCollection?.items.filter((e) => e != null) ?? [];

  return (
    <div className="p-8">
      <h2 className="mb-12 text-5xl">{skills.title}</h2>

      <Input
        className="mb-5"
        leftIcon={<Search className="opacity-30 peer-focus:opacity-100" />}
        type="text"
        placeholder="Search for a skill"
      />

      <ul className="grid grid-cols-7 justify-between gap-12">
        {Array(40)
          .fill(list[0])
          .map((skill) => (
            <li key={skill.sys.id} title={skill.name!}>
              {skill.icon ? (
                <Image
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
            </li>
          ))}
      </ul>
    </div>
  );
};
