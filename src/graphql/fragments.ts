import { toInlineFragment } from "fraql";
import gql from "graphql-tag";

export const imageWrapper = toInlineFragment(gql`
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

export const work = toInlineFragment(gql`
  fragment Work on Work {
    sys {
      id
    }
    name
    slug
  }
`);

export const skillsSection = toInlineFragment(gql`
  fragment SkillsSection on SkillsSection {
    __typename
    title
    description
  }
`);

export const tag = toInlineFragment(gql`
  fragment Tag on Tag {
    sys {
      id
    }
    label
  }
`);

export const skill = toInlineFragment(gql`
  fragment Skill on Skill {
    sys {
      id
    }
    name
    tagsCollection(limit: 50) {
      items {
        ${tag}
      }
    }
    description {
      json
    }
    linkedFrom {
      workCollection(limit: 50) {
        items {
          ${work}
        }
      }
    }
    icon {
      ${imageWrapper}
    }
  }
`);

export const homeSection = toInlineFragment(gql`
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
          ${imageWrapper}
        }
      }
    }

    upperText
    role
    name
    summary
  }
`);

export const company = toInlineFragment(gql`
  fragment Company on Company {
    sys {
      id
    }
    url
    startDate
    endDate
    brand {
      ${imageWrapper}
    }
  }
`);

export const companiesSection = toInlineFragment(gql`
  fragment CompaniesSection on CompaniesSection {
    __typename
    title
    heading
    companiesCollection {
      items {
        ${company}
      }
    }
  }
`);
