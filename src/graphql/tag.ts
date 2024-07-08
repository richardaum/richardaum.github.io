import { graphql } from "@/types/graphql";

export const tag = graphql(`
  fragment Tag on Tag {
    sys {
      id
    }
    label
  }
`);
