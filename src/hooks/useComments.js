import { useMemo } from "react";
import { priorityValues } from "../helpers/priorityTypes";

export const useComments= (comments) => {
  return useMemo(() => {
    return [...comments].sort((a, b) => {
      if (a.createdAt === b.createdAt) {
        return priorityValues[b.priority] - priorityValues[a.priority];
      }
      return a.createdAt - b.createdAt;
    });
  }, [comments]);
};
