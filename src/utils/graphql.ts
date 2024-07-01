import axios, { isAxiosError } from "axios";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { DocumentNode, print } from "graphql";
import { pick } from "lodash";
import { join } from "path";

const client = axios.create({
  baseURL: `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master`,
  headers: {
    Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
  },
});

export const graphqlRequest = async <T>(query: DocumentNode) => {
  try {
    const response = await client.post<{ data: T }>("/", { query: print(query) });
    return response.data.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const timestamp = new Date().toISOString();
      const parsedError = pick(error, ["config.data", "config.baseURL", "config.url", "message", "response.data"]);
      const errorFileName = `${timestamp.replace(/:/g, "-")}.json`;
      const queryErrorFileName = `${timestamp.replace(/:/g, "-")}-query.graphql`;

      if (process.env.WRITE_LOG_FILE_ENABLED === "true") {
        if (!existsSync("errors")) mkdirSync("errors");
        writeFileSync(join("errors", queryErrorFileName), print(query));
        writeFileSync(join("errors", errorFileName), JSON.stringify(parsedError, null, 2));
        throw error;
      }
    }
  }
};
