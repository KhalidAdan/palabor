import {
  CalculateReadingTimeProps,
  ReadingTimeResult,
  calculateReadingTime,
} from "@/lib/read-time";
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
