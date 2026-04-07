import { create } from "zustand";
import buildInfo from "@/data/build-info.json";
import { format, isValid, parse, parseISO } from "date-fns";

function getInitialBuildMeta() {
  const parsedIsoDate = parseISO(buildInfo.buildDate);
  if (isValid(parsedIsoDate)) {
    const isoDatePart = format(parsedIsoDate, "yyyy-MM-dd");
    const stableDate = parse(isoDatePart, "yyyy-MM-dd", new Date());
    return {
      buildDate: format(stableDate, "MMM d, yyyy"),
      buildYear: Number.parseInt(format(stableDate, "yyyy"), 10),
    };
  }

  const fallbackDate = new Date(buildInfo.buildTimestamp * 1000);
  const buildDate = buildInfo.buildDate;
  const buildYear = fallbackDate.getUTCFullYear();

  return { buildDate, buildYear };
}

const initialBuildMeta = getInitialBuildMeta();

interface BuildMetaStore {
  buildDate: string;
  buildYear: number;
}

export const useBuildMetaStore = create<BuildMetaStore>(() => ({
  buildDate: initialBuildMeta.buildDate,
  buildYear: initialBuildMeta.buildYear,
}));
