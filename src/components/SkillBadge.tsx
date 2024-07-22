"use client";
import { SkillFragment } from "@/types/graphql/graphql";
import { cn } from "@/utils/tailwind";
import Image from "next/image";

interface SkillBadgeProps {
  active: boolean;
  onClick?: (skill: SkillFragment) => void;
  skill: SkillFragment;
}

export function SkillBadge({ active, onClick: setSelectedSkill, skill }: SkillBadgeProps) {
  return (
    <button
      className={cn("mr-3 rounded-full outline-8", { "outline-indigo-400": active })}
      onClick={() => setSelectedSkill?.(skill)}
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
        <div className="flex size-12 items-center justify-center rounded-full bg-indigo-400">{skill.name![0]}</div>
      )}
    </button>
  );
}
