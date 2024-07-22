"use client";

import { SkillFragment } from "@/types/graphql/graphql";
import { createContext, useContext, useState } from "react";

const Context = createContext<
  | {
      skill: SkillFragment | undefined;
      setSkill: React.Dispatch<React.SetStateAction<SkillFragment | undefined>>;
    }
  | undefined
>(undefined);

export const SkillProvider = ({ children }: { children: React.ReactNode }) => {
  const [skill, setSkill] = useState<SkillFragment | undefined>(undefined);

  return <Context.Provider value={{ skill, setSkill }}>{children}</Context.Provider>;
};

export const useSkillContext = () => {
  const skill = useContext(Context);
  if (!skill) throw new Error("useSkill must be used within a SkillProvider");
  return skill;
};
