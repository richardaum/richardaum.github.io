import { graphql } from "@/types/graphql";

export const imageWrapper = graphql(`
  fragment ImageWrapper on ImageWrapper {
    sys {
      id
    }
    description
    image {
      url
      width
      height
    }
  }
`);
