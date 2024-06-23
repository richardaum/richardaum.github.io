import type { IGraphQLConfig } from "graphql-config";

const contentfulSchema = {
  url: `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master`,
  headers: {
    Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
  },
};

const config: IGraphQLConfig = {
  schema: [{ [contentfulSchema.url]: { headers: contentfulSchema.headers } }],
  documents: "src/**/*.{tsx,graphql}",
  extensions: {
    endpoints: {
      default: contentfulSchema,
    },
  },
};

export default config;
