import gql from "fraql";
import { skill } from "./fragments";

export const getSkills = gql`
  query getSkills {
    skillCollection {
      items {
        ${skill}
      }
    }
  }
`;
