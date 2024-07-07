import gql from "fraql";
import { skill } from "./fragments";

export const getSkills = gql`
  query getSkills {
    skillCollection(order: [sys_firstPublishedAt_ASC]) {
      items {
        ${skill}
      }
    }
  }
`;
