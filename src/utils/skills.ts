import { At } from "@/types/array";
import { GetSkillsQuery } from "@/types/graphql";

export function createSkillDictionary(skills: At<GetSkillsQuery, "skillCollection">) {
  const dictionary = new Map<string, At<GetSkillsQuery, "skillCollection.items">>();
  skills.items.forEach((skill) => {
    if (!skill) return;
    dictionary.set(skill.sys.id, skill);
  });
  return dictionary;
}

export type SkillDictionary = ReturnType<typeof createSkillDictionary>;
