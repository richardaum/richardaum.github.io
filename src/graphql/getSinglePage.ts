import gql from "fraql";
import { companiesSection, homeSection, skillsSection } from "./fragments";

export const getSinglePage = gql`
  query getSinglePage {
    page(id: "5mvuB3N2ynlh1wr27eh5Ui") {
      sectionsCollection(limit: 5) {
        items {
          ... on Entry {
            sys {
              id
            }
          }

          ${homeSection}
          ${companiesSection}
          ${skillsSection}
        }
      }
    }
  }
`;
