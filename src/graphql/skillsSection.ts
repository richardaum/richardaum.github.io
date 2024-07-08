import { graphql } from "@/types/graphql";

export const skillsSection = graphql(`
  fragment SkillsSection on SkillsSection {
    __typename
    title
    description
  }
`);
