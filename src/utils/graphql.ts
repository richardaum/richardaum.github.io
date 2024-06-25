import axios from "axios";

const client = axios.create({
  baseURL: `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master`,
  headers: {
    Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
  },
});

export const graphqlRequest = async <T>(query: string) => {
  const response = await client.post<{ data: T }>("/", { query });
  return response.data.data;
};
