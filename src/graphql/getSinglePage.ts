import { graphql } from "@/types/graphql";

export const getSinglePage = graphql(`
  query getSinglePage {
    page(id: "5mvuB3N2ynlh1wr27eh5Ui") {
      sectionsCollection(limit: 5) {
        items {
          ... on Entry {
            sys {
              id
            }
          }

          ...HomeSection
          ...CompaniesSection
          ...SkillsSection
        }
      }
    }
  }
`);
