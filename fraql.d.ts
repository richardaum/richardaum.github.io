declare module "fraql" {
  import { DocumentNode } from "graphql";
  export default function gql<T = any>(strings: TemplateStringsArray, ...values: any[]): DocumentNode;
  function toInlineFragment<T>(fragment: T): T;
}
