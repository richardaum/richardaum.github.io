/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  fragment CompaniesSection on CompaniesSection {\n    __typename\n    title\n    heading\n    companiesCollection {\n      items {\n        ...Company\n      }\n    }\n  }\n": types.CompaniesSectionFragmentDoc,
    "\n  fragment Company on Company {\n    sys {\n      id\n    }\n    url\n    startDate\n    endDate\n    brand {\n      ...ImageWrapper\n    }\n  }\n": types.CompanyFragmentDoc,
    "\n  query getSinglePage {\n    page(id: \"5mvuB3N2ynlh1wr27eh5Ui\") {\n      sectionsCollection(limit: 5) {\n        items {\n          ... on Entry {\n            sys {\n              id\n            }\n          }\n\n          ...HomeSection\n          ...CompaniesSection\n          ...SkillsSection\n        }\n      }\n    }\n  }\n": types.GetSinglePageDocument,
    "\n  query getSkills {\n    skillCollection(order: [sys_firstPublishedAt_ASC]) {\n      items {\n        ...Skill\n      }\n    }\n  }\n": types.GetSkillsDocument,
    "\n  fragment HomeSection on HomeSection {\n    __typename\n    title\n    photo {\n      sys {\n        id\n      }\n      description\n      image {\n        url\n        width\n        height\n      }\n    }\n\n    socialMediasCollection(limit: 3) {\n      items {\n        sys {\n          id\n        }\n        url\n        icon {\n          ...ImageWrapper\n        }\n      }\n    }\n\n    upperText\n    role\n    name\n    summary\n\n    mainSkillsCollection(limit: 5) {\n      items {\n        sys {\n          id\n        }\n      }\n    }\n  }\n": types.HomeSectionFragmentDoc,
    "\n  fragment ImageWrapper on ImageWrapper {\n    sys {\n      id\n    }\n    description\n    image {\n      url\n      width\n      height\n    }\n  }\n": types.ImageWrapperFragmentDoc,
    "\n  fragment Skill on Skill {\n    sys {\n      id\n    }\n    name\n    tagsCollection(limit: 50) {\n      items {\n        ...Tag\n      }\n    }\n    description {\n      json\n    }\n    linkedFrom {\n      workCollection(limit: 50) {\n        items {\n          ...Work\n        }\n      }\n    }\n    icon {\n      ...ImageWrapper\n    }\n  }\n": types.SkillFragmentDoc,
    "\n  fragment SkillsSection on SkillsSection {\n    __typename\n    title\n    description\n  }\n": types.SkillsSectionFragmentDoc,
    "\n  fragment Tag on Tag {\n    sys {\n      id\n    }\n    label\n  }\n": types.TagFragmentDoc,
    "\n  fragment Work on Work {\n    sys {\n      id\n    }\n    name\n    slug\n  }\n": types.WorkFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CompaniesSection on CompaniesSection {\n    __typename\n    title\n    heading\n    companiesCollection {\n      items {\n        ...Company\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment CompaniesSection on CompaniesSection {\n    __typename\n    title\n    heading\n    companiesCollection {\n      items {\n        ...Company\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Company on Company {\n    sys {\n      id\n    }\n    url\n    startDate\n    endDate\n    brand {\n      ...ImageWrapper\n    }\n  }\n"): (typeof documents)["\n  fragment Company on Company {\n    sys {\n      id\n    }\n    url\n    startDate\n    endDate\n    brand {\n      ...ImageWrapper\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getSinglePage {\n    page(id: \"5mvuB3N2ynlh1wr27eh5Ui\") {\n      sectionsCollection(limit: 5) {\n        items {\n          ... on Entry {\n            sys {\n              id\n            }\n          }\n\n          ...HomeSection\n          ...CompaniesSection\n          ...SkillsSection\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getSinglePage {\n    page(id: \"5mvuB3N2ynlh1wr27eh5Ui\") {\n      sectionsCollection(limit: 5) {\n        items {\n          ... on Entry {\n            sys {\n              id\n            }\n          }\n\n          ...HomeSection\n          ...CompaniesSection\n          ...SkillsSection\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getSkills {\n    skillCollection(order: [sys_firstPublishedAt_ASC]) {\n      items {\n        ...Skill\n      }\n    }\n  }\n"): (typeof documents)["\n  query getSkills {\n    skillCollection(order: [sys_firstPublishedAt_ASC]) {\n      items {\n        ...Skill\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment HomeSection on HomeSection {\n    __typename\n    title\n    photo {\n      sys {\n        id\n      }\n      description\n      image {\n        url\n        width\n        height\n      }\n    }\n\n    socialMediasCollection(limit: 3) {\n      items {\n        sys {\n          id\n        }\n        url\n        icon {\n          ...ImageWrapper\n        }\n      }\n    }\n\n    upperText\n    role\n    name\n    summary\n\n    mainSkillsCollection(limit: 5) {\n      items {\n        sys {\n          id\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment HomeSection on HomeSection {\n    __typename\n    title\n    photo {\n      sys {\n        id\n      }\n      description\n      image {\n        url\n        width\n        height\n      }\n    }\n\n    socialMediasCollection(limit: 3) {\n      items {\n        sys {\n          id\n        }\n        url\n        icon {\n          ...ImageWrapper\n        }\n      }\n    }\n\n    upperText\n    role\n    name\n    summary\n\n    mainSkillsCollection(limit: 5) {\n      items {\n        sys {\n          id\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ImageWrapper on ImageWrapper {\n    sys {\n      id\n    }\n    description\n    image {\n      url\n      width\n      height\n    }\n  }\n"): (typeof documents)["\n  fragment ImageWrapper on ImageWrapper {\n    sys {\n      id\n    }\n    description\n    image {\n      url\n      width\n      height\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Skill on Skill {\n    sys {\n      id\n    }\n    name\n    tagsCollection(limit: 50) {\n      items {\n        ...Tag\n      }\n    }\n    description {\n      json\n    }\n    linkedFrom {\n      workCollection(limit: 50) {\n        items {\n          ...Work\n        }\n      }\n    }\n    icon {\n      ...ImageWrapper\n    }\n  }\n"): (typeof documents)["\n  fragment Skill on Skill {\n    sys {\n      id\n    }\n    name\n    tagsCollection(limit: 50) {\n      items {\n        ...Tag\n      }\n    }\n    description {\n      json\n    }\n    linkedFrom {\n      workCollection(limit: 50) {\n        items {\n          ...Work\n        }\n      }\n    }\n    icon {\n      ...ImageWrapper\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment SkillsSection on SkillsSection {\n    __typename\n    title\n    description\n  }\n"): (typeof documents)["\n  fragment SkillsSection on SkillsSection {\n    __typename\n    title\n    description\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Tag on Tag {\n    sys {\n      id\n    }\n    label\n  }\n"): (typeof documents)["\n  fragment Tag on Tag {\n    sys {\n      id\n    }\n    label\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Work on Work {\n    sys {\n      id\n    }\n    name\n    slug\n  }\n"): (typeof documents)["\n  fragment Work on Work {\n    sys {\n      id\n    }\n    name\n    slug\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;