import { graphql } from "@/types/graphql";

export const work = graphql(`
  fragment Work on Work {
    sys {
      id
    }
    name
    slug
  }
`);
