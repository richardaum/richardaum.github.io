import { graphql } from "@/types/graphql";

export const getSkills = graphql(`
  query getSkills {
    skillCollection(order: [sys_firstPublishedAt_ASC]) {
      items {
        ...Skill
      }
    }
  }
`);
