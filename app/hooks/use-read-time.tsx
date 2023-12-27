import {
  CalculateReadingTimeProps,
  ReadingTimeResult,
  calculateReadingTime,
} from "../lib/utils";
import { useMemo } from "react";

export const useReadTime = ({
  text,
  speed,
  wpm,
}: CalculateReadingTimeProps): ReadingTimeResult => {
  return useMemo(
    () => calculateReadingTime({ text, speed, wpm }),
    [text, speed, wpm]
  );
};
