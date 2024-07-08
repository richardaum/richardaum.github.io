import { graphql } from "@/types/graphql";

export const skill = graphql(`
  fragment Skill on Skill {
    sys {
      id
    }
    name
    tagsCollection(limit: 50) {
      items {
        ...Tag
      }
    }
    description {
      json
    }
    linkedFrom {
      workCollection(limit: 50) {
        items {
          ...Work
        }
      }
    }
    icon {
      ...ImageWrapper
    }
  }
`);
