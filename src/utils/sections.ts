import { At, DeepRequired } from "@/types/array";
import { PageQuery } from "@/types/graphql";
import * as T from "type-fest";

// isSectionTypeEqual must guarantee.content.reference exists
export function isSectionTypeEqual(
  reference: At<PageQuery, "page.sectionsCollection.items"> | undefined | null,
  type: string
) {
  return reference?.__typename === type;
}
