import { graphql } from "@/types/graphql";

export const homeSection = graphql(`
  fragment HomeSection on HomeSection {
    __typename
    title
    photo {
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

    socialMediasCollection(limit: 3) {
      items {
        sys {
          id
        }
        url
        icon {
          ...ImageWrapper
        }
      }
    }

    upperText
    role
    name
    summary

    mainSkillsCollection(limit: 5) {
      items {
        sys {
          id
        }
      }
    }
  }
`);
