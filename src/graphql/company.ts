import { graphql } from "@/types/graphql";

export const company = graphql(`
  fragment Company on Company {
    sys {
      id
    }
    url
    startDate
    endDate
    brand {
      ...ImageWrapper
    }
  }
`);
