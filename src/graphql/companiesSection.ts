import { graphql } from "@/types/graphql";
import { company } from "./company";

export const companiesSection = graphql(`
  fragment CompaniesSection on CompaniesSection {
    __typename
    title
    heading
    companiesCollection {
      items {
        ...Company
      }
    }
  }
`);
